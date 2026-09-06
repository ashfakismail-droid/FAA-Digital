/**
 * Server-side external website analysis/import helpers for the Studio.
 *
 * Browsers cannot fetch cross-origin sites (CORS), so the external import
 * flow fetches and parses the site here, maps every reachable asset onto a
 * local demo-relative path, and rewrites the HTML/CSS. Assets that cannot be
 * fetched keep their original absolute URL (best-effort, never fatal).
 */

import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

/* ---------------------------------- limits --------------------------------- */

export const SITE_FETCH_LIMITS = {
  maxHtmlBytes: 4 * 1024 * 1024,
  maxAssetBytes: 2 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
  maxAssets: 30,
  indexTimeoutMs: 8000,
  assetTimeoutMs: 4000,
  parallel: 10,
  maxRedirects: 4,
} as const;

/* ------------------------------- SSRF guard -------------------------------- */

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  );
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) return isPrivateIpv4(address);
  const normalized = address.toLowerCase().split("%")[0];
  if (normalized.startsWith("::ffff:")) return isPrivateIpv4(normalized.slice(7));
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    /^fe[89ab]/.test(normalized) ||
    normalized.startsWith("ff")
  );
}

async function assertPublicHttpUrl(value: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid HTTP(S) website URL.");
  }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.href.length > 2048) {
    throw new Error("Only public HTTP(S) URLs are allowed.");
  }
  const addresses = await lookup(url.hostname, { all: true, verbatim: true }).catch(() => []);
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("The URL must use a public host.");
  }
  return url;
}

/** Fetches a public URL with DNS/redirect re-validation on every hop. */
export async function guardedFetch(
  rawUrl: string,
  init: { headers?: Record<string, string>; timeoutMs?: number; maxRedirects?: number } = {},
): Promise<Response> {
  let current = await assertPublicHttpUrl(rawUrl);
  const maxRedirects = init.maxRedirects ?? SITE_FETCH_LIMITS.maxRedirects;
  for (let hop = 0; ; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": "FAA Digital Studio Importer", "accept": "*/*", ...(init.headers ?? {}) },
      signal: AbortSignal.timeout(init.timeoutMs ?? 6000),
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) throw new Error("The site redirected without a destination.");
      if (hop >= maxRedirects) throw new Error("The site has too many redirects.");
      current = await assertPublicHttpUrl(new URL(location, current).href);
      continue;
    }
    return response;
  }
}

/* ------------------------------ asset references --------------------------- */

export type SiteAssetKind = "css" | "js" | "image" | "font" | "other";
export type SiteAssetRef = { raw: string; url: string; kind: SiteAssetKind };

export function classifyAsset(url: URL): SiteAssetKind {
  const pathname = url.pathname.toLowerCase();
  if (/\.css$/.test(pathname)) return "css";
  if (/\.(mjs|cjs|js)$/.test(pathname)) return "js";
  if (/\.(png|jpe?g|gif|svg|webp|avif|ico|bmp)$/.test(pathname)) return "image";
  if (/\.(woff2?|ttf|otf|eot)$/.test(pathname)) return "font";
  return "other";
}

function isSkippableRef(value: string) {
  return !value || value.length > 2000 || /^(data:|mailto:|tel:|javascript:|about:|#)/i.test(value.trim());
}

function toAbsolute(raw: string, baseUrl: string): URL | null {
  try {
    const abs = new URL(raw.trim(), baseUrl);
    if (!["http:", "https:"].includes(abs.protocol)) return null;
    return abs;
  } catch {
    return null;
  }
}

function firstSrcsetCandidate(value: string) {
  return value.split(",")[0]?.trim().split(/\s+/)[0] ?? "";
}

function collectCssUrlRefs(text: string, baseUrl: string, refs: Map<string, SiteAssetRef>) {
  for (const match of text.matchAll(/url\(\s*(["']?)([^'")]+)\1\s*\)/gi)) {
    const raw = match[2]?.trim();
    if (isSkippableRef(raw)) continue;
    const abs = toAbsolute(raw, baseUrl);
    if (!abs || refs.has(abs.href)) continue;
    refs.set(abs.href, { raw, url: abs.href, kind: classifyAsset(abs) });
  }
}

/** Extracts every fetchable asset reference from an HTML document. */
export function collectHtmlRefs(html: string, baseUrl: string): SiteAssetRef[] {
  const refs = new Map<string, SiteAssetRef>();
  const add = (raw: string) => {
    if (isSkippableRef(raw)) return;
    const abs = toAbsolute(raw, baseUrl);
    if (!abs || refs.has(abs.href)) return;
    refs.set(abs.href, { raw: raw.trim(), url: abs.href, kind: classifyAsset(abs) });
  };

  for (const match of html.matchAll(/<link\b[^>]*?>/gi)) {
    const tag = match[0];
    const rel = /rel\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2]?.toLowerCase() ?? "";
    if (!/(stylesheet|icon|apple-touch|preload)/.test(rel)) continue;
    const href = /\bhref\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2];
    if (href) add(href);
  }
  for (const match of html.matchAll(/\b(?:src|poster)\s*=\s*(["'])(.*?)\1/gi)) {
    add(match[2]);
  }
  for (const match of html.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
    add(firstSrcsetCandidate(match[2]));
  }
  for (const match of html.matchAll(/\bstyle\s*=\s*(["'])(.*?)\1/gi)) {
    collectCssUrlRefs(match[2], baseUrl, refs);
  }
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    collectCssUrlRefs(match[1], baseUrl, refs);
  }
  return [...refs.values()];
}

/** Extracts url()/&#64;import references from a fetched stylesheet. */
export function collectCssRefs(css: string, cssUrl: string): SiteAssetRef[] {
  const refs = new Map<string, SiteAssetRef>();
  collectCssUrlRefs(css, cssUrl, refs);
  for (const match of css.matchAll(/@import\s+(["'])([^"']+)\1/gi)) {
    const raw = match[2]?.trim();
    if (isSkippableRef(raw)) continue;
    const abs = toAbsolute(raw, cssUrl);
    if (!abs || refs.has(abs.href)) continue;
    refs.set(abs.href, { raw, url: abs.href, kind: classifyAsset(abs) });
  }
  return [...refs.values()];
}

/* ------------------------------- metadata ---------------------------------- */

function extractMeta(html: string, attr: string, value: string): string | undefined {
  const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]*>`, "i");
  const match = html.match(re);
  if (!match) {
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`, "i");
    return html.match(re2)?.[1]?.trim();
  }
  return match[0].match(/content=["']([^"']*)["']/i)?.[1]?.trim();
}

export type SiteMetadata = {
  title?: string;
  description?: string;
  thumbnail?: string;
  galleryImage?: string;
  logo?: string;
  seoTitle?: string;
  seoDescription?: string;
  favicon?: string;
};

export function extractSiteMetadata(html: string, finalUrl: string): SiteMetadata {
  const resolve = (value: string | undefined) => {
    if (!value) return undefined;
    try {
      return new URL(value, finalUrl).href;
    } catch {
      return undefined;
    }
  };
  const title = extractMeta(html, "property", "og:title") ?? html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = extractMeta(html, "property", "og:description") ?? extractMeta(html, "name", "description");
  const ogImage = resolve(extractMeta(html, "property", "og:image"));
  const faviconMatch =
    html.match(/<link[^>]+rel=["']?icon["']?[^>]*href=["']([^"']*)["']/i) ??
    html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']?icon["']?/i);
  const favicon = resolve(faviconMatch?.[1]);
  return {
    title: title || undefined,
    description: description || undefined,
    thumbnail: ogImage ?? favicon,
    galleryImage: ogImage,
    logo: favicon,
    seoTitle: title || undefined,
    seoDescription: description || undefined,
    favicon,
  };
}

/* --------------------------- local path mapping ---------------------------- */

export function deriveLocalPath(assetUrl: string, pageOrigin: string): string | null {
  let url: URL;
  try {
    url = new URL(assetUrl);
  } catch {
    return null;
  }
  let pathname = url.pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    // keep raw pathname
  }
  if (pathname.endsWith("/")) return null;
  const safe = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment && segment !== "." && segment !== ".." && !/[\0\\]/.test(segment) && segment.length <= 128);
  if (safe.length === 0) return null;
  const prefix = url.origin === pageOrigin ? [] : ["external", url.hostname.replace(/^www\./, "")];
  const parts = [...prefix, ...safe];
  if (parts.length > 12) return null;
  const path = parts.join("/");
  return path.length <= 300 ? path : null;
}

const EXTENSION_BY_CONTENT_TYPE: Record<string, string> = {
  "text/css": "css",
  "text/javascript": "js",
  "application/javascript": "js",
  "application/x-javascript": "js",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "font/ttf": "ttf",
  "font/otf": "otf",
  "application/font-woff": "woff",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "audio/mpeg": "mp3",
  "application/json": "json",
  "text/plain": "txt",
};

export function extensionForContentType(contentType: string): string {
  const base = contentType.split(";", 1)[0].trim().toLowerCase();
  return EXTENSION_BY_CONTENT_TYPE[base] ?? "";
}

export function ensureExtension(path: string, contentType: string): string {
  const last = path.split("/").pop() ?? "";
  if (last.includes(".")) return path;
  const extension = extensionForContentType(contentType);
  return extension ? `${path}.${extension}` : path;
}

const CONTENT_TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  htm: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  mjs: "text/javascript; charset=utf-8",
  cjs: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  map: "application/json; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  ico: "image/x-icon",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  eot: "application/vnd.ms-fontobject",
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "audio/ogg",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  pdf: "application/pdf",
  wasm: "application/wasm",
};

export function contentTypeForPath(path: string): string {
  const extension = path.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

/* -------------------------------- rewriting -------------------------------- */

function relativePathFromTo(fromDir: string, toPath: string): string {
  const from = fromDir.split("/").filter(Boolean);
  const to = toPath.split("/").filter(Boolean);
  let common = 0;
  while (common < from.length && common < to.length - 1 && from[common] === to[common]) common += 1;
  const up = Math.max(from.length - common, 0);
  return `${"../".repeat(up)}${to.slice(common).join("/")}`.replace(/^\//, "");
}

function rewriteCssUrls(cssText: string, mapping: Map<string, string>, baseUrl: string, relativeTo?: string): string {
  return cssText.replace(/url\(\s*(["']?)([^'")]+)\1\s*\)/gi, (match, quote: string, value: string) => {
    const trimmed = value.trim();
    if (isSkippableRef(trimmed)) return match;
    const abs = toAbsolute(trimmed, baseUrl);
    if (!abs) return match;
    const local = mapping.get(abs.href);
    if (!local) return match;
    const target = relativeTo ? relativePathFromTo(relativeTo, local) : local;
    return `url(${quote}${target}${quote})`;
  });
}

/** Rewrites asset references in the fetched HTML to their local demo paths. */
export function rewriteHtml(html: string, mapping: Map<string, string>, baseUrl: string): string {
  return html
    .replace(/(\s(?:src|href|poster)\s*=\s*)(["'])(.*?)\2/gi, (match, attribute: string, quote: string, value: string) => {
      const trimmed = value.trim();
      if (isSkippableRef(trimmed)) return match;
      const abs = toAbsolute(trimmed, baseUrl);
      if (!abs) return match;
      const local = mapping.get(abs.href);
      if (!local) return match;
      return `${attribute}${quote}${local}${quote}`;
    })
    .replace(/(\bstyle\s*=\s*)(["'])(.*?)\2/gi, (match, attribute: string, quote: string, value: string) => {
      return `${attribute}${quote}${rewriteCssUrls(value, mapping, baseUrl)}${quote}`;
    })
    .replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (match, open: string, body: string, close: string) => {
      return `${open}${rewriteCssUrls(body, mapping, baseUrl)}${close}`;
    });
}

/** Rewrites url()/&#64;import references inside a fetched CSS file. */
export function rewriteCss(css: string, mapping: Map<string, string>, cssUrl: string): string {
  const cssDir = cssUrl.slice(0, cssUrl.lastIndexOf("/") + 1);
  return css
    .replace(/@import\s+(["'])([^"']+)\1/gi, (match, quote: string, value: string) => {
      const trimmed = value.trim();
      if (isSkippableRef(trimmed)) return match;
      const abs = toAbsolute(trimmed, cssUrl);
      if (!abs) return match;
      const local = mapping.get(abs.href);
      if (!local) return match;
      return `@import ${quote}${relativePathFromTo(cssDir, local)}${quote}`;
    })
    .replace(/url\(\s*(["']?)([^'")]+)\1\s*\)/gi, (match, quote: string, value: string) => {
      const trimmed = value.trim();
      if (isSkippableRef(trimmed)) return match;
      const abs = toAbsolute(trimmed, cssUrl);
      if (!abs) return match;
      const local = mapping.get(abs.href);
      if (!local) return match;
      return `url(${quote}${relativePathFromTo(cssDir, local)}${quote})`;
    });
}
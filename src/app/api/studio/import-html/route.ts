import { mkdir, writeFile, access, rename, rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { DEMO_SLUG_PATTERN, demoSiteExists, writeDemoSiteFiles, type DemoFile } from "@/lib/demo-files";
import { loadStudioDemos } from "@/lib/demo-store";
import {
  SITE_FETCH_LIMITS,
  guardedFetch,
  collectHtmlRefs,
  collectCssRefs,
  deriveLocalPath,
  ensureExtension,
  rewriteHtml,
  rewriteCss,
} from "@/lib/site-fetch";

const exists = async (p: string) => access(p).then(() => true).catch(() => false);

type PreparedFile = DemoFile;

function assetRank(kind: string) {
  return kind === "css" ? 0 : kind === "js" ? 1 : kind === "font" ? 2 : kind === "image" ? 3 : 4;
}

/** Conflict check shared by both import modes (environment-aware). */
async function demoConflict(slug: string): Promise<string | null> {
  const message = `A demo folder already exists for "${slug}". Choose a different name or remove the existing folder.`;
  if (process.env.NODE_ENV === "development") {
    if (await exists(path.join(process.cwd(), "public", "demos", slug))) return message;
    return null;
  }
  if (await demoSiteExists(slug)) return message;
  const { demos } = await loadStudioDemos();
  if (demos.some((demo) => demo.slug === slug)) {
    return `A demo with the slug "${slug}" already exists. Choose a different name.`;
  }
  return null;
}

/**
 * Persists demo files. Local development keeps writing `public/demos/<slug>/`
 * (Git audit trail). Production writes to Netlify Blobs — never to the
 * read-only deployed filesystem.
 */
async function writeDemo(slug: string, files: PreparedFile[]): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  if (process.env.NODE_ENV === "development") {
    const demosRoot = path.join(process.cwd(), "public", "demos");
    const tmp = path.join(demosRoot, `.tmp-${slug}-${randomUUID()}`);
    const root = path.join(demosRoot, slug);
    try {
      await mkdir(tmp, { recursive: true });
      for (const file of files) {
        const destination = path.join(tmp, file.path);
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, file.data);
      }
      if (!files.some((file) => file.path === "index.html")) throw new Error("index.html was not written correctly.");
      await rename(tmp, root);
      return { ok: true };
    } catch {
      await rm(tmp, { recursive: true, force: true });
      return { ok: false, error: "Unable to import the website.", status: 500 };
    }
  }
  const result = await writeDemoSiteFiles(files, slug);
  return result.ok ? { ok: true } : { ok: false, error: result.error, status: 503 };
}

/* ------------------------- mode 1: local website upload -------------------- */

async function importUpload(form: FormData) {
  const slugValue = form.get("slug");
  const manifestValue = form.get("manifest");
  const slug = typeof slugValue === "string" ? slugValue : "";
  const manifest = typeof manifestValue === "string" ? (JSON.parse(manifestValue) as { paths?: unknown; directories?: unknown }) : {};
  const paths = Array.isArray(manifest.paths) && manifest.paths.every((item) => typeof item === "string") ? (manifest.paths as string[]) : [];
  const directories = Array.isArray(manifest.directories) && manifest.directories.every((item) => typeof item === "string") ? (manifest.directories as string[]) : [];
  const rawFiles = form.getAll("files");

  if (!slug || !DEMO_SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "A valid kebab-case slug is required." }, { status: 400 });
  }
  if (rawFiles.length === 0 || rawFiles.length !== paths.length) {
    return NextResponse.json({ error: "No files were provided." }, { status: 400 });
  }

  const conflict = await demoConflict(slug);
  if (conflict) return NextResponse.json({ error: conflict }, { status: 409 });

  const hasRootIndex = paths.includes("index.html");
  if (!hasRootIndex) {
    return NextResponse.json({ error: "The selected folder does not contain index.html. Import cancelled." }, { status: 400 });
  }

  const normalizeRelativePath = (value: string) => {
    const normalized = value.replace(/\\/g, "/").replace(/^\.\//, "");
    const segments = normalized.split("/");
    if (!normalized || normalized.includes("\0") || normalized.startsWith("/") || /^[a-z]:/i.test(normalized) || segments.some((segment) => !segment || segment === "." || segment === "..")) {
      throw new Error(`Invalid import path: ${value}`);
    }
    return segments.join("/");
  };

  let cleanPaths: string[];
  try {
    cleanPaths = paths.map(normalizeRelativePath);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "The import contains an invalid path." }, { status: 400 });
  }
  if (new Set(cleanPaths).size !== cleanPaths.length) {
    return NextResponse.json({ error: "The import contains duplicate file paths." }, { status: 400 });
  }

  const files: PreparedFile[] = [];
  for (const [index, value] of rawFiles.entries()) {
    if (typeof value === "string") {
      return NextResponse.json({ error: `File data is missing for ${paths[index]}.` }, { status: 400 });
    }
    files.push({ path: cleanPaths[index], data: Buffer.from(await value.arrayBuffer()) });
  }

  const written = await writeDemo(slug, files);
  if (!written.ok) return NextResponse.json({ error: written.error }, { status: written.status });
  return NextResponse.json({ ok: true, slug, files: files.length, path: `/demos/${slug}/` });
}

/* ------------------------- mode 2: external website URL -------------------- */

async function importExternalSite(request: Request) {
  let payload: { url?: unknown; slug?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const url = typeof payload.url === "string" ? payload.url.trim() : "";
  const slug = typeof payload.slug === "string" ? payload.slug : "";
  if (!DEMO_SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "A valid kebab-case slug is required." }, { status: 400 });
  }
  if (!url) {
    return NextResponse.json({ error: "A website URL is required." }, { status: 400 });
  }

  const conflict = await demoConflict(slug);
  if (conflict) return NextResponse.json({ error: conflict }, { status: 409 });

  let indexResponse: Response;
  try {
    indexResponse = await guardedFetch(url, {
      timeoutMs: SITE_FETCH_LIMITS.indexTimeoutMs,
      headers: { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not fetch the website." }, { status: 502 });
  }
  if (!indexResponse.ok) {
    const status = indexResponse.status;
    await indexResponse.body?.cancel();
    return NextResponse.json({ error: `Could not fetch the website (${status}).` }, { status: 502 });
  }
  const responseContentType = indexResponse.headers.get("content-type") ?? "";
  if (!responseContentType.includes("text/html") && !responseContentType.includes("application/xhtml")) {
    await indexResponse.body?.cancel();
    return NextResponse.json({ error: "The URL did not return an HTML page." }, { status: 400 });
  }
  const html = await indexResponse.text();
  if (html.length > SITE_FETCH_LIMITS.maxHtmlBytes) {
    return NextResponse.json({ error: "The page is too large to import." }, { status: 400 });
  }
  const finalUrl = indexResponse.url || url;
  const origin = new URL(finalUrl).origin;

  const mapping = new Map<string, string>(); // absolute asset URL -> local demo path
  const files = new Map<string, PreparedFile>();
  let failedAssets = 0;
  let totalBytes = 0;

  const fetchAsset = async (ref: { url: string; kind: string }): Promise<void> => {
    if (mapping.has(ref.url)) return;
    if (files.size >= SITE_FETCH_LIMITS.maxAssets || totalBytes >= SITE_FETCH_LIMITS.maxTotalBytes) {
      failedAssets += 1;
      return;
    }
    try {
      const response = await guardedFetch(ref.url, { timeoutMs: SITE_FETCH_LIMITS.assetTimeoutMs, maxRedirects: 3 });
      if (!response.ok) {
        await response.body?.cancel();
        failedAssets += 1;
        return;
      }
      const assetContentType = response.headers.get("content-type") ?? "";
      if (assetContentType.includes("text/html")) {
        // An error page or HTML redirect target — keep the original URL instead.
        await response.body?.cancel();
        failedAssets += 1;
        return;
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      let localPath = deriveLocalPath(ref.url, origin);
      if (buffer.length === 0 || buffer.length > SITE_FETCH_LIMITS.maxAssetBytes || totalBytes + buffer.length > SITE_FETCH_LIMITS.maxTotalBytes || !localPath) {
        failedAssets += 1;
        return;
      }
      localPath = ensureExtension(localPath, assetContentType);
      if (!files.has(localPath)) {
        files.set(localPath, { path: localPath, data: buffer });
        totalBytes += buffer.length;
      }
      mapping.set(ref.url, localPath);
    } catch {
      failedAssets += 1;
    }
  };

  // Phase 1: every asset referenced by the HTML (CSS/JS first so the demo renders).
  const refs = collectHtmlRefs(html, finalUrl).sort((a, b) => assetRank(a.kind) - assetRank(b.kind));
  for (let index = 0; index < refs.length; index += SITE_FETCH_LIMITS.parallel) {
    await Promise.all(refs.slice(index, index + SITE_FETCH_LIMITS.parallel).map(fetchAsset));
  }

  // Phase 2: assets referenced from within fetched stylesheets (fonts, images).
  const cssEntries = [...files.values()].filter((file) => file.path.toLowerCase().endsWith(".css"));
  const cssTexts = new Map<string, string>();
  for (const cssFile of cssEntries) {
    const absolute = [...mapping.entries()].find(([, local]) => local === cssFile.path)?.[0];
    if (!absolute) continue;
    const cssText = cssFile.data.toString("utf8");
    cssTexts.set(cssFile.path, cssText);
    const nested = collectCssRefs(cssText, absolute).filter((ref) => !mapping.has(ref.url));
    for (let index = 0; index < nested.length; index += SITE_FETCH_LIMITS.parallel) {
      await Promise.all(nested.slice(index, index + SITE_FETCH_LIMITS.parallel).map(fetchAsset));
    }
  }

  // Rewrite fetched stylesheets with their final relative paths.
  const finalFiles: PreparedFile[] = [];
  for (const file of files.values()) {
    if (cssTexts.has(file.path)) {
      const absolute = [...mapping.entries()].find(([, local]) => local === file.path)![0];
      finalFiles.push({ path: file.path, data: Buffer.from(rewriteCss(cssTexts.get(file.path)!, mapping, absolute), "utf8") });
    } else {
      finalFiles.push(file);
    }
  }
  finalFiles.unshift({ path: "index.html", data: Buffer.from(rewriteHtml(html, mapping, finalUrl), "utf8") });

  const written = await writeDemo(slug, finalFiles);
  if (!written.ok) return NextResponse.json({ error: written.error }, { status: written.status });

  const counts = { css: 0, js: 0, images: 0, fonts: 0, other: 0 };
  for (const file of files.values()) {
    const lower = file.path.toLowerCase();
    if (lower.endsWith(".css")) counts.css += 1;
    else if (/\.(mjs|cjs|js)$/.test(lower)) counts.js += 1;
    else if (/\.(png|jpe?g|gif|svg|webp|avif|ico|bmp)$/.test(lower)) counts.images += 1;
    else if (/\.(woff2?|ttf|otf|eot)$/.test(lower)) counts.fonts += 1;
    else counts.other += 1;
  }
  return NextResponse.json({
    ok: true,
    slug,
    files: finalFiles.length,
    path: `/demos/${slug}/`,
    imported: { ...counts, failedAssets, totalRefs: refs.length },
  });
}

/* --------------------------------- handler --------------------------------- */

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("multipart/form-data")) return await importUpload(await request.formData());
    return await importExternalSite(request);
  } catch {
    return NextResponse.json({ error: "Unable to import the website." }, { status: 500 });
  }
}
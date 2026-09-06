import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

function extractMeta(html: string, attr: string, value: string): string | undefined {
  const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]*>`, "i");
  const match = html.match(re);
  if (!match) {
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`, "i");
    return html.match(re2)?.[1]?.trim();
  }
  const contentMatch = match[0].match(/content=["']([^"']*)["']/i);
  return contentMatch?.[1]?.trim();
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1]?.trim();
}

function extractFavicon(html: string): string | undefined {
  const match = html.match(/<link[^>]+rel=["']?icon["']?[^>]*href=["']([^"']*)["']/i) ?? html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']?icon["']?/i);
  return match?.[1]?.trim();
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const { url } = await request.json();
    if (!url || !/^https?:\/\//i.test(url)) return NextResponse.json({ error: "A valid HTTP(S) URL is required." }, { status: 400 });

    const parsed = new URL(url);
    const host = parsed.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.") || host.startsWith("10.") || host.startsWith("172.")) {
      return NextResponse.json({ error: "Local-network URLs are not permitted." }, { status: 400 });
    }

    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "FAA Digital Studio Metadata Fetcher" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return NextResponse.json({ error: `Could not fetch the URL (${response.status}).` }, { status: 400 });

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return NextResponse.json({ error: "The URL did not return an HTML page." }, { status: 400 });

    const html = await response.text();
    const finalUrl = response.url;

    const resolve = (value: string | undefined) => {
      if (!value) return undefined;
      try { return new URL(value, finalUrl).href; } catch { return undefined; }
    };

    const ogTitle = extractMeta(html, "property", "og:title");
    const ogDesc = extractMeta(html, "property", "og:description");
    const ogImage = extractMeta(html, "property", "og:image");
    const metaDesc = extractMeta(html, "name", "description");
    const title = ogTitle ?? extractTitle(html);
    const description = ogDesc ?? metaDesc;
    const image = resolve(ogImage);
    const favicon = resolve(extractFavicon(html));

    if (!title) return NextResponse.json({ error: "Could not detect a title from the page." }, { status: 400 });

    return NextResponse.json({
      ok: true,
      title,
      description,
      thumbnail: image ?? favicon,
      galleryImage: image,
      logo: favicon,
      seoTitle: title,
      seoDescription: description,
      sourceUrl: finalUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to validate the external website." }, { status: 500 });
  }
}

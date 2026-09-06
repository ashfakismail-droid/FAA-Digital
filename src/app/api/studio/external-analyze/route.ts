import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { SITE_FETCH_LIMITS, guardedFetch, collectHtmlRefs, extractSiteMetadata } from "@/lib/site-fetch";

/**
 * Server-side analysis for the external website import flow.
 * Browsers cannot fetch cross-origin sites, so the Studio asks this endpoint
 * to fetch the page and report the HTML and reachable assets. Nothing is
 * stored here — the import itself goes through /api/studio/import-html.
 */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const payload = await request.json();
    const url = typeof payload.url === "string" ? payload.url.trim() : "";
    if (!url) return NextResponse.json({ error: "A website URL is required." }, { status: 400 });

    let response: Response;
    try {
      response = await guardedFetch(url, {
        timeoutMs: SITE_FETCH_LIMITS.indexTimeoutMs,
        headers: { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
      });
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : "Could not fetch the website." }, { status: 502 });
    }
    if (!response.ok) {
      const status = response.status;
      await response.body?.cancel();
      return NextResponse.json({ error: `Could not fetch the website (${status}).` }, { status: 502 });
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      await response.body?.cancel();
      return NextResponse.json({ error: "The URL did not return an HTML page." }, { status: 400 });
    }
    const html = await response.text();
    if (html.length > SITE_FETCH_LIMITS.maxHtmlBytes) {
      return NextResponse.json({ error: "The page is too large to import." }, { status: 400 });
    }
    const finalUrl = response.url || url;

    const metadata = extractSiteMetadata(html, finalUrl);
    const refs = collectHtmlRefs(html, finalUrl);
    const counts = { css: 0, js: 0, images: 0, fonts: 0, other: 0 };
    for (const ref of refs) {
      const key = ref.kind === "image" ? "images" : ref.kind === "font" ? "fonts" : ref.kind;
      counts[key] += 1;
    }

    return NextResponse.json({
      ok: true,
      url: finalUrl,
      title: metadata.title,
      description: metadata.description,
      thumbnail: metadata.thumbnail,
      logo: metadata.logo,
      galleryImage: metadata.galleryImage,
      seoTitle: metadata.seoTitle,
      seoDescription: metadata.seoDescription,
      assets: {
        index: true,
        css: counts.css,
        js: counts.js,
        images: counts.images,
        favicon: Boolean(metadata.favicon) || refs.some((ref) => /favicon/i.test(ref.url)),
        thumbnail: Boolean(metadata.thumbnail),
      },
      totalRefs: refs.length,
    });
  } catch {
    return NextResponse.json({ error: "The website could not be analyzed." }, { status: 500 });
  }
}
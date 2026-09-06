import { NextResponse } from "next/server";
import { DEMO_SLUG_PATTERN, readDemoSiteFile, sanitizeDemoPathSegments } from "@/lib/demo-files";
import { contentTypeForPath } from "@/lib/site-fetch";

/**
 * Public server for demo files stored in Netlify Blobs (imported/uploaded
 * demos). Static demos keep being served straight from `public/demos/...`
 * with higher routing priority — this handler only fires when no static file
 * exists, so existing demos are unaffected.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; path?: string[] }> }) {
  const { slug, path } = await params;
  if (!DEMO_SLUG_PATTERN.test(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const relativePath = sanitizeDemoPathSegments(path ?? []);
  if (!relativePath) {
    return new NextResponse("Not found", { status: 404 });
  }
  const data = await readDemoSiteFile(slug, relativePath);
  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(data, {
    headers: {
      "content-type": contentTypeForPath(relativePath),
      "cache-control": "public, max-age=300",
    },
  });
}
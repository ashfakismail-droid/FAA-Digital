import { readdir, access, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const exists = async (file: string) => access(file).then(() => true).catch(() => false);

async function scanFolder(full: string, folder: string) {
  const files = await readdir(full, { withFileTypes: true });
  const hasIndex = await exists(path.join(full, "index.html"));
  const hasPackage = await exists(path.join(full, "package.json"));
  const hasNextConfig = files.some((file) => /^next\.config\./.test(file.name));
  const hasNextFolders = files.some((file) => file.isDirectory() && ["app", "pages"].includes(file.name));
  const detectedType = hasIndex ? "html" : hasPackage || hasNextConfig || hasNextFolders ? "nextjs" : "unknown";

  const assets = {
    css: files.some((file) => file.isDirectory() && ["css", "styles"].includes(file.name)) || files.some((file) => file.isFile() && /\.css$/i.test(file.name)),
    js: files.some((file) => file.isDirectory() && ["js", "scripts"].includes(file.name)) || files.some((file) => file.isFile() && /\.js$/i.test(file.name)),
    images: files.some((file) => file.isDirectory() && ["images", "img", "assets"].includes(file.name)),
    favicon: files.some((file) => /favicon/i.test(file.name)),
    thumbnail: files.some((file) => /thumb|preview/i.test(file.name)),
  };

  let suggestedTitle = folder.replace(/-/g, " ");
  let suggestedThumbnail: string | undefined;

  if (hasIndex) {
    try {
      const html = await readFile(path.join(full, "index.html"), "utf8");
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch?.[1]?.trim()) suggestedTitle = titleMatch[1].trim();
      const faviconMatch = html.match(/<link[^>]+rel=["']?icon["']?[^>]*href=["']([^"']*)["']/i) ?? html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']?icon["']?/i);
      if (faviconMatch?.[1]) suggestedThumbnail = `/demos/${folder}/${faviconMatch[1]}`;
    } catch {}
  }

  const imageFiles = files.filter((file) => file.isFile() && /\.(jpe?g|png|webp|svg)$/i.test(file.name));
  if (!suggestedThumbnail && imageFiles.length > 0) {
    suggestedThumbnail = `/demos/${folder}/${imageFiles[0].name}`;
  }

  return {
    folder,
    hasIndex,
    detectedType,
    runnable: hasIndex,
    assets,
    suggested: {
      title: suggestedTitle,
      slug: folder,
      thumbnail: suggestedThumbnail,
      source: { type: "local" as const, folder, detectedType },
    },
  };
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Studio is disabled." }, { status: 404 });
  const root = path.join(process.cwd(), "public", "demos");
  const entries = await readdir(root, { withFileTypes: true });
  const folders = await Promise.all(
    entries.filter((entry) => entry.isDirectory()).map((entry) => scanFolder(path.join(root, entry.name), entry.name))
  );
  return NextResponse.json({ folders });
}

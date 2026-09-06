import { mkdir, writeFile, access, rename, rm } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const exists = async (p: string) => access(p).then(() => true).catch(() => false);

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Studio is disabled." }, { status: 404 });
  try {
    const form = await request.formData();
    const slugValue = form.get("slug");
    const manifestValue = form.get("manifest");
    const slug = typeof slugValue === "string" ? slugValue : "";
    const manifest = typeof manifestValue === "string" ? JSON.parse(manifestValue) as { paths?: unknown; directories?: unknown } : {};
    const paths = Array.isArray(manifest.paths) && manifest.paths.every((item) => typeof item === "string") ? manifest.paths as string[] : [];
    const directories = Array.isArray(manifest.directories) && manifest.directories.every((item) => typeof item === "string") ? manifest.directories as string[] : [];
    const files = form.getAll("files");

    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: "A valid kebab-case slug is required." }, { status: 400 });
    }
    if (files.length === 0 || files.length !== paths.length) {
      return NextResponse.json({ error: "No files were provided." }, { status: 400 });
    }

    const root = path.join(process.cwd(), "public", "demos", slug);
    if (await exists(root)) {
      return NextResponse.json({ error: `A demo folder already exists for "${slug}". Choose a different name or remove the existing folder.` }, { status: 409 });
    }

    const hasRootIndex = paths.includes("index.html");
    if (!hasRootIndex) {
      return NextResponse.json({ error: "The selected folder does not contain index.html. Import cancelled." }, { status: 400 });
    }

    const demosRoot = path.join(process.cwd(), "public", "demos");
    const tmp = path.join(demosRoot, `.tmp-${slug}-${randomUUID()}`);

    const normalizeRelativePath = (value: string) => {
      const normalized = value.replace(/\\/g, "/").replace(/^\.\//, "");
      const segments = normalized.split("/");
      if (!normalized || normalized.includes("\0") || normalized.startsWith("/") || /^[a-z]:/i.test(normalized) || segments.some((segment) => !segment || segment === "." || segment === "..")) {
        throw new Error(`Invalid import path: ${value}`);
      }
      return segments.join(path.sep);
    };

    let cleanPaths: string[];
    let cleanDirectories: string[];
    try {
      cleanPaths = paths.map(normalizeRelativePath);
      cleanDirectories = directories.map(normalizeRelativePath);
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : "The import contains an invalid path." }, { status: 400 });
    }

    if (new Set(cleanPaths).size !== cleanPaths.length) {
      return NextResponse.json({ error: "The import contains duplicate file paths." }, { status: 400 });
    }

    try {
      await mkdir(tmp, { recursive: true });

      for (const directory of cleanDirectories) {
        await mkdir(path.join(tmp, directory), { recursive: true });
      }

      for (const [index, value] of files.entries()) {
        if (typeof value === "string") throw new Error(`File data is missing for ${paths[index]}.`);
        const dest = path.join(tmp, cleanPaths[index]);
        await mkdir(path.dirname(dest), { recursive: true });
        await writeFile(dest, Buffer.from(await value.arrayBuffer()));
      }

      const verify = await exists(path.join(tmp, "index.html"));
      if (!verify) {
        throw new Error("index.html was not written correctly.");
      }

      await rename(tmp, root);
    } catch (error) {
      await rm(tmp, { recursive: true, force: true });
      throw error;
    }

    return NextResponse.json({ ok: true, slug, files: files.length, path: `/demos/${slug}/` });
  } catch (error) {
    return NextResponse.json({ error: "Unable to import the website." }, { status: 500 });
  }
}



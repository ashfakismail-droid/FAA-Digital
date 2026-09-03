import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { validateStudioDemos } from "@/lib/studio-domain";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Studio persistence is disabled outside local development." }, { status: 404 });
  try {
    const payload = await request.json();
    const result = validateStudioDemos(payload.demos);
    if (!result.valid) return NextResponse.json({ error: result.error }, { status: 400 });
    const file = path.join(process.cwd(), "src", "config", "demos.ts");
    const original = await readFile(file, "utf8");
    const start = original.indexOf("export const demos: Demo[] = [");
    const end = original.indexOf("];", start);
    if (start < 0 || end < 0) return NextResponse.json({ error: "Metadata file structure is not recognized." }, { status: 500 });
    const arrayText = JSON.stringify(result.demos, null, 2).replace(/"([\w]+)":/g, "$1:");
    await writeFile(file, `${original.slice(0, start)}export const demos: Demo[] = ${arrayText};${original.slice(end + 2)}`, "utf8");
    return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: "Unable to save demo metadata." }, { status: 500 });
  }
}
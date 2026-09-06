import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { Demo, Project } from "@/types";
import { demos as staticDemos, getActiveDemos, getFeaturedHeroDemos, getShowcaseDemosAsProjects } from "@/config/demos";
import { validateStudioDemos } from "@/lib/studio-domain";

/**
 * Demo metadata storage.
 *
 * - Production (Netlify): Netlify Blobs — persistent across refreshes,
 *   logins, redeployments and devices, readable by both the Studio and the
 *   public homepage renderers.
 * - Local development: unchanged workflow — writes to `src/config/demos.ts`
 *   so Git remains the audit trail.
 * - Anywhere the store is unavailable or empty, the static config in
 *   `src/config/demos.ts` is the fallback seed, so the public site always
 *   renders exactly as before.
 */

const STORE_NAME = "faa-studio-metadata";
const STORE_KEY = "demos.json";

type StoredPayload = { version: 1; savedAt: string; demos: Demo[] };

async function getBlobsStore() {
  // Netlify injects this context into its Functions/SSR runtime.
  // Outside Netlify (plain `next dev`, `next start`) we never touch Blobs.
  if (!process.env.NETLIFY_BLOBS_CONTEXT) return null;
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore({ name: STORE_NAME, consistency: "strong" });
  } catch {
    return null;
  }
}

export async function loadStudioDemos(): Promise<{ demos: Demo[]; source: "store" | "config" }> {
  const store = await getBlobsStore();
  if (store) {
    try {
      const payload = (await store.get(STORE_KEY, { type: "json" })) as StoredPayload | null;
      if (payload && Array.isArray(payload.demos)) {
        const result = validateStudioDemos(payload.demos);
        if (result.valid) return { demos: result.demos, source: "store" };
      }
    } catch {
      // fall through to the static config seed
    }
  }
  return { demos: staticDemos, source: "config" };
}

async function persistDemosToFile(demos: Demo[]) {
  const file = path.join(process.cwd(), "src", "config", "demos.ts");
  const original = await readFile(file, "utf8");
  const start = original.indexOf("export const demos: Demo[] = [");
  const end = original.indexOf("];", start);
  if (start < 0 || end < 0) throw new Error("Metadata file structure is not recognized.");
  const arrayText = JSON.stringify(demos, null, 2).replace(/"([\w]+)":/g, "$1:");
  await writeFile(file, `${original.slice(0, start)}export const demos: Demo[] = ${arrayText};${original.slice(end + 2)}`, "utf8");
}

export async function persistStudioDemos(
  demos: Demo[],
): Promise<{ ok: true; medium: "store" | "file"; savedAt: string } | { ok: false; error: string }> {
  if (process.env.NODE_ENV === "development") {
    try {
      await persistDemosToFile(demos);
      return { ok: true, medium: "file", savedAt: new Date().toISOString() };
    } catch {
      return { ok: false, error: "Unable to save demo metadata." };
    }
  }

  const store = await getBlobsStore();
  if (!store) {
    return {
      ok: false,
      error: "The production metadata store is unavailable. Run the site on Netlify (or `netlify dev`) with Netlify Blobs enabled.",
    };
  }
  try {
    const savedAt = new Date().toISOString();
    await store.setJSON(STORE_KEY, { version: 1, savedAt, demos } satisfies StoredPayload);
    return { ok: true, medium: "store", savedAt };
  } catch {
    return { ok: false, error: "Unable to save demo metadata to the production store." };
  }
}

/** Public pages that render demo-driven content and must refresh after a save. */
export function revalidateDemoDrivenPaths() {
  for (const target of ["/", "/demos", "/studio", "/studio/demos"]) {
    try {
      revalidatePath(target);
    } catch {
      // revalidation is best-effort; ISR windows cover the rest
    }
  }
}

export async function loadActiveDemos(): Promise<Demo[]> {
  const { demos } = await loadStudioDemos();
  return getActiveDemos(demos);
}

export async function loadFeaturedHeroDemos(): Promise<Demo[]> {
  const { demos } = await loadStudioDemos();
  return getFeaturedHeroDemos(demos);
}

export async function loadShowcaseDemosAsProjects(): Promise<Project[]> {
  const { demos } = await loadStudioDemos();
  return getShowcaseDemosAsProjects(demos);
}
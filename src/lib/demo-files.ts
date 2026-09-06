/**
 * Demo site file storage.
 *
 * - Production (Netlify): imported/uploaded demo files live in Netlify Blobs
 *   (`faa-demo-sites`), keyed as `<slug>/<relative path>` and served publicly
 *   through the `/demos/<slug>/...` route handler. Persistent across
 *   refreshes, logins and redeployments — never written to the read-only
 *   deployed filesystem.
 * - Local development: files stay on disk under `public/demos/<slug>/`
 *   (handled by the import route); this store is simply unavailable.
 */

const DEMO_FILES_STORE = "faa-demo-sites";

export const DEMO_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type DemoFile = { path: string; data: Buffer };

async function getDemoFilesStore() {
  // Netlify injects this context into its Functions/SSR runtime.
  if (!process.env.NETLIFY_BLOBS_CONTEXT) return null;
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore({ name: DEMO_FILES_STORE, consistency: "strong" });
  } catch {
    return null;
  }
}

/** True when a demo site with this slug has already been imported. */
export async function demoSiteExists(slug: string): Promise<boolean> {
  const store = await getDemoFilesStore();
  if (!store) return false;
  try {
    return (await store.get(`${slug}/index.html`)) != null;
  } catch {
    return false;
  }
}

/** Persists demo files to the production store. Fails closed. */
export async function writeDemoSiteFiles(files: DemoFile[], slug: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const store = await getDemoFilesStore();
  if (!store) {
    return {
      ok: false,
      error: "The production demo storage is unavailable. Run the site on Netlify (or `netlify dev`) with Netlify Blobs enabled.",
    };
  }
  try {
    for (const file of files) {
      const bytes = new Uint8Array(file.data.byteLength);
      bytes.set(file.data);
      await store.set(`${slug}/${file.path}`, bytes.buffer);
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Unable to store the demo files." };
  }
}

/** Reads one demo file from the production store (null when missing). */
export async function readDemoSiteFile(slug: string, relativePath: string): Promise<ArrayBuffer | null> {
  const store = await getDemoFilesStore();
  if (!store) return null;
  try {
    return await store.get(`${slug}/${relativePath}`, { type: "arrayBuffer" });
  } catch {
    return null;
  }
}

/** Normalizes request path segments for demo file lookup; null when unsafe. */
export function sanitizeDemoPathSegments(segments: string[]): string | null {
  if (!Array.isArray(segments) || segments.length === 0) return null;
  const safe: string[] = [];
  for (const raw of segments) {
    if (typeof raw !== "string") return null;
    let segment = raw;
    try {
      segment = decodeURIComponent(raw);
    } catch {
      return null;
    }
    if (!segment || segment === "." || segment === ".." || segment.includes("\0") || segment.includes("\\") || segment.includes("/")) return null;
    if (segment.length > 128) return null;
    safe.push(segment);
  }
  if (safe.length > 12) return null;
  return safe.join("/");
}
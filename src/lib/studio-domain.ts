import type { Demo } from "@/types";

export function normalizeDemos(demos: Demo[]) {
  return demos.map((demo, index) => ({
    ...demo,
    order: index + 1,
    industry: demo.industry ?? demo.category,
    publishState: demo.publishState ?? (demo.status === "live" ? "published" : "draft"),
    source: demo.source ?? { type: "local" as const, folder: demo.slug, detectedType: "html" as const },
  }));
}

export function validateStudioDemos(value: unknown): { valid: true; demos: Demo[] } | { valid: false; error: string } {
  if (!Array.isArray(value)) return { valid: false, error: "Demo metadata must be an array." };
  const slugs = new Set<string>();
  const orders = new Set<number>();
  for (const [index, raw] of value.entries()) {
    if (!raw || typeof raw !== "object") return { valid: false, error: `Demo ${index + 1} is invalid.` };
    const demo = raw as Partial<Demo>;
    if (!demo.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(demo.slug)) return { valid: false, error: `Demo ${index + 1} needs a kebab-case slug.` };
    if (slugs.has(demo.slug)) return { valid: false, error: `Duplicate slug: ${demo.slug}.` };
    slugs.add(demo.slug);
    if (demo.order !== undefined) {
      if (!Number.isInteger(demo.order) || demo.order < 1) return { valid: false, error: `${demo.slug} has an invalid order.` };
      if (orders.has(demo.order)) return { valid: false, error: `Duplicate order: ${demo.order}.` };
      orders.add(demo.order);
    }
    if (!demo.title?.trim() || !demo.category?.trim() || !demo.description?.trim()) return { valid: false, error: `${demo.slug} is missing required text.` };
    if (!Array.isArray(demo.features) || !Array.isArray(demo.technologies)) return { valid: false, error: `${demo.slug} needs list fields.` };
    if (!Array.isArray(demo.palette) || demo.palette.length !== 2 || demo.palette.some((color) => typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color))) return { valid: false, error: `${demo.slug} needs two hex colors.` };
    if (demo.source?.type === "external" && (!demo.source.url || !/^https?:\/\//i.test(demo.source.url))) return { valid: false, error: `${demo.slug} needs a valid external URL.` };
  }
  const heroCount = (value as Demo[]).filter((d) => d.featuredHero).length;
  if (heroCount > 1) return { valid: false, error: `Only one demo can be Featured Hero (found ${heroCount}).` };
  return { valid: true, demos: normalizeDemos(value as Demo[]) };
}

export function serializeDemoArray(demos: Demo[]) {
  return JSON.stringify(demos, null, 2).replace(/"([\w]+)":/g, "$1:");
}
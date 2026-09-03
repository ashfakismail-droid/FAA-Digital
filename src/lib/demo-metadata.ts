import type { Demo } from "@/types";

export const demoStatuses = ["live", "in-progress", "coming-soon", "archived"] as const;

export function validateDemos(value: unknown): { valid: true; demos: Demo[] } | { valid: false; error: string } {
  if (!Array.isArray(value)) return { valid: false, error: "Demo metadata must be an array." };
  const slugs = new Set<string>();

  for (const [index, entry] of value.entries()) {
    if (!entry || typeof entry !== "object") return { valid: false, error: `Demo ${index + 1} is invalid.` };
    const demo = entry as Partial<Demo>;
    if (!demo.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(demo.slug)) return { valid: false, error: `Demo ${index + 1} needs a valid kebab-case slug.` };
    if (slugs.has(demo.slug)) return { valid: false, error: `Duplicate slug: ${demo.slug}.` };
    slugs.add(demo.slug);
    if (!demo.title?.trim() || !demo.category?.trim() || !demo.description?.trim()) return { valid: false, error: `${demo.slug} is missing required text fields.` };
    if (!Array.isArray(demo.features) || !Array.isArray(demo.technologies)) return { valid: false, error: `${demo.slug} needs features and technologies arrays.` };
    if (!Array.isArray(demo.palette) || demo.palette.length !== 2 || demo.palette.some((color) => !/^#[0-9a-f]{6}$/i.test(color))) return { valid: false, error: `${demo.slug} needs two valid hex colors.` };
    if (!demo.status || !demoStatuses.includes(demo.status)) return { valid: false, error: `${demo.slug} has an invalid status.` };
  }

  return { valid: true, demos: value as Demo[] };
}

export function serializeDemos(demos: Demo[]) {
  return `import type { Demo } from "@/types";\n\nexport const demos: Demo[] = ${JSON.stringify(demos, null, 2)};\n\nexport function getDemo(slug: string) {\n  return demos.find((demo) => demo.slug === slug);\n}\n\nexport function getActiveDemos() {\n  return demos.filter((demo) => demo.status !== "archived" && demo.visibility !== "private");\n}\n\nexport function getAllCategories() {\n  return Array.from(new Set(demos.map((demo) => demo.category))).sort();\n}\n`;
}
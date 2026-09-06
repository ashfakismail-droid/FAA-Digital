import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { validateStudioDemos } from "@/lib/studio-domain";
import { persistStudioDemos, revalidateDemoDrivenPaths } from "@/lib/demo-store";

/**
 * Studio metadata persistence.
 * - Local development: writes src/config/demos.ts (existing Git workflow).
 * - Production (authenticated admin only): persists to Netlify Blobs and
 *   revalidates the public pages that render demo-driven content.
 */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const payload = await request.json();
    const result = validateStudioDemos(payload.demos);
    if (!result.valid) return NextResponse.json({ error: result.error }, { status: 400 });
    const saved = await persistStudioDemos(result.demos);
    if (!saved.ok) return NextResponse.json({ error: saved.error }, { status: 503 });
    revalidateDemoDrivenPaths();
    return NextResponse.json({ ok: true, savedAt: saved.savedAt, medium: saved.medium });
  } catch {
    return NextResponse.json({ error: "Unable to save demo metadata." }, { status: 500 });
  }
}
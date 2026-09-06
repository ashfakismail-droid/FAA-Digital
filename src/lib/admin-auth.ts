import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, readSessionCookie, verifySessionToken } from "@/lib/admin-session";

export const isDevEnvironment = () => process.env.NODE_ENV === "development";

async function hasValidSession(token: string | undefined | null): Promise<boolean> {
  return Boolean(await verifySessionToken(token));
}

/**
 * Guard for studio API route handlers.
 *
 * - Local development keeps its current no-auth workflow (bypass).
 * - Production requires a valid signed admin session cookie; otherwise a 401
 *   is returned and the handler body never runs.
 */
export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  if (isDevEnvironment()) return null;
  if (await hasValidSession(readSessionCookie(request))) return null;
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}

/**
 * Server-component / layout guard for the Studio pages.
 * Development is always allowed (existing behaviour); production requires the
 * signed admin session cookie.
 */
export async function isStudioAuthed(): Promise<boolean> {
  if (isDevEnvironment()) return true;
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return hasValidSession(token);
}
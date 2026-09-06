import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  adminCredentialsConfigured,
  createSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-session";

/**
 * Best-effort brute-force throttle. Serverless instances are ephemeral, so
 * this is per-instance, but it still slows credential stuffing down and
 * never blocks legitimate sign-ins after a cold start.
 */
const MAX_ATTEMPTS_PER_WINDOW = 8;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isThrottled(key: string) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (entry.resetAt <= Date.now()) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS_PER_WINDOW;
}

function recordFailure(key: string) {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= Date.now()) {
    attempts.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isThrottled(key)) {
    return NextResponse.json({ error: "Too many sign-in attempts. Try again later." }, { status: 429 });
  }

  if (!adminCredentialsConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on this deployment. Set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 503 },
    );
  }

  let payload: { username?: unknown; password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!(await verifyAdminCredentials(payload.username, payload.password))) {
    recordFailure(key);
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  attempts.delete(key);
  const token = await createSessionToken(String(payload.username));
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
import { randomUUID } from "node:crypto";
import { lookup } from "node:dns/promises";
import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { isIP } from "node:net";
import path from "node:path";
import { NextResponse } from "next/server";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const UPLOAD_BASENAME = "studio-thumbnail";
const supportedUploads = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
} as const;

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  );
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) return isPrivateIpv4(address);
  const normalized = address.toLowerCase().split("%")[0];
  if (normalized.startsWith("::ffff:")) return isPrivateIpv4(normalized.slice(7));
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    /^fe[89ab]/.test(normalized) ||
    normalized.startsWith("ff")
  );
}

async function assertPublicImageUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 2048) throw new Error("Enter a valid HTTP(S) image URL.");

  let current: URL;
  try {
    current = new URL(value);
  } catch {
    throw new Error("Enter a valid HTTP(S) image URL.");
  }

  for (let redirects = 0; redirects <= 5; redirects += 1) {
    if (!["http:", "https:"].includes(current.protocol) || current.username || current.password) {
      throw new Error("Only public HTTP(S) image URLs are allowed.");
    }

    const addresses = await lookup(current.hostname, { all: true, verbatim: true }).catch(() => []);
    if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
      throw new Error("The image URL must use a public host.");
    }

    const response = await fetch(current, {
      method: "GET",
      redirect: "manual",
      headers: {
        accept: "image/*",
        range: "bytes=0-0",
        "user-agent": "FAA Digital Studio Image Validator",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) throw new Error("The image URL redirected without a destination.");
      current = new URL(location, current);
      continue;
    }

    const contentType = response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() ?? "";
    await response.body?.cancel();
    if (!response.ok) throw new Error(`The image URL could not be loaded (${response.status}).`);
    if (!contentType.startsWith("image/")) throw new Error("The URL does not return an image.");
    return { url: current.href, contentType };
  }

  throw new Error("The image URL has too many redirects.");
}

function hasValidSignature(buffer: Buffer, mimeType: keyof typeof supportedUploads) {
  if (mimeType === "image/jpeg") return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mimeType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  return buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
}

async function uploadThumbnail(form: FormData) {
  const slugValue = form.get("slug");
  const fileValue = form.get("file");
  const slug = typeof slugValue === "string" ? slugValue : "";

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Save a valid kebab-case demo slug before uploading a thumbnail." }, { status: 400 });
  }
  if (!fileValue || typeof fileValue === "string") {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (fileValue.size === 0 || fileValue.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "The thumbnail must be between 1 byte and 10 MB." }, { status: 400 });
  }

  const mimeType = fileValue.type.toLowerCase() as keyof typeof supportedUploads;
  const allowedExtensions = supportedUploads[mimeType];
  const extension = path.extname(fileValue.name).slice(1).toLowerCase();
  if (!allowedExtensions || !(allowedExtensions as readonly string[]).includes(extension)) {
    return NextResponse.json({ error: "Use a JPG, JPEG, PNG, or WEBP image." }, { status: 400 });
  }

  const buffer = Buffer.from(await fileValue.arrayBuffer());
  if (!hasValidSignature(buffer, mimeType)) {
    return NextResponse.json({ error: "The selected file is not a valid image of the expected format." }, { status: 400 });
  }

  const canonicalExtension = mimeType === "image/jpeg" ? "jpg" : extension;
  const assets = path.join(process.cwd(), "public", "demos", slug, "assets");
  const filename = `${UPLOAD_BASENAME}.${canonicalExtension}`;
  const destination = path.join(assets, filename);
  const temporary = path.join(assets, `.${UPLOAD_BASENAME}-${randomUUID()}.tmp`);

  await mkdir(assets, { recursive: true });
  await writeFile(temporary, buffer, { flag: "wx" });
  try {
    const existing = await readdir(assets);
    await Promise.all(
      existing
        .filter((entry) => entry.startsWith(`${UPLOAD_BASENAME}.`) && entry !== filename)
        .map((entry) => rm(path.join(assets, entry), { force: true }))
    );
    await rm(destination, { force: true });
    await rename(temporary, destination);
  } catch (error) {
    await rm(temporary, { force: true });
    throw error;
  }

  return NextResponse.json({
    ok: true,
    path: `/demos/${slug}/assets/${filename}?v=${Date.now()}`,
  });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Studio is disabled." }, { status: 404 });

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) return uploadThumbnail(await request.formData());

    const payload = await request.json();
    const image = await assertPublicImageUrl(payload.url);
    return NextResponse.json({ ok: true, ...image });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to manage the thumbnail." }, { status: 400 });
  }
}
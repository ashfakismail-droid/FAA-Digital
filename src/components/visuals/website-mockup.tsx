"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface WebsiteMockupProps {
  icon: string;
  palette: [string, string];
  title: string;
  category?: string;
  className?: string;
  variant?: "hero" | "card";
  thumbnail?: string;
}

/**
 * Generative website preview — renders a stylized browser mockup
 * unique to each project's palette and icon, or displays a real thumbnail.
 */
export function WebsiteMockup({ icon, palette, title, category, className, variant = "card", thumbnail }: WebsiteMockupProps) {
  const [bg, accent] = palette;
  const isHero = variant === "hero";
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  useEffect(() => {
    setThumbnailFailed(false);
  }, [thumbnail]);

  // If thumbnail is provided, render real image
  if (thumbnail && !thumbnailFailed) {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ background: `linear-gradient(135deg, ${bg} 0%, ${adjustColor(bg, 18)} 100%)` }}
        role="img"
        aria-label={`${title} website preview`}
      >
        {/* Ambient glow */}
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: accent }}
        />
        <div
          className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{ background: accent }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Browser frame */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 shadow-2xl",
            isHero ? "max-w-[640px]" : "max-w-[420px]"
          )}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="mx-auto flex h-5 w-1/2 items-center justify-center rounded-md bg-white/10 px-2">
              <span className="truncate text-[9px] font-medium tracking-wide text-white/60">
                {title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com
              </span>
            </div>
            <div className="w-8" />
          </div>

          {/* Real thumbnail image */}
          <div className="relative bg-black/40">
            <Image
              src={thumbnail}
              alt={`${title} preview`}
              width={isHero ? 640 : 420}
              height={isHero ? 360 : 250}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
              unoptimized
              onError={() => setThumbnailFailed(true)}
            />
          </div>
        </div>
      </div>
    );
  }

  // Otherwise render generative mockup
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${bg} 0%, ${adjustColor(bg, 18)} 100%)` }}
      role="img"
      aria-label={`${title} website preview`}
    >
      {/* Ambient glow */}
      <div
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: accent }}
      />
      <div
        className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{ background: accent }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Browser frame */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-sm",
          isHero ? "max-w-[640px]" : "max-w-[420px]"
        )}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="mx-auto flex h-5 w-1/2 items-center justify-center rounded-md bg-white/10 px-2">
            <span className="truncate text-[9px] font-medium tracking-wide text-white/60">
              {title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com
            </span>
          </div>
          <div className="w-8" />
        </div>

        {/* Site nav */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: accent }}
            >
              <Icon name={icon} className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            </div>
            <div className="h-1.5 w-12 rounded-full bg-white/40" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-8 rounded-full bg-white/25" />
            <div className="h-1.5 w-8 rounded-full bg-white/25" />
            <div className="h-5 w-12 rounded-full" style={{ background: accent }} />
          </div>
        </div>

        {/* Hero content */}
        <div className="px-5 pb-5 pt-6">
          <div
            className="mb-2 inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-white/80"
            style={{ background: `${accent}55` }}
          >
            {category ?? title}
          </div>
          <div className="space-y-2">
            <div className="h-3 w-4/5 rounded-full bg-white/70" />
            <div className="h-3 w-3/5 rounded-full bg-white/45" />
          </div>
          <div className="mt-3 h-1.5 w-2/3 rounded-full bg-white/20" />

          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full" style={{ background: accent }} />
            <div className="h-6 w-16 rounded-full border border-white/25" />
          </div>

          {/* Feature cards */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.06] p-2.5">
                <div
                  className="mb-1.5 h-4 w-4 rounded-md opacity-80"
                  style={{ background: accent, opacity: 0.9 - i * 0.2 }}
                />
                <div className="h-1 w-3/4 rounded-full bg-white/35" />
                <div className="mt-1 h-1 w-1/2 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Darken/lighten a hex color by a percentage */
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
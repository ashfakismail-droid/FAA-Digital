"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";

export function StudioEntry() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="flex justify-center pb-8 pt-2">
      <Link
        href="/studio"
        aria-label="FAA Digital Studio"
        title="FAA Digital Studio"
        className="group inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-muted/50 transition-all duration-300 hover:border-brand-500/40 hover:bg-brand-500/5 hover:text-brand-500"
      >
        <Settings2 className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
      </Link>
    </div>
  );
}
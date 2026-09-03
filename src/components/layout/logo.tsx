import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — Home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-brand-600 text-white shadow-[0_4px_16px_-4px_rgb(75_73_214/0.6)] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}

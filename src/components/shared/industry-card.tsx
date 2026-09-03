import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/types";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function IndustryCard({ industry, className }: { industry: Industry; className?: string }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={cn(
        "group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card",
        className
      )}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-600/5 text-brand-600 transition-transform duration-500 group-hover:scale-110 dark:text-brand-400">
        <Icon name={industry.icon} className="h-7 w-7" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {industry.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted">{industry.tagline}</p>
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-brand-500/40 group-hover:bg-brand-600 group-hover:text-white">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

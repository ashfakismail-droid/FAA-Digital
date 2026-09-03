import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-500/30 hover:shadow-lifted",
        className
      )}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white dark:text-brand-400">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {service.shortTitle}
      </h3>
      <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{service.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

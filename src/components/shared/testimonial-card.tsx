import Link from "next/link";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-soft",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <Quote className="h-5 w-5 fill-current" />
        </span>
        <span className="flex gap-0.5 text-amber-400" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
      </div>
      <blockquote className="flex-1 text-pretty text-[15px] leading-relaxed text-foreground">
        "{testimonial.quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-semibold text-white">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
        {testimonial.project && (
          <Link
            href={`/demos/${testimonial.project}`}
            className="ml-auto shrink-0 text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            View case
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

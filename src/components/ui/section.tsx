import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  bleed?: boolean;
}

export function Section({ children, className, containerClassName, id, bleed }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      {bleed ? (
        children
      ) : (
        <div className={cn("container-x", containerClassName)}>{children}</div>
      )}
    </section>
  );
}

export function SectionTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400",
        className
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  tag?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  tag,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {tag ? <SectionTag className="mb-5">{tag}</SectionTag> : null}
      <h2
        className={cn(
          "text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

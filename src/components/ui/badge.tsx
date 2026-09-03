import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "brand" | "outline" | "success";

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-2 text-muted border-transparent",
  brand: "bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20",
  outline: "bg-transparent text-muted border-border",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

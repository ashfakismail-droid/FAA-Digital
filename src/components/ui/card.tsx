import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 ease-out-expo",
        hover && "hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

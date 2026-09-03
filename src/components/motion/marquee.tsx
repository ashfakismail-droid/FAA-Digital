import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse,
  speed = "normal",
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
}) {
  const animationClass = reverse
    ? "animate-marquee-reverse"
    : speed === "fast"
      ? "animate-marquee-fast"
      : "animate-marquee";

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          animationClass,
          pauseOnHover && "group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

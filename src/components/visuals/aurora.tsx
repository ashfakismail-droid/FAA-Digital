import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      <div className="absolute -top-1/4 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 animate-aurora rounded-full bg-brand-500/12 blur-[120px] motion-reduce:animate-none" />
      <div className="absolute top-1/3 -left-1/4 h-[50vh] w-[50vw] animate-aurora rounded-full bg-brand-400/10 blur-[100px] [animation-delay:-6s] motion-reduce:animate-none" />
      <div className="absolute top-1/4 -right-1/4 h-[45vh] w-[45vw] animate-aurora rounded-full bg-brand-600/10 blur-[100px] [animation-delay:-12s] motion-reduce:animate-none" />
    </div>
  );
}

export function GlowOrb({
  className,
  color = "bg-brand-500/20",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-[100px]", color, className)}
    />
  );
}

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] bg-noise opacity-[0.025] mix-blend-overlay dark:opacity-[0.04]"
    />
  );
}

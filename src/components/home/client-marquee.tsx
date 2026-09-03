import { clients } from "@/config/site";
import { Marquee } from "@/components/motion/marquee";

export function ClientMarquee() {
  return (
    <section aria-label="Trusted by clients" className="border-y border-border bg-surface/50 py-10">
      <div className="container-x mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Trusted by ambitious businesses
        </p>
      </div>
      <Marquee className="mask-fade-x">
        {clients.map((client) => (
          <span
            key={client}
            className="mx-8 whitespace-nowrap font-display text-lg font-medium tracking-tight text-muted/70 transition-colors hover:text-foreground"
          >
            {client}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

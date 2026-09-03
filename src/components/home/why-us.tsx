import { stats } from "@/config/site";
import { Section, SectionTag } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  {
    icon: "Target",
    title: "Strategy before pixels",
    description:
      "Every project starts with your business model and customer psychology. We design what will convert, not just what looks good in a portfolio.",
  },
  {
    icon: "Gauge",
    title: "Performance as religion",
    description:
      "Sub-second loads and 90+ Lighthouse scores aren't stretch goals — they're the baseline every project is held to before launch.",
  },
  {
    icon: "ShieldCheck",
    title: "You own everything",
    description:
      "Code, design files, domains, and hosting — all registered in your name. No lock-in, no hostage situations, ever.",
  },
  {
    icon: "TrendingUp",
    title: "Partnership beyond launch",
    description:
      "Launch day is the starting line. We measure, iterate, and improve — because a website should compound like an asset, not decay like a brochure.",
  },
];

export function WhyUs() {
  return (
    <Section className="relative overflow-hidden bg-foreground text-background dark:bg-surface-2 dark:text-foreground">
      {/* Decorative */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]"
      />

      <div className="relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionTag className="border-white/20 bg-white/5 text-white dark:border-brand-500/25 dark:bg-brand-500/5">
              Why FAA Digital
            </SectionTag>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              The agency businesses call when ordinary isn't an option
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed opacity-70 sm:text-lg">
              We're a small senior team by design. Every project gets founder-level attention,
              engineering rigour, and an obsessive standard for craft — because your website is
              often the first handshake your business ever gives.
            </p>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm dark:border-border dark:bg-surface"
                >
                  <dd className="font-display text-3xl font-semibold tracking-tight text-brand-400 sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-sm opacity-70">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <Stagger className="flex flex-col gap-4" stagger={0.1}>
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400/40 dark:border-border dark:bg-surface dark:hover:border-brand-500/40">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={pillar.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed opacity-70">{pillar.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

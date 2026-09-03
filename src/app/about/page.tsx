import type { Metadata } from "next";
import { site, stats } from "@/config/site";
import { techStack, techCategories } from "@/config/tech-stack";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { Counter } from "@/components/motion/counter";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "About — The Team Behind Exceptional Digital Experiences",
  description:
    "FAA Digital is a senior, craft-obsessed digital agency. Learn about our mission, values, design philosophy, and the standards we hold every project to.",
  path: "/about",
});

const values = [
  {
    icon: "Gem",
    title: "Craft over shortcuts",
    description:
      "Details compound. The kerning, the easing curve, the alt text — excellence is a thousand small decisions made correctly.",
  },
  {
    icon: "Heart",
    title: "Honesty over optics",
    description:
      "We tell clients what they need to hear, not what closes the deal. Sometimes that's 'you don't need us yet.'",
  },
  {
    icon: "Target",
    title: "Outcomes over outputs",
    description:
      "A beautiful website that doesn't move a business metric is an expensive poster. We optimize for results.",
  },
  {
    icon: "ShieldCheck",
    title: "Ownership over lock-in",
    description:
      "Clients own their code, content, and accounts. We earn retention through value, never through hostage-taking.",
  },
];

const milestones = [
  { year: "2019", title: "Founded in Bengaluru", description: "Two laptops, one belief: businesses deserve websites that actually work." },
  { year: "2020", title: "First 20 clients", description: "Restaurants and clinics during a year that made digital presence existential." },
  { year: "2022", title: "E-commerce & platforms", description: "Expanded from websites into headless commerce and custom web applications." },
  { year: "2024", title: "100th project shipped", description: "A milestone celebrated by publishing our process openly — this very playbook." },
  { year: "2026", title: "International clientele", description: "40% of our work now spans the US, UK, UAE, Singapore, and Australia." },
];

const standards = [
  "90+ Lighthouse performance score on every key page",
  "WCAG 2.2 AA accessibility compliance as baseline",
  "Zero console errors, zero broken links, zero lorem ipsum",
  "Every form tested with real submissions before launch",
  "Semantic HTML and full keyboard navigability",
  "Design QA at 5 breakpoints on real devices",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>About us</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              A small team with unreasonable standards
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {site.name} exists because too many businesses pay for websites that quietly fail
              them. Since {site.founded}, we've built the opposite: digital experiences measured by
              the results they produce.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl bg-brand-950 p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                Our mission
              </p>
              <p className="mt-5 text-balance font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                To make exceptional digital experiences accessible to every serious business — not
                just those with enterprise budgets.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-soft sm:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
                Our vision
              </p>
              <p className="mt-5 text-balance font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
                A web where the local restaurant's site is as considered as a tech giant's — because
                craft should never be a luxury.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Core values"
          title="What we refuse to compromise"
          description="Four principles that decide every hire, every project, and every pixel."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.07}>
              <div className="group h-full rounded-3xl border border-border bg-surface p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition-transform duration-500 group-hover:scale-110 dark:text-brand-400">
                  <Icon name={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-muted">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Story timeline */}
      <Section>
        <SectionHeader
          tag="Our story"
          title="Seven years of earning it"
          description="No funding, no growth hacks — just referrals from clients whose websites worked."
        />
        <div className="mx-auto max-w-3xl">
          <ol className="relative flex flex-col gap-10 border-l-2 border-border pl-10">
            {milestones.map((milestone, i) => (
              <Reveal key={milestone.year} as="li" delay={i * 0.06} className="relative">
                <span className="absolute -left-[49px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-background bg-brand-500" />
                <p className="font-mono text-sm font-semibold tracking-widest text-brand-600 dark:text-brand-400">
                  {milestone.year}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted">{milestone.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Quality standards */}
      <Section className="relative overflow-hidden bg-foreground text-background dark:bg-surface-2 dark:text-foreground">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]"
        />
        <div className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionTag className="border-white/20 bg-white/5 text-white dark:border-brand-500/25 dark:bg-brand-500/5">
              Quality standards
            </SectionTag>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              The checklist every project must pass
            </h2>
            <p className="mt-5 text-pretty leading-relaxed opacity-70">
              Quality isn't a feeling — it's a list of verifiable standards. If a project doesn't
              clear every one of these, it doesn't launch. Full stop.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 dark:border-border dark:bg-surface">
                  <dd className="font-display text-3xl font-semibold text-brand-400">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs opacity-70">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <ul className="flex flex-col gap-3">
            {standards.map((standard, i) => (
              <Reveal key={standard} as="li" delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 dark:border-border dark:bg-surface">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/20 font-mono text-xs font-semibold text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-medium">{standard}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Technology */}
      <Section>
        <SectionHeader
          tag="How we build"
          title="Technology we trust in production"
          description="Chosen for longevity, not fashion. Every tool below has earned its place across dozens of launches."
        />
        <div className="flex flex-col gap-8">
          {techCategories.map((category) => (
            <Reveal key={category}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <h3 className="w-32 shrink-0 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {techStack
                    .filter((t) => t.category === category)
                    .map((tech) => (
                      <span
                        key={tech.name}
                        title={tech.blurb}
                        className="cursor-default rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-card"
                      >
                        {tech.name}
                      </span>
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Sound like your kind of team?"
        description="We take on a limited number of projects to keep standards high. Tell us about yours — the conversation costs nothing."
      />
    </>
  );
}

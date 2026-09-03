import type { Metadata } from "next";
import { processSteps } from "@/config/process";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { CtaSection } from "@/components/shared/cta-section";
import { ProcessTimeline } from "@/components/process/process-timeline";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "Our Process — From First Call to Compounding Asset",
  description:
    "A nine-phase process refined over 120+ launches: discovery, research, planning, wireframing, design, development, testing, launch, and continuous growth.",
  path: "/process",
});

const assurances = [
  {
    icon: "CalendarCheck",
    title: "Weekly milestones",
    description: "You see progress every single week on a live staging link — never a black box.",
  },
  {
    icon: "BadgeCheck",
    title: "Approval gates",
    description: "Nothing advances to the next phase without your explicit sign-off.",
  },
  {
    icon: "FileText",
    title: "Fixed-scope proposals",
    description: "Price, timeline, and deliverables in writing before we start. No surprises.",
  },
  {
    icon: "Users",
    title: "One point of contact",
    description: "A dedicated project lead who knows your business and answers within hours.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Our process</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Nine phases. Zero surprises.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              Great outcomes aren't luck — they're the product of a process that surfaces problems
              early, when they're cheap to fix. Here's exactly how your project unfolds.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-4">
        <ProcessTimeline steps={processSteps} />
      </Section>

      {/* Assurances */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Working with us"
          title="What you can count on"
          description="The process is the framework. These are the commitments that make it feel effortless."
        />
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {assurances.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Step one is a conversation"
        description="Thirty minutes about your business and goals. You'll leave with a clear picture of what your project needs — and what it doesn't."
      />
    </>
  );
}

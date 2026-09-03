import type { Metadata } from "next";
import { services } from "@/config/services";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { ServiceCard } from "@/components/shared/service-card";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = createMetadata({
  title: "Services — Websites, E-Commerce, Web Apps & Growth",
  description:
    "Premium business websites, corporate platforms, e-commerce stores, web applications, UI/UX design, SEO, and ongoing growth — engineered around business outcomes.",
  path: "/services",
});

const engagementSteps = [
  {
    icon: "MessageCircle",
    title: "Tell us your goal",
    description: "A 30-minute call about where your business is heading — not a sales pitch.",
  },
  {
    icon: "FileText",
    title: "Get a fixed proposal",
    description: "Scope, timeline, and investment in writing. The number we quote is the number you pay.",
  },
  {
    icon: "Rocket",
    title: "Watch it come alive",
    description: "Weekly milestones, staging previews, and your approval at every gate.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Services</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Solutions engineered around outcomes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              We don't sell "websites." We sell more bookings, more leads, more sales, and hours of
              manual work eliminated. Choose the outcome — we'll engineer the path.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.07}>
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How engagement works */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="How it works"
          title="Three steps to a website that works"
          description="No jargon, no drawn-out discovery theatre, no surprise invoices. A clear path from first call to launched asset."
        />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {engagementSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-border bg-surface p-7 text-center shadow-soft">
                <span className="absolute -top-3.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-brand-600 font-mono text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Icon name={step.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Not sure which service fits?"
        description="Tell us the outcome you want. We'll recommend the right path honestly — even if it's a smaller one."
      />
    </>
  );
}

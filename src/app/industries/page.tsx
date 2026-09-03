import type { Metadata } from "next";
import { industries } from "@/config/industries";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionTag } from "@/components/ui/section";
import { IndustryCard } from "@/components/shared/industry-card";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "Industries We Serve — Specialized Digital Expertise",
  description:
    "Industry-specific website design and development for restaurants, hotels, healthcare, real estate, retail, construction, professional services, and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Industries</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              We speak your customers' language
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              A diner, a patient, and a property buyer make decisions completely differently.
              Industry-specific expertise means your website is built around how your customers
              actually choose.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 2) * 0.07}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Don't see your industry?"
        description="We've delivered projects across 18+ industries. Tell us about yours — chances are we already understand your customer."
      />
    </>
  );
}

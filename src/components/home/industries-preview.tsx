import { ArrowRight } from "lucide-react";
import { industries } from "@/config/industries";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { IndustryCard } from "@/components/shared/industry-card";
import { Reveal } from "@/components/motion/reveal";

export function IndustriesPreview() {
  const display = industries.slice(0, 6);

  return (
    <Section>
      <SectionHeader
        tag="Who we serve"
        title="Deep expertise in your industry"
        description="We don't just build websites — we understand how your customers decide. Industry-specific strategy, design, and functionality for the businesses we know best."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {display.map((industry, i) => (
          <Reveal key={industry.slug} delay={i * 0.06}>
            <IndustryCard industry={industry} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center" delay={0.2}>
        <ButtonLink href="/industries" variant="outline" className="group">
          View all {industries.length} industries
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

import { ArrowRight } from "lucide-react";
import { services } from "@/config/services";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import { Reveal } from "@/components/motion/reveal";

export function ServicesPreview() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured).slice(0, 3);
  const display = [...featured, ...rest].slice(0, 6);

  return (
    <Section className="bg-surface-2/50">
      <SectionHeader
        tag="What we do"
        title="Business solutions, not just websites"
        description="Every service is engineered around a business outcome — more bookings, more leads, more revenue, or hours of manual work eliminated."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {display.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.06}>
            <ServiceCard service={service} className="h-full" />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center" delay={0.2}>
        <ButtonLink href="/services" variant="outline" className="group">
          Explore all {services.length} services
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

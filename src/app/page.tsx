import { Hero } from "@/components/home/hero";
import { ClientMarquee } from "@/components/home/client-marquee";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { IndustriesPreview } from "@/components/home/industries-preview";
import { WhyUs } from "@/components/home/why-us";
import { ProcessPreview } from "@/components/home/process-preview";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqPreview } from "@/components/home/faq-preview";
import { CtaSection } from "@/components/shared/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <FeaturedWork />
      <ServicesPreview />
      <IndustriesPreview />
      <WhyUs />
      <ProcessPreview />
      <TechStackSection />
      <TestimonialsSection />
      <FaqPreview />
      <CtaSection />
    </>
  );
}

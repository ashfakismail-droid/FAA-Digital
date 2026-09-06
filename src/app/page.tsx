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
import { loadFeaturedHeroDemos } from "@/lib/demo-store";

// ISR: static-fast homepage that refreshes from the production demo store.
// Studio saves also revalidate this page on demand.
export const revalidate = 60;

export default async function HomePage() {
  const heroDemos = await loadFeaturedHeroDemos();

  return (
    <>
      <Hero heroDemos={heroDemos} />
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

import type { Metadata } from "next";
import { getActiveDemos } from "@/config/demos";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { SectionTag } from "@/components/ui/section";
import { DemoGallery } from "@/components/demos/demo-gallery";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { StudioEntry } from "@/components/demos/studio-entry";

export const metadata: Metadata = createMetadata({
  title: "Live Demo Websites — Industry Templates Gallery",
  description:
    "Browse live demo websites for restaurants, hotels, dental clinics, e-commerce, gyms, salons, real estate, and more. See exactly what your business website could look like.",
  path: "/demos",
});

export default function DemosPage() {
  const demos = getActiveDemos();
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Demo gallery</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              See your business, beautifully online
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {demos.length} production-grade demo websites — one for every industry we serve. Each
              is a fully designed experience, not a screenshot. Find yours and imagine it with your
              brand.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24">
        <DemoGallery demos={demos} />
        <StudioEntry />
      </section>

      <CtaSection
        title="Like what you see? Yours will be better"
        description="Demos show our starting point. Your website gets a bespoke strategy, design, and build — crafted specifically for your business and customers."
      />
    </>
  );
}

import type { Metadata } from "next";
import { projects, projectCategories } from "@/config/projects";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { SectionTag } from "@/components/ui/section";
import { PortfolioExplorer } from "@/components/portfolio/portfolio-explorer";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "Portfolio — Case Studies & Client Work",
  description:
    "Explore premium websites, e-commerce stores, and web applications we've built for restaurants, hotels, clinics, real estate, and growing businesses — with measurable results.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="max-w-3xl">
            <SectionTag>Our work</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Work that pays for itself
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {projects.length} selected case studies — each with a real business problem, a crafted
              solution, and measured results. This is what "exceptional" looks like with receipts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Explorer */}
      <section className="container-x pb-24">
        <PortfolioExplorer projects={projects} categories={projectCategories} />
      </section>

      <CtaSection
        title="Your project could be our next case study"
        description="Tell us where your business is heading. We'll show you exactly how a premium digital presence gets you there."
      />
    </>
  );
}

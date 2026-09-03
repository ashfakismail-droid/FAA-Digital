import type { Metadata } from "next";
import { faqCategories, allFaqs } from "@/config/faqs";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { AuroraBackground } from "@/components/visuals/aurora";
import { SectionTag } from "@/components/ui/section";
import { FaqExplorer } from "@/components/faq/faq-explorer";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "FAQ — Honest Answers About Working With Us",
  description:
    "Straight answers about pricing, timelines, process, technology, SEO, and support — everything you want to know before starting a project with FAA Digital.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />

      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>FAQ</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Questions, answered honestly
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {allFaqs.length} answers covering pricing, process, technology, and support — the same
              answers we'd give you over coffee.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24">
        <FaqExplorer categories={faqCategories} />
      </section>

      <CtaSection
        title="Didn't find your answer?"
        description="We reply personally to every message — usually within one business day, often within the hour."
      />
    </>
  );
}

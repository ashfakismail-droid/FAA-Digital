import { ArrowRight } from "lucide-react";
import { faqCategories } from "@/config/faqs";
import { Section, SectionHeader } from "@/components/ui/section";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FaqPreview() {
  const topFaqs = [
    faqCategories[1].items[0], // pricing
    faqCategories[1].items[1], // timeline
    faqCategories[2].items[0], // process
    faqCategories[3].items[1], // update ourselves
    faqCategories[3].items[2], // ownership
    faqCategories[5].items[0], // after launch
  ];

  return (
    <Section className="bg-surface-2/50">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeader
            align="left"
            tag="Common questions"
            title="Everything you're wondering, answered honestly"
            description="Straight answers about pricing, timelines, ownership, and working with us. Can't find yours? We answer every message personally."
            className="mb-8 sm:mb-8"
          />
          <ButtonLink href="/faq" variant="outline" className="group">
            View all FAQs
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        </div>

        <Reveal>
          <Accordion>
            {topFaqs.map((faq) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}

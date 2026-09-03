"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/config/process";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";

const previewSteps = processSteps.filter((_, i) => [0, 4, 5, 7].includes(i));

export function ProcessPreview() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section>
      <SectionHeader
        tag="How we work"
        title="A process refined over 120+ launches"
        description="Nine phases, zero surprises. You approve work at every gate, so the final result is never a reveal — it's a confirmation."
      />

      <div ref={lineRef} className="relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
        <motion.div
          style={{ scaleX }}
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-brand-500 to-brand-400 lg:block"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {previewSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/30 bg-surface text-brand-600 shadow-soft dark:text-brand-400">
                  <Icon name={step.icon} className="h-5 w-5" />
                </div>
                <p className="font-mono text-xs font-medium tracking-widest text-brand-600 dark:text-brand-400">
                  PHASE {step.number}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14 text-center" delay={0.2}>
        <ButtonLink href="/process" className="group">
          See the full process
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

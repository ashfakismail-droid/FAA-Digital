"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Clock, Package } from "lucide-react";
import type { ProcessStep } from "@/types";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.7", "end 0.7"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={lineRef} className="relative mx-auto max-w-5xl">
      {/* Central line */}
      <div className="absolute left-6 top-0 h-full w-px bg-border lg:left-1/2" />
      <motion.div
        style={{ scaleY }}
        className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-500 via-brand-400 to-brand-600 lg:left-1/2"
      />

      <ol className="flex flex-col gap-14 lg:gap-20">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <li key={step.number} className="relative">
              {/* Node */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute left-6 top-8 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-brand-500/30 bg-surface text-brand-600 shadow-glow dark:text-brand-400 lg:left-1/2"
              >
                <Icon name={step.icon} className="h-5 w-5" />
              </motion.span>

              <div
                className={cn(
                  "grid gap-6 pl-20 lg:grid-cols-2 lg:gap-0 lg:pl-0",
                )}
              >
                <Reveal
                  className={cn(
                    "lg:pr-16",
                    isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-2 lg:pl-16 lg:pr-0"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card sm:p-8",
                      isLeft && "lg:ml-auto"
                    )}
                  >
                    <div className={cn("flex items-center gap-3", isLeft && "lg:flex-row-reverse")}>
                      <span className="font-mono text-sm font-semibold tracking-widest text-brand-600 dark:text-brand-400">
                        {step.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted">
                      {step.description}
                    </p>

                    <ul className={cn("mt-5 flex flex-col gap-2", isLeft && "lg:items-end")}>
                      {step.activities.map((activity) => (
                        <li
                          key={activity}
                          className={cn(
                            "flex items-center gap-2.5 text-sm text-foreground",
                            isLeft && "lg:flex-row-reverse"
                          )}
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={cn(
                        "mt-6 flex items-center gap-2.5 rounded-xl bg-brand-500/[0.06] px-4 py-3 text-sm font-medium text-brand-700 dark:text-brand-300",
                        isLeft && "lg:flex-row-reverse"
                      )}
                    >
                      <Package className="h-4 w-4 shrink-0" />
                      {step.deliverable}
                    </div>
                  </div>
                </Reveal>
                <div className="hidden lg:block" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types";
import { Icon } from "@/components/ui/icon";

/** Desktop + tablet + mobile frames showcasing responsive design */
export function ResponsiveShowcase({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const yDesktop = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const yMobile = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const [bg, accent] = project.palette;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative mx-auto flex max-w-4xl items-end justify-center gap-6"
    >
      {/* Desktop */}
      <motion.div
        style={{ y: yDesktop }}
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-lifted"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="aspect-[16/10] p-6" style={{ background: `linear-gradient(150deg, ${bg}, ${bg}CC)` }}>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: accent }}>
              <Icon name={project.icon} className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div className="h-2 w-20 rounded-full bg-white/40" />
          </div>
          <div className="mt-8 space-y-2.5">
            <div className="h-3.5 w-3/4 rounded-full bg-white/70" />
            <div className="h-3.5 w-1/2 rounded-full bg-white/45" />
            <div className="mt-4 h-2 w-2/3 rounded-full bg-white/20" />
          </div>
          <div className="mt-6 flex gap-2.5">
            <div className="h-7 w-20 rounded-full" style={{ background: accent }} />
            <div className="h-7 w-20 rounded-full border border-white/30" />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <div className="h-5 w-5 rounded-md" style={{ background: accent, opacity: 1 - i * 0.25 }} />
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/30" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        style={{ y: yMobile }}
        className="relative -ml-20 hidden w-40 shrink-0 overflow-hidden rounded-[1.75rem] border-[6px] border-foreground/80 bg-surface shadow-lifted sm:block"
      >
        <div className="aspect-[9/19] p-3" style={{ background: `linear-gradient(160deg, ${bg}, ${bg}DD)` }}>
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25" />
          <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: accent }}>
            <Icon name={project.icon} className="h-3.5 w-3.5 text-white" strokeWidth={2} />
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-white/70" />
            <div className="h-2 w-3/4 rounded-full bg-white/45" />
          </div>
          <div className="mt-3 h-5 w-14 rounded-full" style={{ background: accent }} />
          <div className="mt-4 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-white/10 p-2">
                <div className="h-1 w-3/4 rounded-full bg-white/35" />
                <div className="mt-1 h-1 w-1/2 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

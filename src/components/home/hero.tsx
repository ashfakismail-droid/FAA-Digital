"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { AuroraBackground } from "@/components/visuals/aurora";
import { WebsiteMockup } from "@/components/visuals/website-mockup";
import { EASE_OUT } from "@/lib/motion";

const showcaseProjects = projects.filter((p) => p.featured).slice(0, 3);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yCards = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <AuroraBackground />

      <div className="container-x relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
              <Sparkles className="h-3.5 w-3.5" />
              Premium digital agency
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 text-balance font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            We design & build{" "}
            <span className="relative inline-block">
              <span className="text-gradient">exceptional</span>
              <svg
                className="absolute -bottom-2 left-0 w-full text-brand-500/60"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C50 3 150 1 298 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            digital experiences
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          >
            {site.name} crafts high-performance websites, e-commerce stores, and web applications
            for businesses that refuse to look ordinary — and expect their website to pay for
            itself.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <ButtonLink href="/contact" size="lg" className="group">
                Start your project
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/portfolio" variant="outline" size="lg" className="group">
                <Play className="h-4 w-4 fill-current" />
                See our work
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              Available for new projects
            </span>
            <span>120+ projects delivered</span>
            <span>96 average Lighthouse score</span>
          </motion.div>
        </motion.div>

        {/* Floating project showcase */}
        <motion.div
          style={{ y: yCards, opacity }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
            className="relative"
          >
            {/* Center card */}
            <div className="relative z-20 mx-auto w-full max-w-2xl">
              <WebsiteMockup
                icon={showcaseProjects[0].icon}
                palette={showcaseProjects[0].palette}
                title={showcaseProjects[0].title}
                category={showcaseProjects[0].category}
                variant="hero"
                className="aspect-[16/10] rounded-2xl shadow-lifted ring-1 ring-white/10"
              />
            </div>

            {/* Side cards */}
            <div className="absolute -left-4 top-16 z-10 hidden w-72 -rotate-6 md:block lg:-left-12">
              <WebsiteMockup
                icon={showcaseProjects[1].icon}
                palette={showcaseProjects[1].palette}
                title={showcaseProjects[1].title}
                className="aspect-[16/10] animate-float rounded-xl opacity-90 shadow-card ring-1 ring-white/10"
              />
            </div>
            <div className="absolute -right-4 top-20 z-10 hidden w-72 rotate-6 md:block lg:-right-12">
              <WebsiteMockup
                icon={showcaseProjects[2].icon}
                palette={showcaseProjects[2].palette}
                title={showcaseProjects[2].title}
                className="aspect-[16/10] animate-float-slow rounded-xl opacity-90 shadow-card ring-1 ring-white/10"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -right-2 top-4 z-30 hidden animate-float rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-card backdrop-blur-md [animation-delay:-2s] lg:block">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Avg. client result</p>
              <p className="font-display text-xl font-semibold text-emerald-500">+168% leads</p>
            </div>
            <div className="absolute -left-2 bottom-8 z-30 hidden animate-float-slow rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-card backdrop-blur-md [animation-delay:-4s] lg:block">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Performance</p>
              <p className="font-display text-xl font-semibold text-foreground">0.9s load time</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

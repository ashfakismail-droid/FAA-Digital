"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, Eye } from "lucide-react";
import type { Demo } from "@/types";
import { WebsiteMockup } from "@/components/visuals/website-mockup";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DemoGallery({ demos }: { demos: Demo[] }) {
  const [active, setActive] = useState<Demo>(demos.find((d) => d.featuredHero) ?? demos[0]);
  const popular = useMemo(() => demos.filter((d) => d.popular), [demos]);
  const others = useMemo(() => demos.filter((d) => !d.popular), [demos]);

  const scrollToFeatured = (demo: Demo) => {
    setActive(demo);
    const element = document.getElementById("featured-demo-viewer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      {/* Featured demo viewer */}
      <div 
        id="featured-demo-viewer"
        className="mb-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <WebsiteMockup
                icon={active.icon}
                palette={active.palette}
                title={active.title}
                category={active.category}
                variant="hero"
                className="aspect-[16/10] rounded-3xl shadow-lifted ring-1 ring-white/10"
                thumbnail={active.thumbnail}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2">
                <Badge variant="brand">{active.category}</Badge>
                {active.status === "coming-soon" && (
                  <Badge variant="outline">Coming Soon</Badge>
                )}
                {active.status === "in-progress" && (
                  <Badge variant="outline">In Progress</Badge>
                )}
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
                {active.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{active.description}</p>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {active.status === "live" ? (
                  <>
                    <ButtonLink 
                      href={active.source?.type === "external" ? (active.source.url ?? "#") : `/demos/${active.source?.folder ?? active.slug}/`} 
                      variant="primary"
                      className="group"
                      external
                    >
                      Try Demo
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </ButtonLink>
                    <ButtonLink 
                      href={`#`} 
                      variant="outline"
                      className="group"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToFeatured(active);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </ButtonLink>
                  </>
                ) : active.status === "coming-soon" ? (
                  <ButtonLink href="/contact" variant="secondary" className="cursor-not-allowed opacity-60">
                    Demo Coming Soon
                  </ButtonLink>
                ) : (
                  <ButtonLink href="/contact" variant="secondary" className="cursor-not-allowed opacity-60">
                    Demo In Progress
                  </ButtonLink>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Selector grid */}
      {popular.length > 0 && (
        <>
          <h3 className="mb-6 font-display text-xl font-semibold tracking-tight text-foreground">
            Featured demos
          </h3>
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((demo) => (
              <DemoCard 
                key={demo.slug} 
                demo={demo} 
                active={active.slug === demo.slug} 
                onSelect={() => scrollToFeatured(demo)} 
              />
            ))}
          </div>
        </>
      )}

      <h3 className="mb-6 font-display text-xl font-semibold tracking-tight text-foreground">
        All industries
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((demo) => (
          <DemoCard 
            key={demo.slug} 
            demo={demo} 
            active={active.slug === demo.slug} 
            onSelect={() => scrollToFeatured(demo)} 
          />
        ))}
      </div>
    </div>
  );
}

function DemoCard({
  demo,
  active,
  onSelect,
}: {
  demo: Demo;
  active: boolean;
  onSelect: () => void;
}) {
  const handleTryDemo = (e: React.MouseEvent, demo: Demo) => {
    e.stopPropagation();
    const url = demo.source?.type === "external" ? demo.source.url : `/demos/${demo.source?.folder ?? demo.slug}/`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl border text-left shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card",
        active
          ? "border-brand-500 ring-2 ring-brand-500/30"
          : "border-border hover:border-brand-500/30"
      )}
    >
      <WebsiteMockup
        icon={demo.icon}
        palette={demo.palette}
        title={demo.title}
        className="aspect-[16/10]"
        thumbnail={demo.thumbnail}
      />
      <div className="bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-semibold tracking-tight text-foreground">{demo.title}</p>
          {demo.popular && (
            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Featured
            </span>
          )}
          {demo.status !== "live" && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {demo.status === "coming-soon" ? "Soon" : "Building"}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted">{demo.category}</p>
        
        {/* Action buttons at bottom of card */}
        {demo.status === "live" && (
          <div className="mt-3 flex gap-2">
            <button 
              onClick={(e) => handleTryDemo(e, demo)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-500 transition-colors"
            >
              Try Demo
              <ExternalLink className="h-3 w-3" />
            </button>
            <button
              onClick={handleViewDetails}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-foreground hover:bg-foreground/5"
            >
              <Eye className="h-3 w-3" />
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
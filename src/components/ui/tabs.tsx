"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({
  tabs,
  defaultTab,
  className,
  onChange,
}: {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Categories"
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
      >
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActive(tab.id);
                onChange?.(tab.id);
              }}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                selected ? "text-white" : "text-muted hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-brand-600 shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}

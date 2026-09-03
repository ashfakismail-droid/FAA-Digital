"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: ReactNode;
  answer: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({ question, answer, defaultOpen = false, className }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300",
        open && "border-brand-500/30",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">{question}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300",
            open && "rotate-45 border-brand-500/40 bg-brand-500/10 text-brand-600 dark:text-brand-400"
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

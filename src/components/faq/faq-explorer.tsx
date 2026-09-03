"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { FaqCategory } from "@/types";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FaqExplorer({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeCategory === "all" || c.id === activeCategory)
      .map((category) => ({
        ...category,
        items: q
          ? category.items.filter(
              (item) =>
                item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
            )
          : category.items,
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query, activeCategory]);

  const totalResults = results.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Search */}
      <div className="relative mx-auto mb-8 max-w-xl">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search answers… (e.g. pricing, timeline, SEO)"
          aria-label="Search frequently asked questions"
          className="input-base h-14 rounded-full pl-12 text-base shadow-soft"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by topic">
        {[{ id: "all", label: "All topics" }, ...categories].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === cat.id
                ? "border-brand-600 bg-brand-600 text-white shadow-glow"
                : "border-border bg-surface text-muted hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {query && (
        <p className="mb-8 text-center text-sm text-muted" role="status" aria-live="polite">
          {totalResults} {totalResults === 1 ? "answer" : "answers"} for "{query}"
        </p>
      )}

      {/* Results */}
      <div className="flex flex-col gap-12">
        {results.map((category) => (
          <Reveal key={category.id}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {category.label}
                </h2>
                <Badge variant="outline">
                  {category.items.length} {category.items.length === 1 ? "question" : "questions"}
                </Badge>
              </div>
              <Accordion>
                {category.items.map((item) => (
                  <AccordionItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </Accordion>
            </div>
          </Reveal>
        ))}
      </div>

      {results.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-medium text-foreground">No answers found</p>
          <p className="mt-2 text-sm text-muted">
            Try different keywords — or ask us directly, we reply personally.
          </p>
        </div>
      )}
    </div>
  );
}

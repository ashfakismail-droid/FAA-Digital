"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/shared/project-card";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "newest" | "oldest" | "az";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A – Z" },
];

export function PortfolioExplorer({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let result = [...projects];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)) ||
          p.services.some((s) => s.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "oldest":
        result.sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }

    return result;
  }, [projects, query, category, sort]);

  const hasFilters = query.trim() !== "" || category !== "all";

  return (
    <div>
      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech, industries…"
            aria-label="Search projects"
            className="input-base pl-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="inline-flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="input-base w-auto appearance-none pr-8"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              category === cat
                ? "border-brand-600 bg-brand-600 text-white shadow-glow"
                : "border-border bg-surface text-muted hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {cat === "all" ? "All projects" : cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {hasFilters && " matching your filters"}
      </p>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-medium text-foreground">No projects found</p>
          <p className="mt-2 text-sm text-muted">Try a different search term or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

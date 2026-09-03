"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { BlogPost } from "@/types";
import { BlogCard } from "@/components/blog/blog-card";
import { cn } from "@/lib/utils";

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
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
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
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
              {cat === "all" ? "All topics" : cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-medium text-foreground">No articles found</p>
          <p className="mt-2 text-sm text-muted">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

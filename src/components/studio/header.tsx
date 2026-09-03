"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function StudioHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0d0e14]/90">
      <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Studio Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold tracking-tight text-white shadow-sm dark:bg-white dark:text-slate-950">
            FD
          </div>
          <span className="font-display font-semibold text-foreground">
            FAA Digital Studio
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/studio" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white">Dashboard</Link>
          <Link href="/studio/demos" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white">Demo Manager</Link>
          <Link href="/demos" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white">
            <Globe className="h-4 w-4" /> Public gallery <ExternalLink className="h-3 w-3" />
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {isDev && (
            <span className="text-xs font-medium text-brand-600 dark:text-brand-400" title="Development Mode">
              DEV MODE
            </span>
          )}
          <ThemeToggle />
          
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/20"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface/95">
          <nav className="container-x flex flex-col gap-1 py-3">
            <Link href="/studio" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5">
              Dashboard
            </Link>
            <Link href="/studio/demos" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5">
              Demo Manager
            </Link>
            <Link href="/demos" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5">
              <Globe className="h-4 w-4" />
              Public gallery
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
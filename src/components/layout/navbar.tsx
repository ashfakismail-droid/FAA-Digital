"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { primaryNav, isNavGroup } from "@/config/navigation";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500 ease-out-expo",
          scrolled
            ? "border-b border-border/60 bg-background/80 shadow-soft backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Main navigation">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              if (isNavGroup(item)) return null;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <ButtonLink href="/contact" size="sm" className="group">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/20"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="container-x flex h-full flex-col gap-1 overflow-y-auto pb-32 pt-6"
              aria-label="Mobile navigation"
            >
              {primaryNav.map((item) => {
                if (isNavGroup(item)) return null;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-medium transition-colors",
                        isActive(item.href) ? "text-brand-600 dark:text-brand-400" : "text-foreground"
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 text-muted" />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="mt-6"
              >
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start a project
                  <ArrowRight className="h-5 w-5" />
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

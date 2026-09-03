"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground/20 hover:text-foreground",
        className
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          dark === null ? "opacity-0" : dark ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          dark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      />
    </button>
  );
}

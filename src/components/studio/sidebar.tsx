"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MonitorPlay, GitBranch, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/studio", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/studio/demos", label: "Demo Manager", icon: MonitorPlay },
];

export function StudioSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200/80 bg-white/60 px-4 py-7 dark:border-white/10 dark:bg-white/[0.015] lg:flex lg:flex-col">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
      <nav className="mt-3 space-y-1">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white")}>
              <Icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <CircleDot className="h-3.5 w-3.5" /> Local authoring
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Changes save to the repository metadata file on this machine.</p>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          <GitBranch className="h-3.5 w-3.5" /> Git-managed workflow
        </div>
      </div>
    </aside>
  );
}
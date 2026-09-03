import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = { default: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200", emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400", violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" };

export function StudioStat({ label, value, detail, icon: Icon, tone = "default" }: { label: string; value: number; detail: string; icon: LucideIcon; tone?: keyof typeof tones }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 font-display text-3xl font-semibold tracking-tight">{value}</p></div><div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", tones[tone])}><Icon className="h-5 w-5" /></div></div><p className="mt-3 text-xs text-slate-400">{detail}</p></div>;
}
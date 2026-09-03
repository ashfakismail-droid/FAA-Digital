import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, GitCommit, GitBranch, Rocket, MonitorPlay, Sparkles } from "lucide-react";
import { demos } from "@/config/demos";
import { StudioStat } from "@/components/studio/stat";

export const metadata = { title: "Dashboard — FAA Digital Studio", robots: { index: false, follow: false } };

export default function StudioDashboard() {
  if (process.env.NODE_ENV !== "development") notFound();
  const recent = [...demos].sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")).slice(0, 5);
  const live = demos.filter((demo) => demo.status === "live").length;
  const working = demos.filter((demo) => demo.status === "in-progress").length;
  const featured = demos.filter((demo) => demo.popular).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-medium text-brand-600 dark:text-brand-400">Local workspace</p><h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Good evening, FAA Digital.</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage the demo catalogue and prepare changes for deployment.</p></div>
        <Link href="/studio/demos" className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">Open Demo Manager <ArrowRight className="h-4 w-4" /></Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StudioStat label="Total demos" value={demos.length} icon={MonitorPlay} detail="Metadata records" />
        <StudioStat label="Live" value={live} icon={CheckCircle2} detail="Visible publicly" tone="emerald" />
        <StudioStat label="In progress" value={working} icon={Clock3} detail="Being prepared" tone="amber" />
        <StudioStat label="Featured" value={featured} icon={Sparkles} detail="Gallery highlights" tone="violet" />
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-white/10"><div><h2 className="font-display font-semibold">Recent activity</h2><p className="mt-0.5 text-xs text-slate-500">Most recently updated metadata</p></div><Link href="/studio/demos" className="text-xs font-semibold text-brand-600 dark:text-brand-400">View all</Link></div>
          <div className="divide-y divide-slate-100 dark:divide-white/10">{recent.map((demo) => <div key={demo.slug} className="flex items-center gap-4 px-5 py-4"><div className="h-10 w-10 rounded-xl" style={{ background: `linear-gradient(135deg, ${demo.palette[0]}, ${demo.palette[1]})` }} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{demo.title}</p><p className="truncate text-xs text-slate-500">{demo.category} · Metadata updated</p></div><span className="hidden text-xs text-slate-400 sm:block">{demo.updatedAt ?? "Not dated"}</span></div>)}</div>
        </section>

        <section className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg dark:bg-white dark:text-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 dark:text-slate-500">Publishing workflow</p><h2 className="mt-2 font-display text-xl font-semibold">Local first. Git deployed.</h2><p className="mt-2 text-sm leading-relaxed text-white/60 dark:text-slate-500">Studio saves the canonical metadata file. Git remains the audit trail and Netlify remains the release mechanism.</p>
          <div className="mt-6 space-y-3">{[[GitCommit,"Save metadata","Write validated changes locally"],[GitBranch,"Commit & push","Review changes in Git"],[Rocket,"Netlify deploy","Publish the public catalogue"]].map(([Icon,title,body], index) => { const StepIcon = Icon as typeof GitCommit; return <div key={title as string} className="flex gap-3 rounded-xl bg-white/[0.07] p-3 dark:bg-slate-950/[0.06]"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold dark:bg-slate-950/10">{index + 1}</div><div><p className="text-sm font-semibold">{title as string}</p><p className="mt-0.5 text-xs text-white/50 dark:text-slate-500">{body as string}</p></div><StepIcon className="ml-auto mt-1 h-4 w-4 opacity-40" /></div>; })}</div>
        </section>
      </div>
    </div>
  );
}
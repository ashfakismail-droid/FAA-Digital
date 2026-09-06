import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StudioLoginForm } from "@/components/studio/login-form";

export const metadata: Metadata = {
  title: "Studio Sign-in — FAA Digital",
  robots: { index: false, follow: false },
};

export default function StudioLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-4 py-12 dark:bg-[#090a0f]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold tracking-tight text-white shadow-sm dark:bg-white dark:text-slate-950">
            FD
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">FAA Digital Studio</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Admin access only. Sign in to manage the live site.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <StudioLoginForm />
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to website
        </Link>
      </div>
    </div>
  );
}
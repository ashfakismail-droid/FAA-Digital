import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { StudioSidebar } from "@/components/studio/sidebar";
import { StudioHeader } from "@/components/studio/header";
import { isStudioAuthed } from "@/lib/admin-auth";

export default async function StudioLayout({ children }: { children: ReactNode }) {
  // Production: only an authenticated admin may enter the Studio shell.
  // (Local development keeps its existing no-auth workflow.)
  if (!(await isStudioAuthed())) redirect("/studio/login");

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-950 dark:bg-[#090a0f] dark:text-slate-50">
      <StudioHeader />
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1680px]">
        <StudioSidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">{children}</main>
      </div>
    </div>
  );
}
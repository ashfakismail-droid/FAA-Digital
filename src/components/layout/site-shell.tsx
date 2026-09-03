"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GrainOverlay } from "@/components/visuals/aurora";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  const isDemo = pathname.startsWith("/demos");

  if (isStudio || isDemo) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <GrainOverlay />
    </>
  );
}
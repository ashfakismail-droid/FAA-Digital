import type { ReactNode } from "react";

export default function DemoLayout({ children }: { children: ReactNode }) {
  // Serve demos as standalone pages without FAA Digital V2 wrapper
  // This ensures the demo feels like a standalone client website
  return <>{children}</>;
}
import { notFound } from "next/navigation";
import { demos } from "@/config/demos";
import { DemoManager } from "@/components/studio/demo-manager";

export const metadata = { title: "Demo Manager — FAA Digital Studio", robots: { index: false, follow: false } };

export default function StudioDemosPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DemoManager initialDemos={demos} />;
}
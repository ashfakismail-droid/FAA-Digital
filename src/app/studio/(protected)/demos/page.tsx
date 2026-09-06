import { notFound } from "next/navigation";
import { DemoManager } from "@/components/studio/demo-manager";
import { isStudioAuthed } from "@/lib/admin-auth";
import { loadStudioDemos } from "@/lib/demo-store";

export const metadata = { title: "Demo Manager — FAA Digital Studio", robots: { index: false, follow: false } };

export default async function StudioDemosPage() {
  if (!(await isStudioAuthed())) notFound();
  const { demos } = await loadStudioDemos();
  return <DemoManager initialDemos={demos} />;
}
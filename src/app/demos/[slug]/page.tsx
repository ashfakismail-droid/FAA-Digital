import { notFound } from "next/navigation";
import { demos } from "@/config/demos";
import { loadStudioDemos } from "@/lib/demo-store";
import type { Demo } from "@/types";
import type { Metadata } from "next";

// Demos imported after a deployment (stored in the production demo store)
// have no build-time static param, so unknown slugs must render on demand.
export const dynamicParams = true;

// Imported metadata/files change rarely; ISR keeps the page fresh for edits.
export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return demos
    .filter((demo) => demo.status !== "archived" && demo.visibility !== "private" && demo.source?.type !== "external")
    .map((d) => ({ slug: d.slug }));
}

async function findDemo(slug: string): Promise<Demo | undefined> {
  const { demos: liveDemos } = await loadStudioDemos();
  return liveDemos.find((demo) => demo.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = await findDemo(slug);
  if (!demo || demo.status === "archived" || demo.visibility === "private" || demo.source?.type === "external") return {};

  return {
    title: `${demo.title} — Demo Website`,
    description: demo.description,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = await findDemo(slug);

  if (!demo || demo.status === "archived" || demo.visibility === "private" || demo.source?.type === "external") {
    notFound();
  }

  // Serve the demo HTML file directly via iframe — the same architecture as
  // static demos. For store-backed demos the iframe URL is fulfilled by the
  // /demos/[slug]/[...path] file server reading from the production store.
  return (
    <iframe
      src={`/demos/${demo.source?.folder ?? demo.slug}/index.html`}
      title={`${demo.title} Demo`}
      className="h-screen w-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}

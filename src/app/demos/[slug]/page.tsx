import { notFound } from "next/navigation";
import { demos, getDemo } from "@/config/demos";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return demos
    .filter((demo) => demo.status !== "archived" && demo.visibility !== "private" && demo.source?.type !== "external")
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
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
  const demo = getDemo(slug);

  if (!demo || demo.status === "archived" || demo.visibility === "private" || demo.source?.type === "external") {
    notFound();
  }

  // Serve the static demo HTML file directly via iframe
  // The layout.tsx ensures no FAA Digital V2 wrapper
  return (
    <iframe
      src={`/demos/${demo.source?.folder ?? demo.slug}/index.html`}
      title={`${demo.title} Demo`}
      className="h-screen w-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}

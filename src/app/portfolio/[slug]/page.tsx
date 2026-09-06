import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/demos/${slug}`);
}

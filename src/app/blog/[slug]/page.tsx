import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, Tag } from "lucide-react";
import { blogPosts, getPost } from "@/config/blog";
import { articleJsonLd, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/shared/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    keywords: post.tags,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      return bScore - aScore || b.date.localeCompare(a.date);
    })
    .slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      {/* Article hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 to-background pb-16 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-full opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge className="border-white/20 bg-white/10 text-white">{post.category}</Badge>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
              <time dateTime={post.date} className="text-sm text-white/60">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="mt-7 text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
                {post.author.initials}
              </span>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-xs text-white/60">{post.author.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article body */}
      <article className="container-x max-w-3xl pb-20 pt-4">
        <Reveal>
          <p className="text-pretty text-xl leading-relaxed text-foreground">{post.content.intro}</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12">
          {post.content.sections.map((section, i) => (
            <Reveal key={section.heading} delay={0.03 * i}>
              <section>
                <h2 className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Key takeaways */}
        <Reveal>
          <div className="mt-16 rounded-3xl border border-brand-500/25 bg-brand-500/[0.04] p-8">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-foreground">
              <Icon name="Sparkles" className="h-5 w-5 text-brand-500" />
              Key takeaways
            </h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {post.content.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-medium leading-relaxed text-foreground">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Tags & share */}
        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>

      {/* Related */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Keep reading"
          title="Related articles"
          description="More practical playbooks from the same shelf."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}

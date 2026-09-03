import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog";
import { formatDate } from "@/lib/utils";
import { createMetadata as buildMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { Section, SectionTag } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Web Strategy, Design & Growth Insights",
  description:
    "Practical, jargon-free insights on websites that convert, local SEO, performance, and digital growth — from the team that ships them.",
  path: "/blog",
});

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Insights</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Thinking that ships results
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              The same playbooks we use for client projects — written plainly, without jargon, for
              business owners who want to make smarter digital decisions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured article */}
      <div className="container-x pb-16">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft transition-all duration-500 hover:border-brand-500/30 hover:shadow-lifted lg:grid-cols-2"
          >
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-brand-300 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={featured.icon} className="h-12 w-12" strokeWidth={1.25} />
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="brand">Featured</Badge>
                <Badge variant="outline">{featured.category}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <Clock className="h-3 w-3" />
                  {featured.readingTime} min read
                </span>
              </div>
              <h2 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
                  {featured.author.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{featured.author.name}</p>
                  <p className="text-xs text-muted">{formatDate(featured.date)}</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>

      <Section className="pt-0">
        <BlogExplorer posts={rest} categories={blogCategories} />
      </Section>

      <CtaSection
        title="Prefer we just do it for you?"
        description="Reading about conversion optimization is one thing. Having a team implement it is another. Let's talk."
      />
    </>
  );
}

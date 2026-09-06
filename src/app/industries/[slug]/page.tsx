import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { getIndustry, industries } from "@/config/industries";
import { getDemosByIndustryAsProjects } from "@/config/demos";
import { services } from "@/config/services";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { ProjectCard } from "@/components/shared/project-card";
import { Counter } from "@/components/motion/counter";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/visuals/aurora";

const recommendedServices: Record<string, string[]> = {
  restaurants: ["business-websites", "seo-optimization", "web-applications"],
  hotels: ["web-applications", "ui-ux-design", "seo-optimization"],
  healthcare: ["business-websites", "web-applications", "seo-optimization"],
  education: ["business-websites", "web-applications", "digital-consultation"],
  "real-estate": ["web-applications", "ui-ux-design", "seo-optimization"],
  retail: ["ecommerce", "performance-optimization", "seo-optimization"],
  construction: ["corporate-websites", "ui-ux-design", "seo-optimization"],
  "professional-services": ["business-websites", "seo-optimization", "digital-consultation"],
  startups: ["web-applications", "ui-ux-design", "digital-consultation"],
  medical: ["business-websites", "web-applications", "seo-optimization"],
};

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createMetadata({
    title: `${industry.title} Websites — ${industry.tagline}`,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedProjects = getDemosByIndustryAsProjects(slug);
  const recommended = (recommendedServices[slug] ?? [])
    .map((s) => services.find((svc) => svc.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Breadcrumbs
            items={[
              { label: "Industries", href: "/industries" },
              { label: industry.title, href: `/industries/${industry.slug}` },
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <SectionTag>{industry.title}</SectionTag>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {industry.tagline}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {industry.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" className="group">
                  Discuss your {industry.title.toLowerCase().replace(/ & .*/, "")} project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink href="/demos" variant="outline">
                  View {industry.title.split(" ")[0].toLowerCase()} demos
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-4">
                {industry.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-surface p-6 text-center shadow-soft"
                  >
                    <dd className="font-display text-3xl font-semibold tracking-tight text-brand-600 dark:text-brand-400">
                      <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </dd>
                    <dt className="mt-1.5 text-xs leading-snug text-muted">{stat.label}</dt>
                  </div>
                ))}
                <div className="col-span-2 flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-glow">
                  <Icon name={industry.icon} className="h-10 w-10" strokeWidth={1.5} />
                  <p className="font-display text-lg font-medium">{industry.title} specialists</p>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Challenges / Solutions */}
      <Section className="pt-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-surface p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <X className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  Challenges you're facing
                </h2>
              </div>
              <ul className="flex flex-col gap-4">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                    <span className="text-[15px] leading-relaxed text-muted">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-brand-500/25 bg-brand-500/[0.03] p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  How we solve them
                </h2>
              </div>
              <ul className="flex flex-col gap-4">
                {industry.solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                    <span className="text-[15px] leading-relaxed text-foreground">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-surface-2/50">
          <SectionHeader
            tag="Proof, not promises"
            title={`${industry.title} work we've delivered`}
            description="Real projects in your industry — with the results to show for them."
          />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {relatedProjects.map((project, i) => {
              const isExternal = project.liveUrl?.startsWith("http");
              return (
                <Reveal key={project.slug} delay={i * 0.08}>
                  <ProjectCard project={project} href={project.liveUrl ?? `/demos/${project.slug}`} external={isExternal} className="h-full" />
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* Recommended services */}
      {recommended.length > 0 && (
        <Section>
          <SectionHeader
            tag="Where to start"
            title="Recommended for your industry"
            description="The services that consistently deliver the strongest returns for businesses like yours."
          />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {recommended.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:text-brand-400">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaSection
        title={`Let's talk about your ${industry.title.toLowerCase().replace(/ & .*/, "")}`}
        description="A free 30-minute call about your business, your customers, and what your website should be doing for you."
      />
    </>
  );
}

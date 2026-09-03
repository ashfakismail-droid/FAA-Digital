import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { getAdjacentProjects, getProject, projects } from "@/config/projects";
import { testimonials } from "@/config/testimonials";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { WebsiteMockup } from "@/components/visuals/website-mockup";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { ResponsiveShowcase } from "@/components/portfolio/responsive-showcase";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: `${project.title} — ${project.category} Case Study`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const testimonial = testimonials.find((t) => t.project === slug);
  const [bg, accent] = project.palette;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-20 pt-32 sm:pt-40"
        style={{
          background: `linear-gradient(160deg, ${bg} 0%, ${bg}F2 55%, ${bg}E6 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -right-32 top-0 h-96 w-96 rounded-full opacity-25 blur-[120px]"
          style={{ background: accent }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title, href: `/portfolio/${project.slug}` },
            ]}
          />

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-white/20 bg-white/10 text-white">{project.category}</Badge>
                <Badge className="border-white/20 bg-white/10 text-white">{project.year}</Badge>
              </div>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-lg font-medium" style={{ color: accent }}>
                {project.tagline}
              </p>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/70">
                {project.summary}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-white/50">Client</dt>
                  <dd className="mt-1 font-medium text-white">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Services</dt>
                  <dd className="mt-1 font-medium text-white">{project.services.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Year</dt>
                  <dd className="mt-1 font-medium text-white">{project.year}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="white" className="group">
                  Start a similar project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                {project.liveUrl && (
                  <ButtonLink
                    href={project.liveUrl}
                    external
                    className="border border-white/25 bg-white/10 text-white hover:bg-white/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View live site
                  </ButtonLink>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <WebsiteMockup
                icon={project.icon}
                palette={project.palette}
                title={project.title}
                category={project.category}
                variant="hero"
                className="aspect-[16/11] rounded-2xl shadow-lifted ring-1 ring-white/15"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Metrics band */}
      <section className="border-b border-border bg-surface">
        <div className="container-x grid grid-cols-2 gap-px overflow-hidden py-2 lg:grid-cols-4">
          {project.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08} className="px-6 py-8 text-center">
              <dd className="font-display text-3xl font-semibold tracking-tight text-brand-600 dark:text-brand-400 sm:text-4xl">
                {metric.value}
              </dd>
              <dt className="mt-1.5 text-sm text-muted">{metric.label}</dt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview / Challenge / Solution */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <SectionHeader
              align="left"
              tag="The story"
              title="Problem, craft, outcome"
              className="mb-0 sm:mb-0 lg:sticky lg:top-28"
            />
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {[
              { label: "Overview", body: project.overview },
              { label: "The challenge", body: project.challenge },
              { label: "Our solution", body: project.solution },
            ].map((block, i) => (
              <Reveal key={block.label} delay={i * 0.05}>
                <div className="relative pl-8">
                  <span
                    className="absolute left-0 top-1.5 h-full w-1 rounded-full"
                    style={{ background: `linear-gradient(${accent}, transparent)` }}
                  />
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {block.label}
                  </h3>
                  <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Key features */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="What we built"
          title="Key features & capabilities"
          description="Every feature exists because it solves a business problem or removes a customer friction point."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-card">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${bg})` }}
                >
                  <Icon name={feature.icon ?? "Sparkles"} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Responsive showcase */}
      <Section>
        <SectionHeader
          tag="Responsive by design"
          title="Flawless on every screen"
          description="Designed mobile-first and verified across real devices — because most of your customers will meet you on a phone."
        />
        <ResponsiveShowcase project={project} />
      </Section>

      {/* Process */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Behind the scenes"
          title="How we got there"
          description="The thinking, research, and iteration behind the finished product."
        />
        <div className="mx-auto max-w-3xl">
          <ol className="relative flex flex-col gap-10 border-l-2 border-border pl-8">
            {project.process.map((step, i) => (
              <Reveal key={step.heading} as="li" delay={i * 0.08} className="relative">
                <span
                  className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background"
                  style={{ background: accent }}
                />
                <p className="font-mono text-xs font-medium tracking-widest text-brand-600 dark:text-brand-400">
                  STEP {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                  {step.heading}
                </h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Highlights */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <WebsiteMockup
              icon={project.icon}
              palette={[project.palette[1], project.palette[0]]}
              title={project.title}
              category="Detail view"
              variant="hero"
              className="aspect-[16/11] rounded-2xl shadow-lifted ring-1 ring-white/10"
            />
          </Reveal>
          <div>
            <SectionHeader
              align="left"
              tag="Standout moments"
              title="Details that make the difference"
              className="mb-8 sm:mb-8"
            />
            <ul className="flex flex-col gap-4">
              {project.highlights.map((highlight, i) => (
                <Reveal key={highlight} as="li" delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: accent }}
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <p className="text-[15px] font-medium leading-relaxed text-foreground">
                      {highlight}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      {testimonial && (
        <Section className="pt-0">
          <Reveal className="mx-auto max-w-3xl">
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        </Section>
      )}

      {/* Next project navigation */}
      <section className="container-x pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev && (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-brand-500/40 group-hover:text-brand-500">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted">Previous project</p>
                <p className="truncate font-display text-lg font-semibold text-foreground">
                  {prev.title}
                </p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex items-center justify-end gap-4 rounded-2xl border border-border bg-surface p-6 text-right shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:col-start-2"
            >
              <div className="min-w-0">
                <p className="text-xs text-muted">Next project</p>
                <p className="truncate font-display text-lg font-semibold text-foreground">
                  {next.title}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-brand-500/40 group-hover:text-brand-500">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CtaSection
        title="Want results like these?"
        description="Every case study above started with a single conversation. Yours takes 30 minutes and costs nothing."
      />
    </>
  );
}

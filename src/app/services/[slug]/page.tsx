import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Package, TrendingUp, X } from "lucide-react";
import { getService, services } from "@/config/services";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader, SectionTag } from "@/components/ui/section";
import { ServiceCard } from "@/components/shared/service-card";
import { CtaSection } from "@/components/shared/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/visuals/aurora";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: `${service.title} — ${service.tagline}`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <SectionTag>{service.title}</SectionTag>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {service.tagline}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" className="group">
                  Discuss your project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink href="/demos" variant="outline">
                  See example work
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="hidden lg:block">
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-500/30" />
                <div className="absolute inset-6 rounded-full bg-brand-500/5" />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                  <Icon name={service.icon} className="h-14 w-14" strokeWidth={1.25} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <Section className="pt-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-8 dark:border-red-500/15">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <X className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                The problem
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted">{service.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 dark:border-emerald-500/15">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Check className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Our solution
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted">{service.solution}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="What you get"
          title="Benefits that compound"
          description="Every engagement includes these as standard — not as add-ons."
        />
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {service.benefits.map((benefit, i) => (
            <Reveal key={benefit} delay={i * 0.05}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-[15px] font-medium leading-relaxed text-foreground">{benefit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Outcomes & Deliverables */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-brand-950 p-8 sm:p-10">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
                Expected business outcomes
              </h2>
              <p className="mt-2 text-sm text-brand-100/70">
                Based on measured results across comparable client projects.
              </p>
              <ul className="mt-7 flex flex-col gap-4">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                    <span className="text-[15px] leading-relaxed text-brand-100/90">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-8 shadow-soft sm:p-10">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Package className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                What's included
              </h2>
              <p className="mt-2 text-sm text-muted">
                A complete, itemised scope — delivered and documented.
              </p>
              <ul className="mt-7 flex flex-col gap-4">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-3.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                    <span className="text-[15px] leading-relaxed text-foreground">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related services */}
      <Section className="bg-surface-2/50">
        <SectionHeader
          tag="Keep exploring"
          title="Related services"
          description="Most projects combine two or three of these into one engagement."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.07}>
              <ServiceCard service={s} className="h-full" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 link-underline dark:text-brand-400"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      <CtaSection
        title={`Ready for ${service.shortTitle.toLowerCase()} that performs?`}
        description="Start with a free discovery call. You'll leave with clarity — whether or not we work together."
      />
    </>
  );
}

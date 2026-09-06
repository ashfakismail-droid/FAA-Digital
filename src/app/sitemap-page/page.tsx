import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/config/services";
import { industries } from "@/config/industries";
import { blogPosts } from "@/config/blog";
import { demos } from "@/config/demos";
import { createMetadata } from "@/lib/seo";
import { AuroraBackground } from "@/components/visuals/aurora";
import { SectionTag } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = createMetadata({
  title: "Sitemap",
  description: "Every page on the FAA Digital website, organised and linked.",
  path: "/sitemap-page",
});

const mainPages = [
  { label: "Home", href: "/" },
  { label: "Demo Gallery", href: "/demos" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalPages = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function SitemapPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>Sitemap</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Everything, one page away
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted">
              A complete index of every page on this website.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-x grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
        <SitemapColumn title="Main pages" links={mainPages} />
        <SitemapColumn
          title="Demos"
          links={demos.map((d) => ({ label: d.title, href: `/demos/${d.slug}` }))}
        />
        <SitemapColumn
          title="Services"
          links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
        />
        <SitemapColumn
          title="Industries"
          links={industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` }))}
        />
        <SitemapColumn
          title="Articles"
          links={blogPosts.map((b) => ({ label: b.title, href: `/blog/${b.slug}` }))}
        />
        <SitemapColumn title="Legal" links={legalPages} />
      </div>
    </>
  );
}

function SitemapColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <Reveal>
      <nav aria-label={title} className="h-full rounded-3xl border border-border bg-surface p-7 shadow-soft">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          {title}
        </h2>
        <ul className="flex flex-col gap-2.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm leading-relaxed text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}

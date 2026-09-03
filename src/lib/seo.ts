import type { Metadata } from "next";
import { site } from "@/config/site";

interface SeoInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function absoluteUrl(path = ""): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? `${site.name} — ${site.tagline}` : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${site.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.lines[0],
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

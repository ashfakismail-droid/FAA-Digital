import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { AuroraBackground } from "@/components/visuals/aurora";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AuroraBackground />
      <div className="container-x relative z-10 py-32 text-center">
        <p className="font-mono text-sm font-medium tracking-[0.3em] text-brand-600 dark:text-brand-400">
          ERROR 404
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          This page wandered off the map
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
          The page you're looking for doesn't exist or has been moved. Let's get you back to
          somewhere useful.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" size="lg">
            <Home className="h-4 w-4" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="outline" size="lg">
            <Compass className="h-4 w-4" />
            Explore our work
          </ButtonLink>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted">
          {[
            { label: "Services", href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Demos", href: "/demos" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

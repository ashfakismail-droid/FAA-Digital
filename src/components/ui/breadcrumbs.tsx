import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLdItems = [
    { name: "Home", url: "/" },
    ...items.map((i) => ({ name: i.label, url: i.href })),
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md transition-colors hover:text-foreground"
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={item.href + item.label}>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-muted/50" />
                </li>
                <li>
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-foreground">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="rounded-md transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

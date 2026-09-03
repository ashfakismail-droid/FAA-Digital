import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { ThemeScript } from "@/components/layout/theme-script";
import { SiteShell } from "@/components/layout/site-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital agency",
    "web design",
    "web development",
    "premium websites",
    "e-commerce development",
    "UI UX design",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9FAFF" },
    { media: "(prefers-color-scheme: dark)", color: "#080812" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ThemeScript />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

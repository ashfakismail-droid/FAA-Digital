import { ArrowRight, CalendarClock, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function CtaSection({
  title = "Let's build something exceptional",
  description = "Tell us about your project. You'll get an honest assessment, a fixed-scope proposal, and advice you can use even if we don't work together.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden py-20 sm:py-28", className)}>
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-950 px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            {/* Decorative */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(122,120,240,0.35), transparent), radial-gradient(ellipse 40% 40% at 80% 100%, rgba(95,92,230,0.25), transparent)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            {/* Floating orbs */}
            <div aria-hidden="true" className="absolute left-[12%] top-[20%] h-3 w-3 animate-float rounded-full bg-brand-400/60" />
            <div aria-hidden="true" className="absolute right-[15%] top-[30%] h-2 w-2 animate-float-slow rounded-full bg-brand-300/50" />
            <div aria-hidden="true" className="absolute bottom-[25%] left-[20%] h-2.5 w-2.5 animate-float rounded-full bg-brand-500/50 [animation-delay:-3s]" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-brand-100/80 sm:text-lg">
                {description}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <ButtonLink href="/contact" size="lg" variant="white" className="group">
                    Start your project
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink
                    href={`https://wa.me/${site.whatsapp}`}
                    external
                    size="lg"
                    className="border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp us
                  </ButtonLink>
                </Magnetic>
              </div>

              <p className="mt-8 inline-flex items-center gap-2 text-sm text-brand-100/70">
                <CalendarClock className="h-4 w-4" />
                Free 30-minute discovery call — no pressure, no obligation
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

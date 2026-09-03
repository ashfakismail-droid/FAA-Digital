import { AuroraBackground } from "@/components/visuals/aurora";
import { SectionTag } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  tag,
  title,
  updated,
  intro,
  sections,
}: {
  tag: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <AuroraBackground />
        <div className="container-x relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionTag>{tag}</SectionTag>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-muted">{intro}</p>
            <p className="mt-4 text-xs text-muted">Last updated: {updated}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-x max-w-3xl pb-24">
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.02}>
              <section className="rounded-3xl border border-border bg-surface p-7 shadow-soft sm:p-9">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {i + 1}. {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-3.5">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-pretty text-[15px] leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

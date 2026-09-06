import { ArrowRight } from "lucide-react";
import { getShowcaseDemosAsProjects } from "@/config/demos";
import { Section, SectionTag } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/shared/project-card";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedWork() {
  const featured = getShowcaseDemosAsProjects();

  return (
    <Section>
      <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionTag className="mb-5">Selected work</SectionTag>
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Case studies with receipts — real results, measured
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Every project below moved a business metric that matters: bookings, leads, revenue, or
            time saved. Explore the thinking behind the pixels.
          </p>
        </div>
        <ButtonLink href="/demos" variant="outline" className="group shrink-0">
          View all work
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </div>

      {featured.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-medium text-foreground">No featured demos yet</p>
          <p className="mt-2 text-sm text-muted">
            Enable "Main Menu Showcase" in Studio to showcase it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => {
            const isExternal = project.liveUrl?.startsWith("http");
            return (
              <Reveal key={project.slug} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-12" : ""}>
                <ProjectCard project={project} href={project.liveUrl ?? `/demos/${project.slug}`} external={isExternal} />
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
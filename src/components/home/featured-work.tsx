import { ArrowRight } from "lucide-react";
import { projects } from "@/config/projects";
import { Section, SectionTag } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/shared/project-card";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

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
        <ButtonLink href="/portfolio" variant="outline" className="group shrink-0">
          View all work
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-12" : ""}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { techStack } from "@/config/tech-stack";
import { Section, SectionHeader } from "@/components/ui/section";
import { Marquee } from "@/components/motion/marquee";
import { cn } from "@/lib/utils";

export function TechStackSection() {
  const midpoint = Math.ceil(techStack.length / 2);
  const rowOne = techStack.slice(0, midpoint);
  const rowTwo = techStack.slice(midpoint);

  return (
    <Section bleed className="bg-surface-2/50">
      <div className="container-x">
        <SectionHeader
          tag="Technology"
          title="Built on a modern, proven stack"
          description="We choose boring, reliable technology over shiny experiments — so your website stays fast, secure, and maintainable for years."
        />
      </div>

      <div className="flex flex-col gap-4">
        <Marquee className="mask-fade-x">
          {rowOne.map((tech) => (
            <TechChip key={tech.name} name={tech.name} category={tech.category} />
          ))}
        </Marquee>
        <Marquee className="mask-fade-x" reverse>
          {rowTwo.map((tech) => (
            <TechChip key={tech.name} name={tech.name} category={tech.category} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

function TechChip({ name, category }: { name: string; category: string }) {
  return (
    <span
      className={cn(
        "mx-2 inline-flex items-center gap-3 whitespace-nowrap rounded-2xl border border-border bg-surface px-5 py-3 shadow-soft"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-brand-500" />
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted">{category}</span>
    </span>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { WebsiteMockup } from "@/components/visuals/website-mockup";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-500/30 hover:shadow-lifted",
        className
      )}
      aria-label={`View case study: ${project.title}`}
    >
      <div className="relative overflow-hidden">
        <WebsiteMockup
          icon={project.icon}
          palette={project.palette}
          title={project.title}
          category={project.category}
          className="aspect-[16/10] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-900 shadow-soft backdrop-blur-sm">
            Featured
          </span>
        )}
        <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="brand">{project.category}</Badge>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="rounded-md bg-surface-2 px-2 py-1 text-[11px] font-medium text-muted">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-md bg-surface-2 px-2 py-1 text-[11px] font-medium text-muted">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

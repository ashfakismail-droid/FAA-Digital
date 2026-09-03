import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { formatDate, cn } from "@/lib/utils";

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-500/30 hover:shadow-lifted",
        className
      )}
    >
      {/* Visual header */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-brand-300 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
          <Icon name={post.icon} className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <span className="absolute left-4 top-4">
          <Badge className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
            {post.category}
          </Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className="text-balance font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[11px] font-semibold text-white">
              {post.author.initials}
            </span>
            <span className="text-xs font-medium text-foreground">{post.author.name}</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-brand-500/40 group-hover:bg-brand-600 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

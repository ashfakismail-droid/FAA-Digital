import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_2px_rgb(75_73_214/0.4),0_8px_24px_-8px_rgb(75_73_214/0.55)] hover:bg-brand-500 hover:shadow-glow hover:-translate-y-0.5",
  secondary:
    "bg-foreground text-background shadow-soft hover:-translate-y-0.5 hover:shadow-card",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground/30 hover:bg-foreground/5",
  ghost: "text-foreground hover:bg-foreground/5",
  white:
    "bg-white text-gray-950 shadow-soft hover:-translate-y-0.5 hover:shadow-card",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

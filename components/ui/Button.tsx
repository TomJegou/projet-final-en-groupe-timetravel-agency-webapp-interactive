import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-bright shadow-[0_8px_30px_-12px_rgba(201,165,91,0.5)] hover:shadow-[0_12px_40px_-12px_rgba(230,199,135,0.7)] hover:-translate-y-px",
  secondary:
    "bg-ink-veil text-ivory border border-hairline hover:border-gold/40 hover:bg-ink-soft",
  ghost: "text-ivory hover:text-gold-bright",
  outline:
    "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/70",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px] tracking-[0.2em] rounded-full",
  md: "h-11 px-6 text-xs tracking-[0.25em] rounded-full",
  lg: "h-14 px-8 text-xs tracking-[0.3em] rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

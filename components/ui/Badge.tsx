import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink-veil/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold",
        className,
      )}
      {...props}
    />
  );
}

export function Dot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-1 w-1 rounded-full bg-current opacity-70",
        className,
      )}
      aria-hidden
    />
  );
}

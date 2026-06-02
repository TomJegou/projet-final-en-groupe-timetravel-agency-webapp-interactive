import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

export function Section({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative px-6 py-24 sm:px-10 sm:py-32", className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || intro) && (
          <header
            className={cn(
              "mb-16 flex flex-col gap-5",
              align === "center" && "items-center text-center",
            )}
          >
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="max-w-2xl text-base leading-relaxed text-ivory-mute sm:text-lg">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

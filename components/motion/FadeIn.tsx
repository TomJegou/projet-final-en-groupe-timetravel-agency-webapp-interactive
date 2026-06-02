"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
};

const transition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export function FadeIn({
  children,
  delay = 0,
  duration,
  y = 24,
  className,
  as = "div",
  once = true,
}: FadeInProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ ...transition, delay, ...(duration && { duration }) }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

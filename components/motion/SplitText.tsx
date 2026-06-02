"use client";

import { motion } from "motion/react";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

export function SplitText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.04,
  as = "h1",
}: SplitTextProps) {
  const MotionTag = motion[as];
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, wordIdx) => (
        <span
          key={`${word}-${wordIdx}`}
          className="inline-block align-baseline"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: 24, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
            {wordIdx < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

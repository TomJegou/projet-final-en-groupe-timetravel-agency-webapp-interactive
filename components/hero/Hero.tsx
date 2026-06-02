"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { destinations } from "@/lib/destinations";
import { SplitText } from "@/components/motion/SplitText";

const ROTATION_MS = 7000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % destinations.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 -z-10"
      >
        {destinations.map((d, i) => (
          <video
            key={d.slug}
            src={d.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,9,7,0.6)_70%,rgba(11,9,7,0.95)_100%)]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold/80"
        >
          <span className="h-px w-8 bg-gold/40" />
          Établie en l&apos;an 2089
          <span className="h-px w-8 bg-gold/40" />
        </motion.p>

        <SplitText
          as="h1"
          text="L'art du voyage temporel"
          className="font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl md:text-8xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg"
        >
          Trois époques. Trois mondes. Une expérience curatée pour ceux qui
          considèrent l&apos;histoire comme un terrain à explorer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="#destinations"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-10 text-xs uppercase tracking-[0.3em] text-ink shadow-[0_8px_30px_-12px_rgba(201,165,91,0.5)] transition-all duration-500 hover:-translate-y-px hover:bg-gold-bright hover:shadow-[0_12px_40px_-12px_rgba(230,199,135,0.7)]"
          >
            Découvrir les époques
          </Link>
          <Link
            href="/reservation"
            className="inline-flex h-14 items-center justify-center rounded-full border border-ivory/20 px-10 text-xs uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-gold hover:text-gold"
          >
            Réserver un voyage
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.2 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-ivory-mute">
            Défilez
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-ivory/10">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 h-1/2 bg-gold"
            />
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {destinations.map((d, i) => (
          <button
            key={d.slug}
            onClick={() => setActiveIndex(i)}
            className="group flex items-center gap-3"
            aria-label={`Afficher ${d.name}`}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                i === activeIndex ? "text-gold" : "text-ivory-mute"
              }`}
            >
              {d.shortEra}
            </span>
            <span
              className={`h-px transition-all duration-700 ${
                i === activeIndex
                  ? "w-12 bg-gold"
                  : "w-6 bg-ivory-mute group-hover:w-9 group-hover:bg-ivory-dim"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

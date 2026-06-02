"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/destinations";

type Props = {
  destination: Destination;
  index: number;
};

export function DestinationCard({ destination, index }: Props) {
  const isOdd = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
      className={`group grid gap-10 lg:grid-cols-12 lg:gap-16 ${
        isOdd ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="relative col-span-7 block overflow-hidden rounded-3xl"
        aria-label={`Découvrir ${destination.name} ${destination.shortEra}`}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={destination.heroImage.src}
            alt={destination.heroImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            quality={85}
            className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                {destination.shortEra}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-ivory sm:text-4xl">
                {destination.name}
              </h3>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 bg-ink/50 text-ivory backdrop-blur-sm transition-all duration-700 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.4} />
            </span>
          </div>
        </div>
      </Link>

      <div className="col-span-5 flex flex-col justify-center">
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-gold-dim">
          {`Destination ${String(index + 1).padStart(2, "0")} / ${"03"}`}
        </p>
        <h3 className="mt-5 font-serif text-3xl italic text-ivory sm:text-4xl">
          {destination.tagline}
        </h3>
        <p className="mt-6 text-base leading-relaxed text-ivory-mute">
          {destination.shortDescription}
        </p>

        <ul className="mt-8 space-y-2 text-sm text-ivory-dim">
          {destination.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span className="mt-2 h-px w-5 bg-gold-dim" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center gap-6">
          <Link
            href={`/destinations/${destination.slug}`}
            className="link-underline text-xs uppercase tracking-[0.3em] text-gold"
          >
            Détails de l&apos;époque
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
            {destination.duration} · {destination.difficulty}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

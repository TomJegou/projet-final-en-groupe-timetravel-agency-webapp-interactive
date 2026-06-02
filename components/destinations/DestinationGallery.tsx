"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/Dialog";
import type { DestinationImage } from "@/lib/destinations";

type Props = {
  images: DestinationImage[];
};

export function DestinationGallery({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const layout = (idx: number, ratio: DestinationImage["ratio"]) => {
    const aspect =
      ratio === "16:9"
        ? "aspect-[16/9]"
        : ratio === "9:16"
          ? "aspect-[9/16]"
          : "aspect-square";
    const span =
      ratio === "16:9"
        ? "md:col-span-8"
        : ratio === "9:16"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-4";
    return `${aspect} ${span} ${idx === 0 ? "md:col-span-8" : ""}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 4) * 0.06,
            }}
            className={`group relative overflow-hidden rounded-2xl ${layout(
              i,
              img.ratio,
            )}`}
            aria-label={`Agrandir : ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={75}
              className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />
          </motion.button>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <DialogContent size="wide" className="max-w-5xl bg-transparent p-0">
          <DialogTitle className="sr-only">
            {openIndex !== null ? images[openIndex].alt : "Galerie"}
          </DialogTitle>
          <AnimatePresence mode="wait">
            {openIndex !== null && (
              <motion.div
                key={openIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl">
                  <Image
                    src={images[openIndex].src}
                    alt={images[openIndex].alt}
                    fill
                    sizes="100vw"
                    quality={95}
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-ivory-mute">
                  {images[openIndex].alt}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}

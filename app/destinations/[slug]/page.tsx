import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DestinationGallery } from "@/components/destinations/DestinationGallery";
import {
  destinations,
  getDestination,
  getDestinationSlugs,
} from "@/lib/destinations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  return {
    title: `${destination.name} · ${destination.shortEra}`,
    description: destination.shortDescription,
    openGraph: {
      title: `${destination.name} · ${destination.shortEra}`,
      description: destination.shortDescription,
      images: [
        {
          url: destination.heroImage.src,
          width: 1600,
          height: 900,
          alt: destination.heroImage.alt,
        },
      ],
    },
  };
}

export const dynamicParams = false;

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const otherDestinations = destinations.filter((d) => d.slug !== slug);

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[640px] w-full overflow-hidden">
        <video
          key={destination.slug}
          src={destination.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={destination.heroImage.src}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={`Vidéo immersive de ${destination.name}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,9,7,0.7)_90%)]" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-28">
          <div className="mx-auto w-full max-w-7xl">
            <Link
              href="/#destinations"
              className="link-underline inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-ivory-mute"
            >
              <ArrowLeft className="h-3 w-3" />
              Toutes les époques
            </Link>

            <FadeIn delay={0.1} className="mt-12 max-w-4xl">
              <Badge>{destination.shortEra}</Badge>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl md:text-8xl">
                {destination.name}
              </h1>
              <p className="mt-6 max-w-2xl font-serif text-2xl italic text-gold-bright sm:text-3xl">
                {destination.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-12 grid gap-6 sm:grid-cols-3">
              <Detail label="Époque" value={destination.era} />
              <Detail label="Durée" value={destination.duration} />
              <Detail label="Difficulté" value={destination.difficulty} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                Le contexte
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory sm:text-4xl">
                Ce que vous allez vivre
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="p" className="font-serif text-2xl leading-relaxed text-ivory sm:text-3xl">
              {destination.longDescription}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-gold/10 bg-ink-soft px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
              Au programme
            </p>
            <h2 className="mt-5 font-serif text-4xl text-ivory sm:text-5xl">
              Les moments soigneusement choisis
            </h2>
          </FadeIn>
          <Stagger className="grid gap-px md:grid-cols-2">
            {destination.highlights.map((h, i) => (
              <StaggerItem
                key={h}
                className="group flex items-start gap-6 border-b border-gold/10 py-7"
              >
                <span className="mt-2 font-serif text-sm text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 font-serif text-2xl text-ivory transition-colors group-hover:text-gold-bright">
                  {h}
                </p>
                <ChevronRight
                  className="mt-3 h-4 w-4 text-gold-dim transition-transform duration-700 group-hover:translate-x-1 group-hover:text-gold"
                  strokeWidth={1.4}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
              Les premières images
            </p>
            <h2 className="mt-5 font-serif text-4xl text-ivory sm:text-5xl">
              Galerie de l&apos;époque
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ivory-mute">
              Visuels capturés par nos éclaireurs lors des missions
              préparatoires. Cliquez pour agrandir.
            </p>
          </FadeIn>
          <DestinationGallery images={destination.gallery} />
        </div>
      </section>

      {/* Travel tips */}
      <section className="border-t border-gold/10 bg-ink-soft px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                Conseils du voyageur
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory sm:text-4xl">
                Avant de partir
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ivory-mute">
                Ces consignes sont issues de l&apos;expérience cumulée de nos
                explorateurs. Elles ne sont ni optionnelles ni négociables.
              </p>
            </FadeIn>
          </div>
          <ul className="space-y-px lg:col-span-7 lg:col-start-6">
            {destination.travelTips.map((tip, i) => (
              <FadeIn
                key={tip}
                delay={i * 0.05}
                as="li"
                className="flex items-start gap-6 border-b border-gold/10 py-6"
              >
                <span className="mt-1 font-serif text-xs text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 text-base leading-relaxed text-ivory-dim">
                  {tip}
                </p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-32 sm:px-10 sm:py-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(201,165,91,0.08)_0%,transparent_60%)]" />
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
            Prêt·e ?
          </p>
          <h2 className="mt-6 font-serif text-4xl text-ivory sm:text-6xl">
            Réservez votre départ pour
            <br />
            <em className="text-gold-gradient">{destination.name}</em>
          </h2>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={`/reservation?destination=${destination.slug}`}
              className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-10 text-xs uppercase tracking-[0.3em] text-ink shadow-[0_8px_30px_-12px_rgba(201,165,91,0.5)] transition-all duration-500 hover:-translate-y-px hover:bg-gold-bright"
            >
              Réserver ce voyage
            </Link>
            <Link
              href="/#destinations"
              className="link-underline text-xs uppercase tracking-[0.3em] text-ivory-dim"
            >
              Voir les autres époques
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Other destinations */}
      <section className="border-t border-gold/10 px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            Voyager autrement
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {otherDestinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative aspect-[16/10] overflow-hidden rounded-3xl"
              >
                <Image
                  src={d.heroImage.src}
                  alt={d.heroImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                    {d.shortEra}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-ivory">
                    {d.name}
                  </h3>
                  <p className="mt-2 text-sm italic text-ivory-mute">
                    {d.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-gold/30 pl-5">
      <p className="text-[10px] uppercase tracking-[0.4em] text-ivory-mute">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl text-ivory">{value}</p>
    </div>
  );
}

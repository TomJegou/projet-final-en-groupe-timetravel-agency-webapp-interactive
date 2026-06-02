import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  destinations,
  type DestinationSlug,
} from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Réservation",
  description:
    "Réservez votre voyage temporel. Trois destinations exclusives, une consultation préliminaire avec un conseiller dédié.",
};

type PageProps = {
  searchParams: Promise<{ destination?: string }>;
};

export default async function ReservationPage({ searchParams }: PageProps) {
  const { destination } = await searchParams;
  const initial = destinations.find((d) => d.slug === destination)?.slug as
    | DestinationSlug
    | undefined;

  return (
    <article className="relative overflow-hidden px-6 pb-32 pt-40 sm:px-10 sm:pt-48">
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(201,165,91,0.06)_0%,transparent_60%)]" />

      <FadeIn className="mx-auto mb-20 max-w-2xl text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
          Réservation
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-ivory sm:text-6xl">
          Programmez votre
          <br />
          <em className="text-gold-gradient">prochain départ.</em>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ivory-mute">
          Quatre étapes, deux minutes. Notre conseiller temporel revient vers
          vous sous 48h pour valider votre fenêtre de stabilité chronologique.
        </p>
      </FadeIn>

      <BookingForm defaultDestination={initial} />
    </article>
  );
}

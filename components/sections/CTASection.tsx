import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-gold/10 px-6 py-32 sm:px-10 sm:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(201,165,91,0.08)_0%,transparent_60%)]" />

      <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
          Réservation
        </p>
        <h2 className="mt-6 font-serif text-4xl text-ivory sm:text-6xl">
          L&apos;époque qui vous attend
          <br />
          <em className="text-gold-gradient">est presque prête.</em>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-mute">
          Réservez une consultation préliminaire avec l&apos;un de nos
          conseillers temporels. Nous évaluerons ensemble la meilleure période
          pour votre départ — selon votre disponibilité, votre profil et la
          fenêtre de stabilité chronologique en cours.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/reservation"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-10 text-xs uppercase tracking-[0.3em] text-ink shadow-[0_8px_30px_-12px_rgba(201,165,91,0.5)] transition-all duration-500 hover:-translate-y-px hover:bg-gold-bright hover:shadow-[0_12px_40px_-12px_rgba(230,199,135,0.7)]"
          >
            Réserver maintenant
          </Link>
          <Link
            href="/#destinations"
            className="link-underline text-xs uppercase tracking-[0.3em] text-ivory-dim"
          >
            ou explorer les époques
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

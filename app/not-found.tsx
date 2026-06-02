import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
        Erreur 404
      </p>
      <h1 className="mt-8 font-serif text-6xl text-ivory sm:text-8xl">
        Cette époque
        <br />
        <em className="text-gold-gradient">n&apos;existe pas.</em>
      </h1>
      <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-mute">
        La page que vous recherchez n&apos;a jamais été cataloguée par notre
        agence — ou elle a peut-être glissé dans une ligne temporelle
        parallèle. Revenons à un point stable.
      </p>
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-10 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:-translate-y-px hover:bg-gold-bright"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/#destinations"
          className="link-underline text-xs uppercase tracking-[0.3em] text-ivory-dim"
        >
          ou voir les époques disponibles
        </Link>
      </div>
    </section>
  );
}

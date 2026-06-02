"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
        Anomalie temporelle
      </p>
      <h1 className="mt-8 font-serif text-5xl text-ivory sm:text-7xl">
        Une <em className="text-gold-gradient">turbulence</em>
        <br />
        s&apos;est produite.
      </h1>
      <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-mute">
        Un de nos modules a rencontré une distorsion. Vous pouvez recharger la
        fenêtre, ou revenir à un point stable.
      </p>
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-14 items-center justify-center rounded-full bg-gold px-10 text-xs uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:-translate-y-px hover:bg-gold-bright"
        >
          Recharger
        </button>
        <Link
          href="/"
          className="link-underline text-xs uppercase tracking-[0.3em] text-ivory-dim"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
      {error.digest && (
        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory-mute">
          Réf · {error.digest}
        </p>
      )}
    </section>
  );
}

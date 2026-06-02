import Link from "next/link";
import { destinations } from "@/lib/destinations";

export default function DestinationNotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
        Destination introuvable
      </p>
      <h1 className="mt-8 font-serif text-5xl text-ivory sm:text-6xl">
        Aucune fenêtre temporelle
        <br />
        <em className="text-gold-gradient">vers cette époque.</em>
      </h1>
      <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-mute">
        Notre catalogue ne contient que trois destinations soigneusement
        curatées. Découvrez-les ci-dessous.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="link-underline rounded-full border border-gold/40 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            {d.name} · {d.shortEra}
          </Link>
        ))}
      </div>
    </section>
  );
}

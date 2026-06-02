import Link from "next/link";
import { destinations } from "@/lib/destinations";

export function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-ink-soft px-6 py-20 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
              <span className="font-serif text-xl italic text-gold">T</span>
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.4em] text-ivory-mute">
                TimeTravel
              </span>
              <span className="font-serif text-base tracking-wider text-ivory">
                Agency
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory-mute">
            L&apos;agence de voyages temporels pensée pour ceux qui veulent
            ressentir l&apos;histoire, et non pas la lire. Trois époques,
            soigneusement curatées par nos historiens et explorateurs.
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold-dim">
            Établie sur trois continents · cinq siècles
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base text-ivory">Destinations</h3>
          <ul className="mt-5 space-y-3">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="text-sm text-ivory-dim transition-colors hover:text-gold"
                >
                  {d.name} · {d.shortEra}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base text-ivory">Agence</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory-dim">
            <li>
              <Link
                href="/#agence"
                className="transition-colors hover:text-gold"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                href="/reservation"
                className="transition-colors hover:text-gold"
              >
                Réserver un voyage
              </Link>
            </li>
            <li>
              <Link
                href="/#agence"
                className="transition-colors hover:text-gold"
              >
                Notre charte temporelle
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-gold/10 pt-8 text-[10px] uppercase tracking-[0.3em] text-ivory-mute md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} TimeTravel Agency · Tous droits réservés</p>
        <p>
          Voyager dans le temps n&apos;altère pas votre ligne temporelle —{" "}
          <span className="text-gold-dim">conformément à la charte 2089</span>
        </p>
      </div>
    </footer>
  );
}

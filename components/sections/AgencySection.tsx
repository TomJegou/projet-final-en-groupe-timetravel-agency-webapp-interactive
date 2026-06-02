import { Compass, Clock4, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const stats = [
  { value: "5", suffix: "siècles", label: "couverts par nos voyages" },
  { value: "120+", suffix: "voyageurs", label: "ramenés à bon temps" },
  { value: "0", suffix: "paradoxe", label: "depuis notre fondation" },
];

const pillars = [
  {
    icon: Compass,
    title: "Curation historique",
    text: "Chaque destination est encadrée par un historien sénior et un explorateur de terrain, qui ont vécu sur place plusieurs mois avant l'ouverture commerciale.",
  },
  {
    icon: Clock4,
    title: "Charte temporelle 2089",
    text: "Aucune interaction ne peut altérer votre ligne d'origine. Nos itinéraires sont calibrés pour observer sans modifier — une discipline que nous appelons la non-trace.",
  },
  {
    icon: Users,
    title: "Groupes restreints",
    text: "Six voyageurs par expédition au maximum. Vous êtes accompagné·e d'un guide bilingue de l'époque, formé à votre langue moderne pour vous traduire en temps réel.",
  },
];

export function AgencySection() {
  return (
    <Section
      id="agence"
      eyebrow="L'agence"
      title={
        <>
          Voyager dans le temps,
          <br />
          <em className="text-gold-gradient">avec discernement</em>
        </>
      }
      intro="TimeTravel Agency a été fondée par une équipe d'historiens, d'archivistes et d'ingénieurs temporels convaincus qu'il existait une manière noble de traverser les siècles : avec préparation, avec respect, et avec un regard d'esthète."
    >
      <Stagger className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }) => (
          <StaggerItem
            key={title}
            className="group rounded-3xl border border-hairline bg-ink-soft/40 p-8 transition-all duration-700 hover:-translate-y-1 hover:border-gold/30 hover:bg-ink-soft"
          >
            <Icon
              className="h-7 w-7 text-gold transition-transform duration-700 group-hover:rotate-[-6deg]"
              strokeWidth={1.4}
            />
            <h3 className="mt-6 font-serif text-2xl text-ivory">{title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory-mute">
              {text}
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-24 grid gap-10 border-t border-gold/10 pt-16 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
            <Reveal as="div">
              <p className="font-serif text-6xl text-ivory">
                {stat.value}
                <span className="ml-2 text-base text-gold-dim">
                  {stat.suffix}
                </span>
              </p>
            </Reveal>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-ivory-mute">
              {stat.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

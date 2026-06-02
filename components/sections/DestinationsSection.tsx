import { Section } from "@/components/ui/Section";
import { destinations } from "@/lib/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";

export function DestinationsSection() {
  return (
    <Section
      id="destinations"
      eyebrow="Trois époques"
      title={
        <>
          Le catalogue
          <br />
          <em className="text-gold-gradient">des époques rares</em>
        </>
      }
      intro="Trois fenêtres choisies parmi des milliers d'années. Chacune a été ouverte pour des raisons différentes — pour ce qu'elle révèle de l'humanité, du monde avant elle, ou de notre rapport au sublime."
    >
      <div className="space-y-32 lg:space-y-40">
        {destinations.map((destination, i) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}

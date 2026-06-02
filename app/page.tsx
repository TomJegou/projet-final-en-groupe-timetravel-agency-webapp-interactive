import { Hero } from "@/components/hero/Hero";
import { AgencySection } from "@/components/sections/AgencySection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AgencySection />
      <DestinationsSection />
      <CTASection />
    </>
  );
}

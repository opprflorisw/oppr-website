import { HeroSection } from "@/components/home/HeroSection";
import { HomePathSelector } from "@/components/home/HomePathSelector";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { InsightsSpotlight } from "@/components/home/InsightsSpotlight";
import { ProvenResultsSection } from "@/components/home/ProvenResultsSection";
import { AudiencesSection } from "@/components/home/AudiencesSection";
import { OperatorFirstSection } from "@/components/home/OperatorFirstSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomePathSelector />
      <ProblemSection />
      <PlatformSection />
      <InsightsSpotlight />
      <ProvenResultsSection />
      <AudiencesSection />
      <OperatorFirstSection />
      <SocialProofSection />
      <CTASection />
    </>
  );
}

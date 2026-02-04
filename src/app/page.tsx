import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ProvenResultsSection } from "@/components/home/ProvenResultsSection";
import { AudiencesSection } from "@/components/home/AudiencesSection";
import { InsightsCallout } from "@/components/home/InsightsCallout";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PlatformSection />
      <ProvenResultsSection />
      <AudiencesSection />
      <InsightsCallout />
      <SocialProofSection />
      <CTASection />
    </>
  );
}

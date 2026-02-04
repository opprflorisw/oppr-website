import { InsightsHero } from "@/components/insights/InsightsHero";
import { ChallengeSection } from "@/components/insights/ChallengeSection";
import { InsightsStepsSection } from "@/components/insights/InsightsStepsSection";
import { UseCasesSection } from "@/components/insights/UseCasesSection";
import { PricingSection } from "@/components/insights/PricingSection";
import { PlatformConnectionSection } from "@/components/insights/PlatformConnectionSection";
import { InsightsCTA } from "@/components/insights/InsightsCTA";

export default function InsightsPage() {
  return (
    <>
      <InsightsHero />
      <ChallengeSection />
      <InsightsStepsSection />
      <UseCasesSection />
      <PricingSection />
      <PlatformConnectionSection />
      <InsightsCTA />
    </>
  );
}

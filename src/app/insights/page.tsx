import type { Metadata } from "next";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { ChallengeSection } from "@/components/insights/ChallengeSection";
import { InsightsStepsSection } from "@/components/insights/InsightsStepsSection";
import { UseCasesSection } from "@/components/insights/UseCasesSection";
import { PricingSection } from "@/components/insights/PricingSection";
import { PlatformConnectionSection } from "@/components/insights/PlatformConnectionSection";
import { InsightsCTA } from "@/components/insights/InsightsCTA";

export const metadata: Metadata = {
  title: "Oppr Insights | Operational Discovery",
  description: "Give everyone in your organization a voice. Oppr Insights captures ideas, observations, and expertise from your entire workforce — asynchronously, in any language — and uses AI to structure what you discover into actionable starting points. No integration required.",
};

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

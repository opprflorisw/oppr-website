"use client";

import {
  TrendUp,
  Factory,
  HourglassMedium,
  EyeSlash,
} from "@phosphor-icons/react";
import { SolutionPageHeader } from "@/components/solutions/shared/SolutionPageHeader";
import { ChallengeSection } from "@/components/solutions/shared/ChallengeSection";
import { PEValueSection } from "@/components/solutions/private-equity/PEValueSection";
import { PEEconomicsSection } from "@/components/solutions/private-equity/PEEconomicsSection";
import { SolutionCTA } from "@/components/solutions/shared/SolutionCTA";

const challenges = [
  {
    icon: Factory,
    title: "Every Company Is Different",
    description:
      "Different industries, scales, maturity levels. Generic 'best practices' produce generic results. You need systematic approaches that adapt.",
  },
  {
    icon: HourglassMedium,
    title: "Time Is Scarce",
    description:
      "Hold periods don't allow 18-month transformations. You need improvements that show results in quarters, not years.",
  },
  {
    icon: EyeSlash,
    title: "Limited Visibility",
    description:
      "Financial metrics tell you what happened, not why. Understanding operational root causes requires deep investigation.",
  },
];

export default function PrivateEquitySolutionPage() {
  return (
    <>
      <SolutionPageHeader
        icon={TrendUp}
        iconGradient="from-accent-purple/20 to-accent-purple/5"
        label="For Private Equity Investors"
        title="Systematic Operational Value Creation Across Your Portfolio"
        tagline="Your manufacturing portfolio companies have untapped operational value. The challenge is accessing it systematically, at scale, across diverse operations."
      />
      <ChallengeSection
        title="The Portfolio Challenge"
        intro="Your investment thesis includes operational improvement. The challenge is execution across different companies, within hold period timelines."
        challenges={challenges}
      />
      <PEValueSection />
      <PEEconomicsSection />
      <SolutionCTA text="Discuss Portfolio Opportunities" />
    </>
  );
}

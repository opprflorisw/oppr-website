"use client";

import {
  Factory,
  FileText,
  Brain,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { SolutionPageHeader } from "@/components/solutions/shared/SolutionPageHeader";
import { ChallengeSection } from "@/components/solutions/shared/ChallengeSection";
import { SMEValueSection } from "@/components/solutions/sme/SMEValueSection";
import { SMEEconomicsSection } from "@/components/solutions/sme/SMEEconomicsSection";
import { SolutionCTA } from "@/components/solutions/shared/SolutionCTA";

const challenges = [
  {
    icon: FileText,
    title: "Still on Paper and Excel",
    description:
      "Paper logs filed and forgotten. Digital forms that become PDF graveyards. Enterprise MES costs more than your annual IT budget. You know there\u2019s a better way.",
  },
  {
    icon: Brain,
    title: "Knowledge in a Few Heads",
    description:
      "Your senior operator knows why Line 2 acts up on humid days. When she takes vacation, things go wrong. When she retires, you're in trouble.",
  },
  {
    icon: ArrowsClockwise,
    title: "Same Problems Recurring",
    description:
      "That quality issue you solved last quarter? It's back. The solution is in someone's head—or they left. Improvements don't stick.",
  },
];

export default function SMESolutionPage() {
  return (
    <>
      <SolutionPageHeader
        icon={Factory}
        iconGradient="from-oppr-secondary/20 to-oppr-secondary/5"
        label="For SME Manufacturers"
        title="Your First Real Operational Intelligence System"
        tagline="No IT department required. No six-month implementation. No enterprise pricing. Just the system you've needed but couldn't afford—until now."
      />
      <ChallengeSection
        title="The SME Reality"
        intro="You know your operation better than any consultant ever will. But you're also stretched thin—no dedicated CI teams, no data analysts, no IT department."
        challenges={challenges}
      />
      <SMEValueSection />
      <SMEEconomicsSection />
      <SolutionCTA text="See How It Works for SMEs" />
    </>
  );
}

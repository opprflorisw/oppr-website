import type { Metadata } from "next";
import { Suspense } from "react";
import { InsightsContactSection } from "@/components/insights-contact/InsightsContactSection";

export const metadata: Metadata = {
  title: "Start with Oppr Insights | Get in Touch",
  description:
    "Ready to give your team a voice? Contact us to set up your Oppr Insights account. Capture ideas, observations, and expertise asynchronously in any language.",
};

export default function InsightsContactPage() {
  return (
    <Suspense>
      <InsightsContactSection />
    </Suspense>
  );
}

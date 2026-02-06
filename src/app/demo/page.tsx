import type { Metadata } from "next";
import { DemoHero } from "@/components/demo/DemoHero";
import { NextStepsSection } from "@/components/demo/NextStepsSection";
import { DemoFAQ } from "@/components/demo/DemoFAQ";

export const metadata: Metadata = {
  title: "Book a Demo | See Oppr in Action",
  description: "See how a single operator observation becomes a root cause analysis in minutes. Book a 30-minute demo tailored to your manufacturing operation.",
};

export default function DemoPage() {
  return (
    <>
      <DemoHero />
      <NextStepsSection />
      <DemoFAQ />
    </>
  );
}

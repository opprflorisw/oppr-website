import { DemoHero } from "@/components/demo/DemoHero";
import { NextStepsSection } from "@/components/demo/NextStepsSection";
import { DemoFAQ } from "@/components/demo/DemoFAQ";

export default function DemoPage() {
  return (
    <>
      <DemoHero />
      <NextStepsSection />
      <DemoFAQ />
    </>
  );
}

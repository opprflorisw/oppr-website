"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function PEEconomicsSection() {
  return (
    <SectionWrapper bg="white">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          Portfolio-Level Value
        </h3>
      </AnimatedSection>

      <AnimatedSection className="max-w-[800px] mx-auto">
        <div className="gradient-mesh-cta rounded-2xl p-8 text-white">
          <p className="text-lg leading-relaxed">
            For a PE firm with 10 manufacturing portfolio companies averaging
            &euro;75M revenue each, systematic operational knowledge capture
            typically generates{" "}
            <strong className="font-bold">&euro;5-15M</strong> in aggregate
            value creation over a 5-year hold period&mdash;often with platform
            investment payback in the first year.
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function ConsultantDifferentiationSection() {
  return (
    <SectionWrapper bg="white">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          Differentiate Your Practice
        </h3>
      </AnimatedSection>

      <AnimatedSection className="max-w-[800px] mx-auto">
        <div className="glass-medium border-gradient-animated rounded-2xl p-10">
          <p className="text-lg text-text-primary leading-relaxed text-center">
            We&rsquo;re the consultants who leave infrastructure, not just
            playbooks. When we finish an engagement, you have a system that
            continues capturing knowledge, maintaining documentation, and
            enabling root cause analysis&mdash;not binders that collect dust.
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

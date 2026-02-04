"use client";

import { Check } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlowCard } from "@/components/shared/GlowCard";

const customerBenefits = [
  "Turn-key knowledge capture from day one",
  "No separate implementation project",
  "System that understands their equipment",
  "Enhanced support with captured context",
];

const oemBenefits = [
  "Visibility into field performance",
  "Proactive service capability",
  "New recurring revenue stream",
  "Product improvement insights",
];

export function OEMValueSection() {
  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-3">
          Exploring Pre-Installed Intelligence
        </h3>
        <p className="text-lg text-text-secondary text-center max-w-[650px] mx-auto mb-12">
          What if every production line you sell could come with Oppr
          pre-configured&mdash;ready to capture operator knowledge from day
          one? We&apos;re exploring partnerships with forward-thinking OEMs.
        </p>
      </AnimatedSection>

      <AnimatedSection className="max-w-[800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Your Customers Get */}
          <GlowCard
            glowColor="rgba(30, 58, 95, 0.1)"
            className="p-6"
          >
            <h4 className="font-semibold text-text-primary text-lg mb-4">
              What Your Customers Get
            </h4>
            <ul className="space-y-3">
              {customerBenefits.map((item) => (
                <li
                  key={item}
                  className="text-sm text-text-secondary flex items-start gap-2"
                >
                  <Check
                    size={18}
                    weight="bold"
                    className="text-docs mt-0.5 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>

          {/* What You Get */}
          <GlowCard
            glowColor="rgba(30, 58, 95, 0.1)"
            className="p-6"
          >
            <h4 className="font-semibold text-text-primary text-lg mb-4">
              What You Get
            </h4>
            <ul className="space-y-3">
              {oemBenefits.map((item) => (
                <li
                  key={item}
                  className="text-sm text-text-secondary flex items-start gap-2"
                >
                  <Check
                    size={18}
                    weight="bold"
                    className="text-docs mt-0.5 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

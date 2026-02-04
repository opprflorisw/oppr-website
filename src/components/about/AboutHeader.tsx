"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

const headerOrbs = [
  {
    color: "rgba(30, 58, 95, 0.12)",
    size: "w-[400px] h-[400px]",
    position: "top-[-15%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[80px]",
  },
  {
    color: "rgba(224, 122, 61, 0.1)",
    size: "w-[300px] h-[300px]",
    position: "bottom-[-10%] right-[5%]",
    animation: "animate-float-medium",
    blur: "blur-[70px]",
  },
];

export function AboutHeader() {
  return (
    <header className="gradient-mesh-hero noise-overlay relative overflow-hidden py-28 md:py-36">
      <FloatingOrbs orbs={headerOrbs} />

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center max-w-[720px] mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
            About Us
          </p>
          <h1 className="text-display-1 font-serif text-text-primary mb-6">
            Born on the Shop Floor, Driven by Data
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto">
            Oppr was born in 2023 from years of experience on the shop-floor as an operator, engineer, and manager—driving home one lesson again and again: data and knowledge are the lifeblood of real operations.
          </p>
        </AnimatedSection>
      </div>
    </header>
  );
}

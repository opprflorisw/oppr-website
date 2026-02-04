"use client";

import type { Icon } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

interface SolutionPageHeaderProps {
  icon: Icon;
  iconGradient: string;
  label: string;
  title: string;
  tagline: string;
}

const headerOrbs = [
  {
    color: "rgba(30, 58, 95, 0.1)",
    size: "w-[350px] h-[350px]",
    position: "top-[-10%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[70px]",
  },
  {
    color: "rgba(224, 122, 61, 0.08)",
    size: "w-[250px] h-[250px]",
    position: "bottom-[-10%] right-[5%]",
    animation: "animate-float-medium",
    blur: "blur-[60px]",
  },
];

export function SolutionPageHeader({
  icon: IconComponent,
  iconGradient,
  label,
  title,
  tagline,
}: SolutionPageHeaderProps) {
  return (
    <header className="gradient-mesh-hero noise-overlay bg-dot-grid-subtle relative overflow-hidden py-28 md:py-36">
      <FloatingOrbs orbs={headerOrbs} />
      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center max-w-[720px] mx-auto">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center mx-auto mb-5`}
          >
            <IconComponent size={32} weight="duotone" className="text-oppr-primary" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
            {label}
          </p>
          <h1 className="text-display-1 font-serif text-text-primary mb-6">
            {title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto">
            {tagline}
          </p>
        </AnimatedSection>
      </div>
    </header>
  );
}

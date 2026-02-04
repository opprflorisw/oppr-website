"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

const ctaOrbs = [
  {
    color: "rgba(224, 122, 61, 0.12)",
    size: "w-[300px] h-[300px]",
    position: "top-[-20%] left-[10%]",
    animation: "animate-float-slow" as const,
    blur: "blur-[70px]",
  },
  {
    color: "rgba(59, 130, 246, 0.10)",
    size: "w-[250px] h-[250px]",
    position: "bottom-[-15%] right-[5%]",
    animation: "animate-float-medium" as const,
    blur: "blur-[60px]",
  },
];

interface SolutionCTAProps {
  text: string;
  href?: string;
}

export function SolutionCTA({ text, href = "/demo" }: SolutionCTAProps) {
  return (
    <section className="gradient-mesh-cta noise-overlay relative overflow-hidden section-padding">
      <FloatingOrbs orbs={ctaOrbs} />
      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="text-display-2 font-serif text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
            See how Oppr fits your specific operational context.
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-oppr-primary bg-white rounded-lg hover:bg-white/90 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            {text}
            <ArrowRight size={18} weight="bold" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

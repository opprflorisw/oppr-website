"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

const ctaOrbs = [
  {
    color: "rgba(224, 122, 61, 0.15)",
    size: "w-[300px] h-[300px]",
    position: "top-[-10%] left-[10%]",
    animation: "animate-float-slow",
    blur: "blur-[60px]",
  },
  {
    color: "rgba(59, 130, 246, 0.12)",
    size: "w-[250px] h-[250px]",
    position: "bottom-[-10%] right-[10%]",
    animation: "animate-float-medium",
    blur: "blur-[50px]",
  },
];

export function AboutCTA() {
  return (
    <section className="gradient-mesh-cta noise-overlay section-padding relative overflow-hidden">
      <FloatingOrbs orbs={ctaOrbs} />

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center max-w-[600px] mx-auto">
          <h2 className="text-display-2 font-serif text-white mb-4">
            Ready to future-proof your Operations?
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-8">
            Discover how Oppr&apos;s integrated platform simplifies data capture, centralizes knowledge, and delivers the actionable intelligence you need to empower your team and drive real ROI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary bg-white rounded-lg border-2 border-white hover:bg-oppr-light transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-lg border-2 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all glass-dark"
            >
              Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

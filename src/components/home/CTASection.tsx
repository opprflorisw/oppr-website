"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

const features = [
  "No IT project required",
  "Deployed in weeks, not months",
  "ROI within 8 weeks",
];

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
  {
    color: "rgba(139, 92, 246, 0.08)",
    size: "w-[200px] h-[200px]",
    position: "top-[30%] right-[30%]",
    animation: "animate-float",
    blur: "blur-[40px]",
  },
];

export function CTASection() {
  return (
    <section className="gradient-mesh-cta noise-overlay section-padding relative overflow-hidden">
      {/* Floating orbs for depth */}
      <FloatingOrbs orbs={ctaOrbs} />

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center max-w-[640px] mx-auto">
          <h2 className="text-display-2 font-serif text-white mb-4">
            Ready to capture what your operators know?
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-8">
            See how Oppr can connect human knowledge to machine data in your
            operation. We&apos;ll show you exactly how it works&mdash;and how
            quickly you can start.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/demo"
              className="focus-ring inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary bg-white rounded-lg border-2 border-white hover:bg-oppr-light transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
            >
              Book a Demo
            </Link>
            <Link
              href="/insights"
              className="focus-ring inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-lg border-2 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all glass-dark"
            >
              Start with Insights
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
            {features.map((f) => (
              <span
                key={f}
                className="flex items-center gap-2 text-sm text-white/70 glass-dark px-4 py-2 rounded-full whitespace-nowrap"
              >
                <CheckCircle size={18} weight="fill" className="text-docs" />
                {f}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

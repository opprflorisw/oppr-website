"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const ctaOrbs = [
  {
    color: "rgba(255, 255, 255, 0.2)",
    size: "w-[350px] h-[350px]",
    position: "top-[-10%] left-[10%]",
    animation: "animate-float-slow",
    blur: "blur-[70px]",
  },
  {
    color: "rgba(224, 122, 61, 0.2)",
    size: "w-[280px] h-[280px]",
    position: "bottom-[-10%] right-[10%]",
    animation: "animate-float-medium",
    blur: "blur-[60px]",
  },
];

export function BlogCTA() {
  return (
    <section className="gradient-mesh-cta noise-overlay section-padding relative overflow-hidden">
      <FloatingOrbs orbs={ctaOrbs} />

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center max-w-[600px] mx-auto">
          <h2 className="text-display-2 font-serif text-white mb-4">
            Want to see Oppr in action?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Book a demo and discover how to capture the knowledge your team
            already has.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-secondary rounded-lg hover:bg-oppr-secondary/90 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-oppr-secondary/20"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all"
            >
              Contact Us
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

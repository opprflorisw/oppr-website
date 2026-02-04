"use client";

import Link from "next/link";
import { Lightbulb, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function InsightsCallout() {
  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <div className="relative rounded-2xl border-2 border-oppr-secondary/30 bg-white overflow-hidden border-gradient-animated">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left: Content */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:p-12">
              {/* Top row: label + icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oppr-secondary/15 to-oppr-secondary/5 flex items-center justify-center">
                  <Lightbulb size={22} weight="duotone" className="text-oppr-secondary" />
                </div>
                <p className="text-sm font-semibold text-oppr-secondary uppercase tracking-wider">
                  Don&apos;t know where to start?
                </p>
              </div>

              {/* Headline */}
              <h3 className="text-display-2 font-serif text-text-primary mb-4 max-w-[700px]">
                Every improvement starts with an insight.
                <br className="hidden md:block" />
                <span className="text-gradient-warm">
                  That&apos;s why we built Oppr Insights.
                </span>
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-8 max-w-[600px]">
                Your operators know things that never make it into a report.
                Oppr Insights captures feedback from everyone, analyzes the
                patterns, and shows you exactly where to start.
              </p>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Learn about Oppr Insights
                  <ArrowRight size={16} weight="bold" />
                </Link>

                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-oppr-secondary/10 to-amber-50 border border-oppr-secondary/20 hover:border-oppr-secondary/40 transition-all"
                >
                  <Sparkle size={16} weight="fill" className="text-oppr-secondary" />
                  <span className="text-sm font-semibold text-text-primary">
                    Start for{" "}
                    <span className="text-gradient-warm font-bold">Free</span>
                  </span>
                  <span className="text-xs text-text-muted">&mdash; no credit card needed</span>
                </Link>
              </div>
            </div>

            {/* Right: Decorative graphic */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative bg-gradient-to-br from-oppr-secondary/5 to-amber-50/50">
              <div className="relative w-48 h-48">
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full border-2 border-oppr-secondary/10 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="absolute inset-4 rounded-full border-2 border-oppr-secondary/15 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
                <div className="absolute inset-8 rounded-full border-2 border-oppr-secondary/20 animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-oppr-secondary to-amber-500 flex items-center justify-center shadow-lg">
                    <Lightbulb size={40} weight="fill" className="text-white" />
                  </div>
                </div>
              </div>
              {/* Floating dots */}
              <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-oppr-secondary/30 animate-bounce" style={{ animationDuration: "2s" }} />
              <div className="absolute bottom-12 left-8 w-2 h-2 rounded-full bg-amber-400/40 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
              <div className="absolute top-1/3 right-12 w-2 h-2 rounded-full bg-oppr-secondary/20 animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.8s" }} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

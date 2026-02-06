"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkle,
  MagnifyingGlass,
  ListChecks,
  GearSix,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function InsightsSpotlight() {
  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <div className="relative rounded-2xl border-2 border-oppr-secondary/30 bg-white overflow-hidden border-gradient-animated">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left: Content */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:p-12">
              {/* Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oppr-secondary/15 to-oppr-secondary/5 flex items-center justify-center">
                  <MagnifyingGlass
                    size={22}
                    weight="duotone"
                    className="text-oppr-secondary"
                  />
                </div>
                <p className="text-sm font-semibold text-oppr-secondary uppercase tracking-wider">
                  Operational Discovery
                </p>
              </div>

              {/* Headline */}
              <h3 className="text-display-2 font-serif text-text-primary mb-4 max-w-[700px]">
                Every improvement starts with a gut feeling.
                <br className="hidden md:block" />
                <span className="text-gradient-warm">
                  Oppr Insights helps you formalize it.
                </span>
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-8 max-w-[600px]">
                Your team already senses what needs to change. Oppr Insights
                gives everyone a voice — asynchronously, in any language — and
                lets AI structure loose ideas into clear priorities. No meetings.
                No forms. Just structured discovery.
              </p>

              {/* Two-step visual */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oppr-secondary/15 to-oppr-secondary/5 flex items-center justify-center shrink-0">
                    <ListChecks
                      size={22}
                      weight="duotone"
                      className="text-oppr-secondary"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary mb-0.5">
                      1. Discover
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Give everyone a voice — capture ideas, observations, and expertise
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oppr-secondary/15 to-oppr-secondary/5 flex items-center justify-center shrink-0">
                    <GearSix
                      size={22}
                      weight="duotone"
                      className="text-oppr-secondary"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary mb-0.5">
                      2. Execute
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Move to the execution platform to act on what you discovered
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl focus-ring"
                >
                  Start with Insights
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Right: Decorative graphic */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative bg-gradient-to-br from-oppr-secondary/5 to-amber-50/50">
              <div className="relative w-48 h-48">
                {/* Pulsing rings — soft rhythmic pulse */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-oppr-secondary/15"
                  style={{ animation: "pulse-soft 3s ease-in-out infinite" }}
                />
                <div
                  className="absolute inset-4 rounded-full border-2 border-oppr-secondary/20"
                  style={{ animation: "pulse-soft 3s ease-in-out 0.5s infinite" }}
                />
                <div
                  className="absolute inset-8 rounded-full border-2 border-oppr-secondary/25"
                  style={{ animation: "pulse-soft 3s ease-in-out 1s infinite" }}
                />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-oppr-secondary to-amber-500 flex items-center justify-center shadow-lg">
                    <MagnifyingGlass
                      size={40}
                      weight="fill"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              {/* Floating dots */}
              <div
                className="absolute top-8 right-8 w-3 h-3 rounded-full bg-oppr-secondary/30 animate-bounce"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute bottom-12 left-8 w-2 h-2 rounded-full bg-amber-400/40 animate-bounce"
                style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
              />
              <div
                className="absolute top-1/3 right-12 w-2 h-2 rounded-full bg-oppr-secondary/20 animate-bounce"
                style={{ animationDuration: "3s", animationDelay: "0.8s" }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

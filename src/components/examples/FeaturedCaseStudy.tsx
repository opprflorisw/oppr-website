"use client";

import Link from "next/link";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function FeaturedCaseStudy() {
  return (
    <SectionWrapper bg="white">
      <AnimatedSection>
        <div className="relative rounded-2xl border-2 border-oppr-secondary/30 bg-gradient-to-br from-oppr-secondary/5 to-white p-8 md:p-10 overflow-hidden">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} weight="fill" className="text-oppr-secondary" />
            <span className="text-sm font-bold text-oppr-secondary uppercase tracking-wider">
              Featured Case Study
            </span>
          </div>

          <h3 className="text-display-2 font-serif text-text-primary mb-4">
            Saving the &ldquo;Golden Recipe&rdquo;
          </h3>

          <p className="text-text-secondary leading-relaxed mb-4 max-w-[700px]">
            A PVC pipe manufacturer was losing their &ldquo;golden recipe&rdquo;&mdash;the
            specific combination of settings, timing, and adjustments that
            produced perfect output. Only two operators knew it. One was retiring
            in 6 months.
          </p>

          <p className="text-text-secondary leading-relaxed mb-6 max-w-[700px]">
            Using LOGS, both operators captured their knowledge in 20-second
            voice logs while they worked. IDA correlated their observations with
            machine data, revealing patterns no documentation had ever captured.
            DOCS created living procedures that helped new operators achieve
            consistent quality within weeks instead of months.
          </p>

          <Link
            href="/how-it-works#case-study"
            className="inline-flex items-center gap-2 text-sm font-semibold text-oppr-primary hover:gap-3 transition-all"
          >
            Read the full case study
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

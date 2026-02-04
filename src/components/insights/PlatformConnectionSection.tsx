"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Notebook,
  Robot,
  FileText,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";
import type { Icon } from "@phosphor-icons/react";

interface Module {
  icon: Icon;
  name: string;
  highlighted?: boolean;
}

const modules: Module[] = [
  { icon: Lightbulb, name: "Insights", highlighted: true },
  { icon: Notebook, name: "LOGS" },
  { icon: Robot, name: "IDA" },
  { icon: FileText, name: "DOCS" },
];

export function PlatformConnectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: text */}
        <AnimatedSection direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
            Ready for More?
          </p>
          <h2 className="text-display-2 font-serif text-text-primary mb-5">
            Oppr Insights &rarr; Full Platform
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Oppr Insights is a standalone product&mdash;but it&apos;s also your
            entry point to the complete Digital Operator Platform. When
            you&apos;re ready to capture knowledge continuously, investigate
            issues with AI, and preserve expertise systematically, the full
            platform awaits.
          </p>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore the Platform
            <ArrowRight size={18} weight="bold" />
          </Link>
        </AnimatedSection>

        {/* Right: module cards */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {modules.map((mod, i) => {
            const IconComponent = mod.icon;
            return (
              <motion.div key={i} variants={waveChild} className="contents">
                {i > 0 && (
                  <ArrowRight
                    size={20}
                    weight="bold"
                    className="text-text-tertiary shrink-0"
                  />
                )}
                <div
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border bg-white shadow-sm min-w-[100px] ${
                    mod.highlighted
                      ? "border-oppr-primary border-2 shadow-md"
                      : "border-border-light"
                  }`}
                >
                  <IconComponent
                    size={28}
                    weight="duotone"
                    className={
                      mod.highlighted ? "text-oppr-primary" : "text-text-secondary"
                    }
                  />
                  <span
                    className={`text-sm font-semibold ${
                      mod.highlighted ? "text-oppr-primary" : "text-text-primary"
                    }`}
                  >
                    {mod.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

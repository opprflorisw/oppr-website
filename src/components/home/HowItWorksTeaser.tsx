"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Microphone,
  MagnifyingGlass,
  BookOpen,
  ArrowRight,
  ArrowBendUpLeft,
} from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, waveChild } from "@/lib/animations";

const modules = [
  {
    icon: Microphone,
    label: "LOGS",
    tagline: "Capture",
    color: "text-logs",
    bg: "bg-logs/10",
    border: "border-logs/20",
    description:
      "Operators speak what they notice—voice, photos, any language. Zero friction.",
  },
  {
    icon: MagnifyingGlass,
    label: "IDA",
    tagline: "Investigate",
    color: "text-ida",
    bg: "bg-ida/10",
    border: "border-ida/20",
    description:
      "Ask questions in plain language. Get answers from human + machine data combined.",
  },
  {
    icon: BookOpen,
    label: "DOCS",
    tagline: "Preserve",
    color: "text-docs",
    bg: "bg-docs/10",
    border: "border-docs/20",
    description:
      "Turn validated insights into living documentation that stays current.",
  },
];

export function HowItWorksTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="The Platform"
        title="Three modules. One closed loop."
        subtitle="From capture to investigation to action—and back again. Each module feeds the next."
      />

      {/* Module strip */}
      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {modules.map((mod, i) => (
          <motion.div
            key={mod.label}
            variants={waveChild}
            className={`relative p-6 bg-white rounded-2xl border ${mod.border} border-border-light hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center mb-4`}
            >
              <mod.icon size={24} weight="duotone" className={mod.color} />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span
                className={`text-xs font-bold tracking-wider uppercase ${mod.color}`}
              >
                {mod.label}
              </span>
              <span className="text-xs text-text-muted">{mod.tagline}</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {mod.description}
            </p>

            {/* Connector arrow (desktop) */}
            {i < modules.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-border-medium">
                <ArrowRight size={16} weight="bold" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Flow indicator + CTA */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {["LOGS", "IDA", "DOCS"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-bg-subtle text-xs font-bold text-text-primary tracking-wide">
                {label}
              </div>
              {i < 2 && (
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="text-border-medium"
                />
              )}
            </div>
          ))}
          <div className="text-border-medium ml-1">
            <ArrowBendUpLeft size={14} weight="bold" />
          </div>
        </div>

        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          See How It Works
          <ArrowRight size={18} weight="bold" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

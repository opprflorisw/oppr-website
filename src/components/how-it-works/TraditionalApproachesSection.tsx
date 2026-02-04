"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClockCountdown,
  MagnifyingGlass,
  UserMinus,
  ArrowsClockwise,
  X,
  ArrowRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

interface ApproachRow {
  problem: string;
  icon: Icon;
  tried: string;
  whyFailed: string;
  opprDifference: string;
}

const rows: ApproachRow[] = [
  {
    problem: "Knowledge disappears at shift change",
    icon: ClockCountdown,
    tried: "Paper logbooks, shift handover forms",
    whyFailed: "Takes too long, inconsistent, nobody reads them",
    opprDifference:
      "20-second voice capture. AI structures and tags automatically. Searchable forever.",
  },
  {
    problem: "Root cause takes weeks to find",
    icon: MagnifyingGlass,
    tried: "Manual data pulls, meetings, tribal knowledge",
    whyFailed: "Human context isn't in any system. Data exists in silos.",
    opprDifference:
      "Unified timeline connects human observations to machine data. Ask questions in plain language.",
  },
  {
    problem: "Expertise walks out at retirement",
    icon: UserMinus,
    tried: "Documentation projects, knowledge transfers",
    whyFailed: "Results in PDF graveyards nobody reads. Can't capture tacit knowledge in interviews.",
    opprDifference:
      "Knowledge captured continuously in the flow of work. Always current. Always accessible.",
  },
  {
    problem: "Improvements don't stick after Kaizen",
    icon: ArrowsClockwise,
    tried: "SOPs, training programs, audits",
    whyFailed: "Documentation doesn't match reality. Procedures written by people who don't do the work.",
    opprDifference:
      "Living documentation that updates based on what actually works. PDCA that actually cycles.",
  },
];

export function TraditionalApproachesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Why Traditional Approaches Fail"
        title={
          <>
            You&apos;ve Tried This Before.
            <br />
            Here&apos;s Why It Didn&apos;t Work.
          </>
        }
        subtitle="Every manufacturer has attempted to capture operator knowledge. The approaches fail for predictable reasons."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1080px] mx-auto"
      >
        {rows.map((row, i) => {
          const IconComp = row.icon;
          return (
            <motion.div
              key={i}
              variants={waveChild}
              className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden"
            >
              {/* Card header — problem */}
              <div className="px-6 pt-6 pb-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-oppr-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                  <IconComp
                    size={22}
                    weight="duotone"
                    className="text-oppr-primary"
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-text-primary leading-snug">
                    {row.problem}
                  </h4>
                </div>
              </div>

              {/* What you tried → Why it failed */}
              <div className="px-6 pb-4">
                <div className="bg-bg-subtle rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <X
                      size={14}
                      weight="bold"
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-0.5">
                        What you tried
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {row.tried}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <X
                      size={14}
                      weight="bold"
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-0.5">
                        Why it failed
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {row.whyFailed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Oppr difference */}
              <div className="px-6 pb-6">
                <div className="bg-oppr-secondary/6 border border-oppr-secondary/15 rounded-xl p-4">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="text-oppr-secondary mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-oppr-secondary mb-0.5">
                        With Oppr
                      </p>
                      <p className="text-sm text-text-primary font-medium leading-relaxed">
                        {row.opprDifference}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}

"use client";

import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  Wrench,
  Gear,
  ChartBar,
  Buildings,
  ArrowRight,
} from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP } from "@/lib/animations";

const audiences = [
  {
    icon: Wrench,
    title: "Operators & Technicians",
    text: "Speak it. Snap it. Done. Log observations in 20 seconds — in any language — without stopping work. Your knowledge finally makes it into the system, and the system gives you answers back when you need them.",
    accentColor: "from-oppr-secondary/20 to-oppr-secondary/5",
  },
  {
    icon: Gear,
    title: "Engineers & Maintenance",
    text: "Find root causes in minutes, not weeks. IDA correlates operator observations with machine data so you stop guessing and start fixing. Every shift handover, every near-miss, every \"that sounds different\" — already captured and searchable.",
    accentColor: "from-ida/20 to-ida/5",
  },
  {
    icon: ChartBar,
    title: "Plant Managers & CI Leaders",
    text: "See what's really happening on the floor — not just what the dashboards show. Turn Gemba walks into continuous data streams. Track whether improvements actually stick. PDCA cycles that finally cycle.",
    accentColor: "from-docs/20 to-docs/5",
  },
  {
    icon: Buildings,
    title: "Directors & VP Operations",
    text: "De-risk your operation. Knowledge no longer walks out the door when experts retire. Cross-site patterns become visible. Improvement ROI is measurable. The human data layer becomes a strategic asset — not a blind spot.",
    accentColor: "from-oppr-primary/20 to-oppr-primary/5",
  },
];

const waveChild: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

export function AudiencesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Who It's For"
        title="Built for Every Role on the Floor"
        subtitle="Process or discrete. SME or enterprise. It doesn't matter. If your operation runs on people and machines, Oppr adds the layer that connects them."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {audiences.map((a) => (
          <motion.div key={a.title} variants={waveChild}>
            <div className="flex flex-col p-6 bg-white rounded-2xl border border-border-light h-full">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.accentColor} flex items-center justify-center mb-4`}>
                <a.icon
                  size={22}
                  weight="duotone"
                  className="text-oppr-primary"
                />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {a.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                {a.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <Link
          href="/examples"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg border-2 border-oppr-primary hover:bg-oppr-dark hover:border-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-glow-primary"
        >
          See Use Cases
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary rounded-lg border-2 border-transparent hover:bg-bg-subtle transition-all"
        >
          See How It Works
          <ArrowRight size={18} weight="bold" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

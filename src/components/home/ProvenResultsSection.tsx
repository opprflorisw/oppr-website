"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP } from "@/lib/animations";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "%",
    label: "Scrap Reduction",
    description: "Observations connected to quality data, not lost at shift change",
    accentColor: "#E07A3D",
  },
  {
    value: 90,
    suffix: "%",
    label: "Less Logging Time",
    description: "20 seconds, not 8 minutes",
    accentColor: "#3B82F6",
  },
  {
    value: 35,
    suffix: "%",
    label: "Downtime Reduction",
    description: "Root cause in hours, not weeks",
    accentColor: "#10B981",
  },
  {
    value: 8,
    suffix: " weeks",
    prefix: "<",
    label: "Time to ROI",
    description: "Start small, prove fast — no IT project required",
    accentColor: "#8B5CF6",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

export function ProvenResultsSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Results"
        title="Proven Results. Rapid Deployment."
        subtitle="Real outcomes from real manufacturing operations. These numbers come from companies that started small and proved value within weeks."
      />

      <motion.div
        ref={gridRef}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardVariant}
            className="relative p-7 bg-white rounded-2xl border border-border-light hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group overflow-hidden text-center"
            style={{ borderLeft: `4px solid ${stat.accentColor}` }}
          >

            <div className="text-3xl lg:text-4xl font-mono font-bold text-oppr-primary mb-2">
              {stat.prefix && <span>{stat.prefix}</span>}
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>

            <h3 className="text-base font-semibold text-text-primary mb-2">
              {stat.label}
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </SectionWrapper>
  );
}

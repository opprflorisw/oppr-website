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
  },
  {
    value: 90,
    suffix: "%",
    label: "Less Logging Time",
    description: "20 seconds, not 8 minutes",
  },
  {
    value: 35,
    suffix: "%",
    label: "Downtime Reduction",
    description: "Root cause in hours, not weeks",
  },
  {
    value: 8,
    suffix: " weeks",
    prefix: "<",
    label: "Time to ROI",
    description: "Start small, prove fast — no IT project required",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
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
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardVariant}
            className="h-full"
          >
            <motion.div
              whileHover={{
                y: -5,
                borderColor: "rgba(224, 122, 61, 0.4)", // oppr-secondary color
                boxShadow: "0 10px 30px -10px rgba(224, 122, 61, 0.15)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-slate-200 h-full transition-all duration-300 group"
            >
              {/* Subtle top indicator that turns orange on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-100 rounded-b-full transition-colors duration-300 group-hover:bg-oppr-secondary" />

              <div className="text-4xl font-bold text-slate-900 mb-3 tabular-nums tracking-tight group-hover:text-oppr-secondary transition-colors duration-300">
                {stat.prefix && <span className="text-2xl mr-0.5 align-middle text-slate-400 group-hover:text-oppr-secondary/60">{stat.prefix}</span>}
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2">
                {stat.label}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}


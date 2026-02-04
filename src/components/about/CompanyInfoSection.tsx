"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Users, Rocket } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

const infoItems = [
  { icon: Calendar, label: "Founded", value: "2024" },
  { icon: MapPin, label: "Headquarters", value: "The Hague, Netherlands" },
  { icon: Users, label: "Team", value: "Growing" },
  { icon: Rocket, label: "Funding", value: "VC Funded" },
];

export function CompanyInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        {infoItems.map((item) => (
          <motion.div
            key={item.label}
            variants={waveChild}
            className="bg-white rounded-xl border border-border-light p-6 text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-oppr-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon size={24} weight="duotone" className="text-oppr-primary" />
            </div>
            <p className="text-sm text-text-secondary mb-1">{item.label}</p>
            <p className="text-lg font-semibold text-text-primary">
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection className="max-w-[700px] mx-auto">
        <div className="bg-white rounded-xl border border-border-light p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-3">
            Industry Focus
          </p>
          <p className="text-text-secondary leading-relaxed">
            We focus exclusively on manufacturing&mdash;discrete and process. Our
            deep domain expertise means we understand the reality of factory
            floors, not just the theory.
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

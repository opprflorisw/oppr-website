"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  UsersFour,
  Feather,
  HardHat,
  Graph,
  Handshake,
  Target,
  Eye,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

interface Value {
  number: string;
  title: string;
  description: string;
  icon: Icon;
  color: string;
}

const values: Value[] = [
  {
    number: "01",
    title: "Operators First",
    description:
      "Technology should adapt to how people work, not the other way around. If operators won't use it voluntarily, we've failed.",
    icon: UsersFour,
    color: "#E07A3D",
  },
  {
    number: "02",
    title: "Zero Friction",
    description:
      "Capturing knowledge must be faster than forgetting it. If it takes effort, it won't happen. We obsess over removing every barrier.",
    icon: Feather,
    color: "#3B82F6",
  },
  {
    number: "03",
    title: "Practical Over Theoretical",
    description:
      "We build for real factory floors, not conference room demos. Everything we ship has to work in noisy, busy, real-world conditions.",
    icon: HardHat,
    color: "#10B981",
  },
  {
    number: "04",
    title: "Knowledge Compounds",
    description:
      "Individual observations become organizational intelligence. The system gets smarter over time. That's the goal.",
    icon: Graph,
    color: "#8B5CF6",
  },
  {
    number: "05",
    title: "Honest Technology",
    description:
      "AI should augment human intelligence, not replace it. We're transparent about what AI does and doesn't do.",
    icon: Handshake,
    color: "#1E3A5F",
  },
  {
    number: "06",
    title: "Measured Impact",
    description:
      "If we can't measure the value, we haven't delivered it. Every deployment should demonstrate concrete, quantifiable results.",
    icon: Target,
    color: "#EC4899",
  },
  {
    number: "07",
    title: "Humans Are Sensors",
    description:
      "Humans are the most advanced sensors in any factory. They see, hear, smell, and feel things no instrument can measure. Our job is to turn those sensors into a datasource.",
    icon: Eye,
    color: "#F59E0B",
  },
];

function ValueCard({ value }: { value: Value }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={waveChild}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="bg-white rounded-2xl border border-border-light p-7 transition-all duration-300 h-full flex flex-col"
        style={{
          boxShadow: hovered
            ? `0 8px 32px ${value.color}12, 0 2px 8px rgba(0,0,0,0.04)`
            : "0 1px 4px rgba(0,0,0,0.03)",
          borderColor: hovered ? `${value.color}30` : undefined,
        }}
      >
        {/* Top row: icon + number */}
        <div className="flex items-center justify-between mb-5">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${value.color}0D` }}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <value.icon
              size={22}
              weight="duotone"
              style={{ color: value.color }}
            />
          </motion.div>
          <span
            className="text-sm font-bold tabular-nums transition-colors duration-300"
            style={{ color: hovered ? `${value.color}90` : "rgba(0,0,0,0.12)" }}
          >
            {value.number}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-text-primary mb-2">
          {value.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {value.description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="mt-5 h-[2px] rounded-full"
          style={{ backgroundColor: value.color }}
          initial={{ width: 0 }}
          animate={{ width: hovered ? "40px" : "24px" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader label="What We Believe" title="Our Values" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {values.map((value) => (
          <ValueCard key={value.number} value={value} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

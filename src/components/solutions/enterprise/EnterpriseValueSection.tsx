"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, Equals } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, morphIn } from "@/lib/animations";

interface PillGroupProps {
  title: string;
  pills: string[];
  pillColor: string;
  borderColor: string;
  bgColor: string;
}

function PillGroup({ title, pills, pillColor, borderColor, bgColor }: PillGroupProps) {
  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} p-5 flex-1`}>
      <h4 className="font-semibold text-text-primary text-sm mb-3 text-center">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2 justify-center">
        {pills.map((pill) => (
          <span
            key={pill}
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${pillColor}`}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EnterpriseValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-3">
          How Oppr Integrates
        </h3>
        <p className="text-lg text-text-secondary text-center max-w-[650px] mx-auto mb-12">
          Oppr isn&apos;t replacing your technology investments. It&apos;s filling the gap
          that makes them more valuable.
        </p>
      </AnimatedSection>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col md:flex-row items-center gap-4 max-w-[960px] mx-auto"
      >
        {/* Your Existing Stack */}
        <motion.div variants={morphIn} className="flex-1 w-full">
          <PillGroup
            title="Your Existing Stack"
            pills={["Historians", "MES", "SCADA", "CMMS", "Analytics"]}
            pillColor="bg-ida/10 text-ida"
            borderColor="border-ida/20"
            bgColor="bg-ida/5"
          />
        </motion.div>

        {/* Plus icon */}
        <motion.div
          variants={morphIn}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border-light shadow-sm flex-shrink-0"
        >
          <Plus size={20} weight="bold" className="text-text-secondary" />
        </motion.div>

        {/* Oppr (The Missing Layer) */}
        <motion.div variants={morphIn} className="flex-1 w-full">
          <PillGroup
            title="Oppr (The Missing Layer)"
            pills={["Human Observations", "Context", "Expertise", 'The "Why"']}
            pillColor="bg-oppr-secondary/10 text-oppr-secondary"
            borderColor="border-oppr-secondary/20"
            bgColor="bg-oppr-secondary/5"
          />
        </motion.div>

        {/* Equals icon */}
        <motion.div
          variants={morphIn}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border-light shadow-sm flex-shrink-0"
        >
          <Equals size={20} weight="bold" className="text-text-secondary" />
        </motion.div>

        {/* Complete Picture */}
        <motion.div variants={morphIn} className="flex-1 w-full">
          <PillGroup
            title="Complete Picture"
            pills={["What + Why", "Correlated", "Queryable"]}
            pillColor="bg-docs/10 text-docs"
            borderColor="border-docs/20"
            bgColor="bg-docs/5"
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

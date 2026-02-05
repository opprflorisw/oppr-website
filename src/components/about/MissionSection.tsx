"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UsersThree, GearSix, ChartLineUp } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

interface Pillar {
  title: string;
  desc: string;
  icon: Icon;
  color: string; // hex
}

const pillars: Pillar[] = [
  {
    title: "Empower Your People",
    desc: "Our intuitive tools give operators real-time insights and make it easy to capture and share vital shop-floor knowledge, turning every team member into an expert.",
    icon: UsersThree,
    color: "#E07A3D", // logs
  },
  {
    title: "Enhance Your Assets",
    desc: "Make your existing machinery smarter. We layer modern AI onto your current equipment to boost uptime and extend asset life, helping you avoid costly replacements.",
    icon: GearSix,
    color: "#3B82F6", // ida
  },
  {
    title: "Elevate Your Performance",
    desc: "Our AI-powered recommendations help you optimize processes, reduce waste, and consistently hit production targets to drive continuous improvement 24/7.",
    icon: ChartLineUp,
    color: "#10B981", // docs
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={waveChild}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 border border-border-light transition-all duration-300 flex gap-5"
        style={{
          boxShadow: hovered
            ? `0 8px 32px ${pillar.color}12, 0 2px 8px rgba(0,0,0,0.03)`
            : "0 1px 4px rgba(0,0,0,0.03)",
          borderColor: hovered ? `${pillar.color}30` : undefined,
        }}
      >
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${pillar.color}0D` }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <pillar.icon
            size={24}
            weight="duotone"
            style={{ color: pillar.color }}
          />
        </motion.div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1.5">
            {pillar.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <AnimatedSection>
          <h2 className="text-display-2 font-serif text-text-primary mb-6">
            Digitizing Your Shop Floor, Future-Proofing Your Manufacturing
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Our mission is to empower SME manufacturers to stay competitive. We
            digitize your shop floor, make your assets future-proof, and turn
            your data and team knowledge into a powerful operational advantage.
          </p>
          <div className="p-6 bg-oppr-primary/5 rounded-2xl border border-oppr-primary/10 italic text-oppr-primary relative">
            <span className="absolute -top-4 -left-2 text-6xl opacity-10 font-serif">
              &ldquo;
            </span>
            &ldquo;We created Oppr.ai so you never have to guess what&apos;s
            happening on your own shop-floor again. Imagine a colleague who never
            sleeps—and always knows.&rdquo;
            <div className="mt-4 font-sans font-semibold text-sm not-italic">
              &mdash; Floris Wyers, Founder &amp; CEO
            </div>
          </div>
        </AnimatedSection>

        {/* Right — Pillars */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-5"
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} pillar={pillar} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

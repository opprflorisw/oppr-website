"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Factory,
  Buildings,
  ChartLineUp,
  ArrowRight,
} from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, waveChild } from "@/lib/animations";

const solutions = [
  {
    icon: Factory,
    title: "SME Manufacturers",
    tagline:
      "Your first real operational intelligence system. No IT department required.",
    href: "/solutions/sme",
    gradient: "from-oppr-secondary to-[#c45a20]",
  },
  {
    icon: Buildings,
    title: "Enterprise",
    tagline:
      "The human data layer your tech stack is missing. Integrates with your historians, MES, and analytics.",
    href: "/solutions/enterprise",
    gradient: "from-ida to-[#1d4ed8]",
  },
  {
    icon: ChartLineUp,
    title: "Consultants",
    tagline:
      "The infrastructure that makes your methodologies stick. Leave systems, not just playbooks.",
    href: "/solutions/consultants",
    gradient: "from-accent-purple to-[#6d28d9]",
  },
  // {
  //   icon: TrendUp,
  //   title: "Private Equity",
  //   tagline:
  //     "Systematic operational value creation across your portfolio. De-risk key person dependencies.",
  //   href: "/solutions/private-equity",
  //   gradient: "from-docs to-[#047857]",
  // },
  // {
  //   icon: Gear,
  //   title: "Equipment OEMs",
  //   tagline:
  //     "Pre-installed intelligence for the equipment you sell. New service revenue.",
  //   href: "/solutions/oem",
  //   gradient: "from-oppr-primary to-oppr-dark",
  // },
];

const headerOrbs = [
  {
    color: "rgba(30, 58, 95, 0.1)",
    size: "w-[350px] h-[350px]",
    position: "top-[-10%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[70px]",
  },
  {
    color: "rgba(224, 122, 61, 0.08)",
    size: "w-[250px] h-[250px]",
    position: "bottom-[-10%] right-[5%]",
    animation: "animate-float-medium",
    blur: "blur-[60px]",
  },
];

export default function SolutionsPage() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <>
      <header className="gradient-mesh-hero noise-overlay bg-dot-grid-subtle relative overflow-hidden py-28 md:py-36">
        <FloatingOrbs orbs={headerOrbs} />
        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center max-w-[720px] mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
              Solutions
            </p>
            <h1 className="text-display-1 font-serif text-text-primary mb-6">
              One Platform, Many Contexts
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto">
              The operational excellence execution platform adapts to your
              context&mdash;whether you&apos;re an SME manufacturer, enterprise,
              or consultant.
            </p>
          </AnimatedSection>
        </div>
      </header>

      <SectionWrapper bg="white">
        <motion.div
          ref={gridRef}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((s) => (
            <motion.div key={s.title} variants={waveChild}>
              <Link href={s.href} className="block h-full group">
                <GlowCard
                  glowColor="rgba(30, 58, 95, 0.1)"
                  className="p-7 h-full"
                  hoverLift
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5`}
                  >
                    <s.icon size={24} weight="fill" className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary mb-2">
                    {s.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {s.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-oppr-primary group-hover:gap-2.5 transition-all">
                    Learn more
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <section className="gradient-mesh-cta noise-overlay relative overflow-hidden section-padding">
        <FloatingOrbs orbs={[
          {
            color: "rgba(224, 122, 61, 0.12)",
            size: "w-[300px] h-[300px]",
            position: "top-[-20%] left-[10%]",
            animation: "animate-float-slow",
            blur: "blur-[70px]",
          },
          {
            color: "rgba(59, 130, 246, 0.10)",
            size: "w-[250px] h-[250px]",
            position: "bottom-[-15%] right-[5%]",
            animation: "animate-float-medium",
            blur: "blur-[60px]",
          },
        ]} />
        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center">
            <h2 className="text-display-2 font-serif text-white mb-4">
              Not sure which solution fits?
            </h2>
            <p className="text-white/70 mb-8 max-w-[500px] mx-auto">
              Let&apos;s talk. We&apos;ll help you figure out whether Oppr makes
              sense for your specific situation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary bg-white rounded-lg hover:bg-white/90 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white border-2 border-white/20 rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Us
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

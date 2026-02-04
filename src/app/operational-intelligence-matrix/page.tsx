"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, X } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { staggerContainer, waveChild, EASE_SNAP } from "@/lib/animations";

const headerOrbs = [
  {
    color: "rgba(30, 58, 95, 0.12)",
    size: "w-[400px] h-[400px]",
    position: "top-[-15%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[80px]",
  },
  {
    color: "rgba(224, 122, 61, 0.1)",
    size: "w-[300px] h-[300px]",
    position: "bottom-[-10%] right-[5%]",
    animation: "animate-float-medium",
    blur: "blur-[70px]",
  },
];

/*
  Matrix layout:

         Low Data Richness    |    High Data Richness
         ─────────────────────┼─────────────────────
  High   Busy Work (amber)    |  Operational Intel (green)
  Exec   top-left             |  top-right
         ─────────────────────┼─────────────────────
  Low    Blind Spot (red)     |  Analysis Paralysis (blue)
  Exec   bottom-left          |  bottom-right

  Arrow on left:  ↑ Execution (label centered on arrow, white bg pill)
  Arrow on bottom: → Data Richness (label centered on arrow, white bg pill)
*/

const quadrants = {
  blindSpot: {
    title: "Blind Spot",
    position: "Low Data \u00D7 Low Execution",
    description:
      "You don\u2019t know what you don\u2019t know. Critical knowledge lives in people\u2019s heads. When they leave, it\u2019s gone. Problems repeat because nobody connects the dots.",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    dotColor: "bg-red-400",
  },
  busyWork: {
    title: "Busy Work",
    position: "Low Data \u00D7 High Execution",
    description:
      "You\u2019re executing improvement programs but without real data. Kaizen events, 5S, Lean projects\u2014but based on gut feel, not evidence. Improvements don\u2019t stick.",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    dotColor: "bg-amber-400",
  },
  analysisParalysis: {
    title: "Analysis Paralysis",
    position: "High Data \u00D7 Low Execution",
    description:
      "You have dashboards, sensors, historians\u2014terabytes of machine data. But insights don\u2019t reach the shop floor. Data stays in reports. Nothing changes.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    dotColor: "bg-blue-400",
  },
  operationalIntelligence: {
    title: "Operational Intelligence",
    position: "High Data \u00D7 High Execution",
    description:
      "Human knowledge and machine data are connected. Insights flow to the point of work. Improvements stick because documentation reflects reality. This is where Oppr takes you.",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-400",
  },
};

type ModuleKey = "LOGS" | "IDA" | "DOCS";

interface ModuleOverlay {
  module: ModuleKey;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof ArrowRight;
  arrowDirection: "right" | "up" | "diagonal";
  title: string;
  description: string;
  from: string;
  to: string;
}

const moduleOverlays: ModuleOverlay[] = [
  {
    module: "LOGS",
    color: "text-logs",
    bgColor: "bg-logs/5",
    borderColor: "border-logs/30",
    icon: ArrowRight,
    arrowDirection: "right",
    title: "Increase Data Richness",
    description:
      "LOGS captures the human knowledge that\u2019s currently invisible \u2014 operator observations, contextual notes, photos, voice logs. It moves you from Low Data to High Data by adding the human data layer alongside your machine data.",
    from: "Low Data",
    to: "High Data",
  },
  {
    module: "IDA",
    color: "text-ida",
    bgColor: "bg-ida/5",
    borderColor: "border-ida/30",
    icon: ArrowUp,
    arrowDirection: "up",
    title: "Increase Execution",
    description:
      "IDA correlates human observations with machine data to surface patterns, accelerate root cause analysis, and deliver actionable insights. It moves you from Low Execution to High Execution by turning data into decisions.",
    from: "Low Execution",
    to: "High Execution",
  },
  {
    module: "DOCS",
    color: "text-docs",
    bgColor: "bg-docs/5",
    borderColor: "border-docs/30",
    icon: ArrowUpRight,
    arrowDirection: "diagonal",
    title: "Sustain & Scale",
    description:
      "DOCS ensures improvements stick by making knowledge accessible at the point of work. Living documentation that reflects reality, not what someone wrote three years ago. It moves you diagonally toward Operational Intelligence.",
    from: "Current State",
    to: "Operational Intelligence",
  },
];

function QuadrantCard({
  q,
  highlight = false,
}: {
  q: (typeof quadrants)[keyof typeof quadrants];
  highlight?: boolean;
}) {
  return (
    <motion.div
      variants={waveChild}
      className={`rounded-xl border-2 ${q.borderColor} ${q.bgColor} p-5 ${highlight ? "ring-2 ring-emerald-300/50" : ""}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${q.dotColor}`} />
        <h3 className={`text-base font-bold ${q.textColor}`}>{q.title}</h3>
      </div>
      <p className="text-xs text-text-muted mb-2">{q.position}</p>
      <p className="text-sm text-text-secondary leading-relaxed">
        {q.description}
      </p>
    </motion.div>
  );
}

function ModuleOverlayPanel({
  overlay,
  onClose,
}: {
  overlay: ModuleOverlay;
  onClose: () => void;
}) {
  const IconComp = overlay.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-xl"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl" />

      {/* Arrow visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {overlay.arrowDirection === "right" && (
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-logs" />
              </marker>
            </defs>
            <line x1="60" y1="100" x2="340" y2="100" className="stroke-logs" strokeWidth="6" markerEnd="url(#arrowR)" />
          </svg>
        )}
        {overlay.arrowDirection === "up" && (
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrowU" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-ida" />
              </marker>
            </defs>
            <line x1="200" y1="180" x2="200" y2="30" className="stroke-ida" strokeWidth="6" markerEnd="url(#arrowU)" />
          </svg>
        )}
        {overlay.arrowDirection === "diagonal" && (
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrowD" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-docs" />
              </marker>
            </defs>
            <line x1="60" y1="170" x2="340" y2="30" className="stroke-docs" strokeWidth="6" markerEnd="url(#arrowD)" />
          </svg>
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: EASE_SNAP }}
        className={`relative z-10 max-w-[440px] mx-4 p-6 rounded-2xl border-2 ${overlay.borderColor} ${overlay.bgColor} shadow-elevated`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
          aria-label="Close overlay"
        >
          <X size={14} weight="bold" className="text-text-muted" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
            <IconComp size={20} weight="bold" className={overlay.color} />
          </div>
          <div>
            <span className={`text-sm font-bold ${overlay.color}`}>
              {overlay.module}
            </span>
            <span className="block text-xs text-text-muted">
              {overlay.from} &rarr; {overlay.to}
            </span>
          </div>
        </div>

        <h4 className="text-base font-bold text-text-primary mb-2">
          {overlay.title}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {overlay.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function OperationalIntelligenceMatrixPage() {
  const matrixRef = useRef(null);
  const matrixInView = useInView(matrixRef, { once: true, margin: "-80px" });
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);

  const activeOverlay = moduleOverlays.find((m) => m.module === activeModule) ?? null;

  return (
    <>
      {/* Header */}
      <header className="gradient-mesh-hero noise-overlay relative overflow-hidden py-28 md:py-36">
        <FloatingOrbs orbs={headerOrbs} />
        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center max-w-[720px] mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
              Operational Intelligence Matrix
            </p>
            <h1 className="text-display-1 font-serif text-text-primary mb-6">
              Where Is Your Company?
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto">
              Most manufacturers are stuck in one of four quadrants. Understanding
              where you are is the first step to operational intelligence.
            </p>
          </AnimatedSection>
        </div>
      </header>

      {/* Matrix */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <motion.div
            ref={matrixRef}
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate={matrixInView ? "visible" : "hidden"}
            className="max-w-[900px] mx-auto mb-16"
          >
            <div className="flex gap-0">
              {/* Y-axis: arrow tight to grid, label pill centered on arrow */}
              <div className="w-10 flex-shrink-0 mr-2" />

              <div className="flex-1 flex flex-col">
                {/* Matrix grid with overlay container */}
                <div className="relative">
                  {/* Y-axis arrow — positioned absolutely to match grid height only */}
                  <div className="absolute top-0 bottom-0 -left-12 w-10 z-0">
                    {/* Arrow line */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-slate-300" />
                    {/* Arrowhead at top */}
                    <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-slate-400 z-10" />
                    {/* Label pill — centered vertically on arrow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
                        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider [writing-mode:vertical-lr] rotate-180 block">
                          Execution
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* Row 1: High Execution (top) */}
                    <div className="grid grid-cols-2 gap-4">
                      <QuadrantCard q={quadrants.busyWork} />
                      <QuadrantCard q={quadrants.operationalIntelligence} highlight={!activeOverlay} />
                    </div>

                    {/* Row 2: Low Execution (bottom) */}
                    <div className="grid grid-cols-2 gap-4">
                      <QuadrantCard q={quadrants.blindSpot} />
                      <QuadrantCard q={quadrants.analysisParalysis} />
                    </div>
                  </div>

                  {/* Module overlay — superimposed on the matrix */}
                  <AnimatePresence>
                    {activeOverlay && (
                      <ModuleOverlayPanel
                        key={activeOverlay.module}
                        overlay={activeOverlay}
                        onClose={() => setActiveModule(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* X-axis: arrow aligned under grid, label pill centered */}
                <div className="relative h-10 mt-2">
                  {/* Arrow line — full width of grid */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-slate-300" />
                  {/* Arrowhead at right */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-[-1px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-slate-400 z-10" />
                  {/* Label pill — centered horizontally on arrow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                      <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap">
                        Data Richness
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* How Oppr Moves You Forward */}
          <AnimatedSection className="max-w-[900px] mx-auto text-center">
            <h2 className="text-display-2 font-serif text-text-primary mb-3">
              How Oppr Moves You Forward
            </h2>
            <p className="text-text-secondary max-w-[640px] mx-auto leading-relaxed mb-8">
              Each module moves you along a specific axis of the matrix. Click to see how.
            </p>

            {/* Module buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {moduleOverlays.map((mod) => {
                const IconComp = mod.icon;
                const isActive = activeModule === mod.module;
                return (
                  <button
                    key={mod.module}
                    onClick={() => setActiveModule(isActive ? null : mod.module)}
                    className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${isActive
                        ? `${mod.borderColor} ${mod.bgColor} shadow-md`
                        : "border-border-light bg-white hover:border-border-medium"
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${isActive ? "bg-white" : "bg-slate-50"} flex items-center justify-center transition-colors`}>
                      <IconComp size={16} weight="bold" className={mod.color} />
                    </div>
                    <span className={`text-sm font-bold ${mod.color}`}>
                      {mod.module}
                    </span>
                  </button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-mesh-cta noise-overlay section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center max-w-[640px] mx-auto">
            <h2 className="text-display-2 font-serif text-white mb-4">
              Find out where you stand
            </h2>
            <p className="text-lg text-white/75 leading-relaxed mb-8">
              Book a demo to see how Oppr can move your organization toward
              operational intelligence&mdash;starting with a single production
              line.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary bg-white rounded-lg border-2 border-white hover:bg-oppr-light transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
              >
                Book a Demo
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-lg border-2 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all glass-dark"
              >
                See How It Works
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

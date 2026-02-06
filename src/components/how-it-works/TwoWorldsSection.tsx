"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Gear,
  GridFour,
  ChartLineUp,
  ChartBar,
  ClipboardText,
  FileText,
  Table,
  UsersThree,
  FileDoc,
  Clock,
  ChatText,
  GraduationCap,
  Microphone,
  MagnifyingGlass,
  BookOpen,
  Monitor,
  Wrench,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

/* ──────────────────────────── Data ──────────────────────────── */

interface Pill {
  label: string;
  icon: Icon;
  top: string;
  left: string;
}

const dashboardPills: Pill[] = [
  { label: "MES", icon: Gear, top: "18%", left: "18%" },
  { label: "SCADA", icon: GridFour, top: "18%", left: "62%" },
  { label: "OEE Dashboard", icon: ChartLineUp, top: "38%", left: "35%" },
  { label: "Data Analysis", icon: ChartBar, top: "55%", left: "15%" },
  { label: "Quality Reports", icon: ClipboardText, top: "72%", left: "22%" },
  { label: "KPI Reports", icon: FileText, top: "72%", left: "58%" },
];

const shopFloorPills: Pill[] = [
  { label: "Excel", icon: Table, top: "18%", left: "22%" },
  { label: "Connected Worker", icon: UsersThree, top: "18%", left: "55%" },
  { label: "SOPs", icon: FileDoc, top: "40%", left: "60%" },
  { label: "Shift Handover", icon: Clock, top: "40%", left: "18%" },
  { label: "Meeting Notes", icon: ChatText, top: "60%", left: "55%" },
  { label: "Training Logs", icon: GraduationCap, top: "72%", left: "25%" },
];

interface ModuleCard {
  title: string;
  subtitle: string;
  icon: Icon;
  color: string;
  hex: string;
  borderColor: string;
  bgColor: string;
  intro: string;
  bullets: string[];
}

const moduleCards: ModuleCard[] = [
  {
    title: "CAPTURE",
    subtitle: "with LOGS",
    icon: Microphone,
    color: "text-[#E07A3D]",
    hex: "#E07A3D",
    borderColor: "border-[#E07A3D]/30",
    bgColor: "bg-[#E07A3D]/5",
    intro: "The knowledge your team carries — captured in seconds",
    bullets: [
      "Voice, photo, or text — any language",
      "AI structures every observation automatically",
      "Zero disruption to the workflow",
    ],
  },
  {
    title: "ANALYZE",
    subtitle: "with IDA",
    icon: MagnifyingGlass,
    color: "text-[#3B82F6]",
    hex: "#3B82F6",
    borderColor: "border-[#3B82F6]/30",
    bgColor: "bg-[#3B82F6]/5",
    intro: "Turn scattered observations into confirmed root causes",
    bullets: [
      "Ask questions in plain language",
      "Correlates human + machine data",
      "Patterns surface before they become problems",
    ],
  },
  {
    title: "IMPLEMENT",
    subtitle: "with DOCS",
    icon: BookOpen,
    color: "text-[#10B981]",
    hex: "#10B981",
    borderColor: "border-[#10B981]/30",
    bgColor: "bg-[#10B981]/5",
    intro: "Insights become living procedures — at the point of work",
    bullets: [
      "Procedures update from validated findings",
      "Accessible via QR at the machine",
      "Knowledge that outlasts any employee",
    ],
  },
];

const frameCaptions = [
  "Both sides generate data. Neither side sees the other.",
  "The execution platform connects what machines measure with what people know.",
  "One closed loop. Capture, analyze, implement — continuously improving.",
];

const FRAME_DURATION = 5500;

/* ──────────────────────────── SVG Loop Geometry ──────────────────────────── */

const LOOP_VB = 500;
const LOOP_CX = LOOP_VB / 2;
const LOOP_CY = 220;
const LOOP_R = 130;
const LOOP_NODE_R = 38;

const toRad = (deg: number) => (deg * Math.PI) / 180;

function loopPoint(angleDeg: number) {
  return {
    x: LOOP_CX + LOOP_R * Math.sin(toRad(angleDeg)),
    y: LOOP_CY - LOOP_R * Math.cos(toRad(angleDeg)),
  };
}

const loopNodeAngles = [0, 120, 240];
const loopNodePositions = loopNodeAngles.map(loopPoint);

const LOOP_GAP = Math.ceil((Math.asin(LOOP_NODE_R / LOOP_R) * 180) / Math.PI) + 4;

function loopArcPath(fromAngle: number, toAngle: number): string {
  const start = loopPoint(fromAngle + LOOP_GAP);
  const end = loopPoint(toAngle - LOOP_GAP);
  return `M ${start.x} ${start.y} A ${LOOP_R} ${LOOP_R} 0 0 1 ${end.x} ${end.y}`;
}

const loopArrowPaths = [
  loopArcPath(0, 120),
  loopArcPath(120, 240),
  loopArcPath(240, 360),
];

function loopArrowheadAt(toAngle: number) {
  const angle = toAngle - LOOP_GAP;
  const pos = loopPoint(angle);
  return { ...pos, rotation: angle };
}

const loopArrowheads = [
  loopArrowheadAt(120),
  loopArrowheadAt(240),
  loopArrowheadAt(360),
];

/* ──────────────────────────── Floating Pill ──────────────────────────── */

function FloatingPill({
  pill,
  delay,
  side,
}: {
  pill: Pill;
  delay: number;
  side: "left" | "right";
}) {
  const IconComp = pill.icon;
  const borderClass = side === "left" ? "border-ida/20" : "border-oppr-secondary/20";
  const iconClass = side === "left" ? "text-ida" : "text-oppr-secondary";

  return (
    <motion.div
      className="absolute"
      style={{ top: pill.top, left: pill.left }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <div
        className={`flex items-center gap-1.5 bg-white border ${borderClass} shadow-sm rounded-full px-3 py-1.5 text-xs font-medium text-text-primary whitespace-nowrap`}
      >
        <IconComp size={14} weight="duotone" className={iconClass} />
        {pill.label}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── Animation ──────────────────────────── */

function TwoWorldsAnimation() {
  const [frame, setFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const advance = useCallback(() => {
    setFrame((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(advance, FRAME_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, isInView, advance]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border border-border-light p-5 md:p-7 shadow-sm max-w-[960px] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fixed-height animation container */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ height: "clamp(300px, 38vw, 420px)" }}
      >
        {/* ── Background Panels (always rendered, animate position/opacity) ── */}

        {/* Left panel — Dashboard Reality */}
        <motion.div
          className="absolute top-0 bottom-0 rounded-2xl bg-ida/5"
          animate={{
            left: frame === 0 ? "0%" : frame === 1 ? "-5%" : "-10%",
            right: frame === 0 ? "54%" : frame === 1 ? "35%" : "55%",
            opacity: frame === 0 ? 1 : frame === 1 ? 0.6 : 0.15,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-ida/40 text-center pt-4 md:pt-5 flex items-center justify-center gap-1.5">
            <Monitor size={14} weight="duotone" />
            Dashboard Reality
          </p>
        </motion.div>

        {/* Right panel — Shop Floor Reality */}
        <motion.div
          className="absolute top-0 bottom-0 rounded-2xl bg-oppr-secondary/5"
          animate={{
            left: frame === 0 ? "54%" : frame === 1 ? "35%" : "55%",
            right: frame === 0 ? "0%" : frame === 1 ? "-5%" : "-10%",
            opacity: frame === 0 ? 1 : frame === 1 ? 0.6 : 0.15,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-oppr-secondary/40 text-center pt-4 md:pt-5 flex items-center justify-center gap-1.5">
            <Wrench size={14} weight="duotone" />
            Shop Floor Reality
          </p>
        </motion.div>

        {/* ── Frame 1: Floating pills + Gap ── */}
        <AnimatePresence>
          {frame === 0 && (
            <motion.div
              key="frame-0"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left pills */}
              <div className="absolute top-10 left-0 bottom-0" style={{ width: "44%" }}>
                {dashboardPills.map((pill, i) => (
                  <FloatingPill
                    key={pill.label}
                    pill={pill}
                    delay={0.1 + i * 0.08}
                    side="left"
                  />
                ))}
              </div>

              {/* Gap */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3">
                <div className="w-px h-full border-l-2 border-dashed border-border-light absolute" />
                <span className="relative z-10 bg-white px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-text-muted rounded-full border border-border-light">
                  The Gap
                </span>
              </div>

              {/* Right pills */}
              <div className="absolute top-10 right-0 bottom-0" style={{ width: "44%" }}>
                {shopFloorPills.map((pill, i) => (
                  <FloatingPill
                    key={pill.label}
                    pill={pill}
                    delay={0.15 + i * 0.08}
                    side="right"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Frame 2: Operational Reality badge + bridge visual ── */}
        <AnimatePresence>
          {frame === 1 && (
            <motion.div
              key="frame-1"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Operational Reality badge at top */}
              <motion.div
                className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-oppr-primary text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.12em] shadow-lg flex items-center gap-1.5">
                  <ArrowsClockwise size={14} weight="bold" />
                  Operational Reality
                </div>
              </motion.div>

              {/* Circular loop SVG — LOGS / IDA / DOCS */}
              <div className="flex flex-col items-center mt-2">
                <svg
                  viewBox={`0 0 ${LOOP_VB} ${LOOP_VB}`}
                  className="w-[220px] h-[220px] md:w-[280px] md:h-[280px]"
                >
                  {/* Dashed guide circle */}
                  <motion.circle
                    cx={LOOP_CX}
                    cy={LOOP_CY}
                    r={LOOP_R}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth={1.5}
                    strokeDasharray="4 12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  />

                  {/* Arc paths */}
                  {loopArrowPaths.map((d, i) => (
                    <motion.path
                      key={`arc-${i}`}
                      d={d}
                      fill="none"
                      stroke={moduleCards[i].hex}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeOpacity={0.35}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  ))}

                  {/* Arrowheads */}
                  {loopArrowheads.map((ah, i) => (
                    <motion.polygon
                      key={`arrow-${i}`}
                      points="-6,-4 6,0 -6,4"
                      fill={moduleCards[i].hex}
                      fillOpacity={0.5}
                      transform={`translate(${ah.x}, ${ah.y}) rotate(${ah.rotation})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    />
                  ))}

                  {/* Node circles + labels */}
                  {loopNodePositions.map((pos, i) => {
                    const card = moduleCards[i];
                    const CircleIcon = card.icon;
                    return (
                      <g key={card.title}>
                        {/* White circle bg */}
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r={LOOP_NODE_R}
                          fill="white"
                          stroke={card.hex}
                          strokeWidth={2.5}
                          strokeOpacity={0.4}
                          initial={{ opacity: 0, r: LOOP_NODE_R * 0.85 }}
                          animate={{ opacity: 1, r: LOOP_NODE_R }}
                          transition={{ delay: 0.25 + i * 0.15, duration: 0.45, ease: "easeOut" }}
                        />
                        {/* Icon via foreignObject */}
                        <motion.foreignObject
                          x={pos.x - LOOP_NODE_R}
                          y={pos.y - LOOP_NODE_R}
                          width={LOOP_NODE_R * 2}
                          height={LOOP_NODE_R * 2}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 0.35 }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <CircleIcon size={22} weight="duotone" style={{ color: card.hex }} />
                          </div>
                        </motion.foreignObject>
                        {/* Label below circle */}
                        <motion.text
                          x={pos.x}
                          y={pos.y + LOOP_NODE_R + 18}
                          textAnchor="middle"
                          fill={card.hex}
                          fontSize={13}
                          fontWeight={700}
                          letterSpacing="0.08em"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 + i * 0.15, duration: 0.35 }}
                        >
                          {card.subtitle.replace("with ", "").toUpperCase()}
                        </motion.text>
                      </g>
                    );
                  })}

                  {/* Center icon */}
                  <motion.foreignObject
                    x={LOOP_CX - 12}
                    y={LOOP_CY - 12}
                    width={24}
                    height={24}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <ArrowsClockwise size={20} weight="bold" className="text-oppr-primary" />
                    </div>
                  </motion.foreignObject>
                </svg>
                <motion.p
                  className="text-xs md:text-sm text-text-secondary text-center max-w-[340px] -mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  Your execution platform — connecting both worlds into operational intelligence
                </motion.p>
              </div>

              {/* Faded pills in background */}
              <div className="absolute top-10 left-0 bottom-0 opacity-20" style={{ width: "35%" }}>
                {dashboardPills.slice(0, 3).map((pill) => (
                  <div
                    key={pill.label}
                    className="absolute"
                    style={{ top: pill.top, left: pill.left }}
                  >
                    <div className="flex items-center gap-1.5 bg-white border border-ida/20 shadow-sm rounded-full px-3 py-1.5 text-xs font-medium text-text-primary whitespace-nowrap">
                      <pill.icon size={14} weight="duotone" className="text-ida" />
                      {pill.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-10 right-0 bottom-0 opacity-20" style={{ width: "35%" }}>
                {shopFloorPills.slice(0, 3).map((pill) => (
                  <div
                    key={pill.label}
                    className="absolute"
                    style={{ top: pill.top, left: pill.left }}
                  >
                    <div className="flex items-center gap-1.5 bg-white border border-oppr-secondary/20 shadow-sm rounded-full px-3 py-1.5 text-xs font-medium text-text-primary whitespace-nowrap">
                      <pill.icon size={14} weight="duotone" className="text-oppr-secondary" />
                      {pill.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Frame 3: Module cards ── */}
        <AnimatePresence>
          {frame === 2 && (
            <motion.div
              key="frame-2"
              className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Operational Reality badge persists */}
              <motion.div
                className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-oppr-primary text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.12em] shadow-lg flex items-center gap-1.5">
                  <ArrowsClockwise size={14} weight="bold" />
                  Operational Reality
                </div>
              </motion.div>

              {/* Three module cards */}
              <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4 w-full max-w-[760px] mt-8">
                {moduleCards.map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      className={`flex-1 ${card.bgColor} border-2 ${card.borderColor} rounded-xl p-4 md:p-5`}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.2 + i * 0.15,
                        ease: "easeOut",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CardIcon
                          size={22}
                          weight="duotone"
                          className={card.color}
                        />
                        <div>
                          <h4 className={`text-sm font-bold ${card.color}`}>
                            {card.title}
                          </h4>
                          <p className="text-[10px] text-text-muted">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] md:text-xs text-text-secondary font-medium mb-2">
                        {card.intro}
                      </p>
                      <ul className="space-y-1">
                        {card.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="text-[11px] md:text-xs text-text-secondary flex items-start gap-1.5"
                          >
                            <span className={`mt-1.5 w-1 h-1 rounded-full ${card.color.replace("text-", "bg-")} shrink-0`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arrows between cards (desktop only) */}
              <div className="hidden md:flex items-center gap-0 absolute" style={{ top: "52%", left: "50%", transform: "translateX(-50%)" }}>
                {/* These are positioned relatively within the card flow via the gap */}
              </div>

              {/* Loop indicator */}
              <motion.p
                className="text-[10px] md:text-xs text-text-muted mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                CAPTURE → ANALYZE → IMPLEMENT → continuously improving
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption + frame dots */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={frame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-text-secondary leading-relaxed italic flex-1"
          >
            {frameCaptions[frame]}
          </motion.p>
        </AnimatePresence>

        <div className="flex gap-2 shrink-0">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setFrame(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                frame === i
                  ? "bg-oppr-primary scale-125"
                  : "bg-border-light hover:bg-border-medium"
              }`}
              aria-label={`Frame ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Section ──────────────────────────── */

export function TwoWorldsSection() {
  return (
    <SectionWrapper bg="white">
      <SectionHeader
        title="Two Worlds That Need to Connect"
        subtitle="Every operation has two data streams. Most companies only connect one."
      />

      {/* Full-width animated graphic */}
      <AnimatedSection>
        <TwoWorldsAnimation />
      </AnimatedSection>

      {/* Info row below — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-[960px] mx-auto mt-14">
        <AnimatedSection direction="left">
          <p className="text-text-secondary leading-relaxed mb-5">
            Your operation runs on two types of data:
          </p>

          <div className="p-5 rounded-xl border-2 border-ida/30 bg-ida/5 mb-4">
            <p className="text-text-primary leading-relaxed">
              <strong>Machine Data &mdash; The What.</strong> Temperatures,
              pressures, speeds, counts. Terabytes telling you{" "}
              <em>what</em> happened.
            </p>
          </div>

          <div className="p-5 rounded-xl border-2 border-oppr-secondary/30 bg-oppr-secondary/5">
            <p className="text-text-primary leading-relaxed">
              <strong>Human Knowledge &mdash; The Why.</strong> The bearing that
              sounds different. The adjustment that works on humid days. Context
              no sensor captures.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <p className="text-text-secondary leading-relaxed mb-4">
            You&apos;ve invested millions in capturing machine data. But the
            human side? It lives in people&apos;s heads, disappears at shift
            change, and walks out the door at retirement.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            That&apos;s the gap. Not a technology gap&mdash;a{" "}
            <em>knowledge</em> gap. And it costs you repeat failures, slow
            root-cause analysis, and improvements that don&apos;t stick.
          </p>
          <p className="text-text-primary font-semibold text-lg">
            Oppr closes that gap.
          </p>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}

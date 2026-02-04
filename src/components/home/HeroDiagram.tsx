"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  Gauge,
  Monitor,
  Cpu,
  SlidersHorizontal,
  Microphone,
  Camera,
  ChatText,
  DeviceMobileCamera,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { EASE_SMOOTH_OUT, EASE_SNAP } from "@/lib/animations";

/* ============================================
   DATA
   ============================================ */

interface SourceNode {
  id: string;
  icon: Icon;
  label: string;
}

const machineSources: SourceNode[] = [
  { id: "sensor", icon: Gauge, label: "Sensors" },
  { id: "scada", icon: Monitor, label: "SCADA" },
  { id: "plc", icon: Cpu, label: "PLCs" },
  { id: "params", icon: SlidersHorizontal, label: "Parameters" },
];

const humanSources: SourceNode[] = [
  { id: "voice", icon: Microphone, label: "Voice" },
  { id: "photo", icon: Camera, label: "Photos" },
  { id: "phone", icon: DeviceMobileCamera, label: "Mobile" },
  { id: "text", icon: ChatText, label: "Notes" },
];

/* ============================================
   ICON ANIMATIONS
   ============================================ */

/** Each icon gets a unique subtle animation based on its id */
function IconAnimation({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "sensor":
      // Gauge needle sweep
      return (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [-15, 15, -15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-[2px] h-[6px] rounded-full"
            style={{ backgroundColor: color, opacity: 0.4 }}
          />
        </motion.div>
      );
    case "scada":
      // Monitor blink
      return (
        <motion.div
          className="absolute bottom-[5px] right-[5px] w-[3px] h-[3px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    case "plc":
      // CPU pulse ring
      return (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ border: `1px solid ${color}` }}
          animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    case "params":
      // Sliders shift
      return (
        <motion.div
          className="absolute top-[6px] left-[6px] w-[3px] h-[3px] rounded-full"
          style={{ backgroundColor: color, opacity: 0.5 }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    case "voice":
      // Microphone pulse
      return (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ border: `1px solid ${color}` }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    case "photo":
      // Camera flash
      return (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      );
    case "phone":
      // Signal bars
      return (
        <motion.div
          className="absolute top-[4px] right-[4px] flex gap-[1px] items-end"
        >
          {[3, 5, 7].map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{ backgroundColor: color, height: h }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      );
    case "text":
      // Typing cursor blink
      return (
        <motion.div
          className="absolute bottom-[6px] right-[7px] w-[2px] h-[8px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    default:
      return null;
  }
}

/* ============================================
   ANIMATION VARIANTS
   ============================================ */

const slideFromLeft = (delay: number): Variants => ({
  hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay, ease: EASE_SMOOTH_OUT },
  },
});

const slideFromRight = (delay: number): Variants => ({
  hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay, ease: EASE_SMOOTH_OUT },
  },
});

const centerReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.6, ease: EASE_SNAP },
  },
};

const labelReveal = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: EASE_SMOOTH_OUT },
  },
});

/* ============================================
   SIGNAL LINES (SVG)
   ============================================ */

// SVG viewBox dimensions
const SVG_W = 560;
const SVG_H = 340;

// Column positions
const LEFT_COL_X = 90;
const RIGHT_COL_X = SVG_W - 90;
const CENTER_X = SVG_W / 2;
const CENTER_Y = SVG_H / 2;

// Vertical positions for 4 nodes (evenly spaced)
const nodeYPositions = [60, 130, 200, 270];

function getLeftSignalPath(nodeIndex: number): string {
  const startX = LEFT_COL_X + 30;
  const startY = nodeYPositions[nodeIndex];
  const cpX = CENTER_X - 60;
  return `M ${startX} ${startY} Q ${cpX} ${startY}, ${CENTER_X - 30} ${CENTER_Y}`;
}

function getRightSignalPath(nodeIndex: number): string {
  const startX = RIGHT_COL_X - 30;
  const startY = nodeYPositions[nodeIndex];
  const cpX = CENTER_X + 60;
  return `M ${startX} ${startY} Q ${cpX} ${startY}, ${CENTER_X + 30} ${CENTER_Y}`;
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

export function HeroDiagram() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-[560px] mx-auto"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-oppr-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* SVG signal lines layer */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
      >
        {/* Left (machine) signal lines */}
        {nodeYPositions.map((_, i) => (
          <g key={`left-${i}`}>
            <path
              d={getLeftSignalPath(i)}
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              fill="none"
            />
            <motion.path
              d={getLeftSignalPath(i)}
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.08,
                ease: EASE_SMOOTH_OUT,
              }}
            />
            <motion.path
              d={getLeftSignalPath(i)}
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.08 }}
              className="animate-dash-flow"
            />
          </g>
        ))}

        {/* Right (human) signal lines */}
        {nodeYPositions.map((_, i) => (
          <g key={`right-${i}`}>
            <path
              d={getRightSignalPath(i)}
              stroke="#E07A3D"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              fill="none"
            />
            <motion.path
              d={getRightSignalPath(i)}
              stroke="#E07A3D"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.08,
                ease: EASE_SMOOTH_OUT,
              }}
            />
            <motion.path
              d={getRightSignalPath(i)}
              stroke="#E07A3D"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + i * 0.08 }}
              className="animate-dash-flow"
            />
          </g>
        ))}
      </svg>

      {/* HTML overlay layer (icons, labels, center badge) */}
      <div className="relative" style={{ height: SVG_H }}>
        {/* ── Column Labels ── */}
        <motion.div
          variants={labelReveal(0.05)}
          className="absolute text-center z-10"
          style={{ left: LEFT_COL_X - 40, top: -24, width: 100 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ida leading-tight">
            Machine
            <br />
            Data
          </p>
          <p className="text-[9px] text-text-muted mt-0.5">(high frequency)</p>
        </motion.div>

        <motion.div
          variants={labelReveal(0.15)}
          className="absolute text-center z-10"
          style={{ right: SVG_W - RIGHT_COL_X - 50, top: -24, width: 100 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-logs leading-tight">
            Human
            <br />
            Knowledge
          </p>
          <p className="text-[9px] text-text-muted mt-0.5">(high context)</p>
        </motion.div>

        {/* ── Left Machine Nodes ── */}
        {machineSources.map((src, i) => {
          const IconComp = src.icon;
          return (
            <motion.div
              key={src.id}
              variants={slideFromLeft(0.05 + i * 0.1)}
              className="absolute flex items-center gap-2.5 z-10"
              style={{
                left: LEFT_COL_X - 40,
                top: nodeYPositions[i] - 18,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-ida/10 flex items-center justify-center flex-shrink-0 relative">
                <IconComp size={22} weight="duotone" className="text-ida" />
                <IconAnimation id={src.id} color="#3B82F6" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap">
                  {src.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* ── Right Human Nodes ── */}
        {humanSources.map((src, i) => {
          const IconComp = src.icon;
          return (
            <motion.div
              key={src.id}
              variants={slideFromRight(0.1 + i * 0.1)}
              className="absolute flex items-center gap-2.5 flex-row-reverse z-10"
              style={{
                right: SVG_W - RIGHT_COL_X - 50,
                top: nodeYPositions[i] - 18,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-logs/10 flex items-center justify-center flex-shrink-0 relative">
                <IconComp size={22} weight="duotone" className="text-logs" />
                <IconAnimation id={src.id} color="#E07A3D" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap">
                  {src.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* ── Center Oppr Badge (favicon "O") ── */}
        <motion.div
          variants={centerReveal}
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: -30,
            marginTop: -30,
          }}
        >
          <div className="w-[60px] h-[60px] rounded-2xl bg-oppr-primary flex items-center justify-center shadow-lg animate-glow-breathe relative overflow-hidden">
            <div className="absolute inset-0 shimmer" />
            <Image
              src="/images/oppr_o.svg"
              alt="Oppr"
              width={36}
              height={36}
              className="relative z-10 brightness-0 invert"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle floating ambient elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-ida/5 blur-2xl pointer-events-none"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-logs/5 blur-2xl pointer-events-none"
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

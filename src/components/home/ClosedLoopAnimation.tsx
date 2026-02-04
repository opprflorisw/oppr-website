"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Microphone,
  MagnifyingGlass,
  BookOpen,
  ArrowRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE_SNAP, EASE_SMOOTH_OUT } from "@/lib/animations";

/* ============================================
   DATA
   ============================================ */

interface ModuleNode {
  id: string;
  label: string;
  cardTitle: string;
  cardSubtitle: string;
  icon: Icon;
  color: string;
  ringColor: string;
  glowColor: string;
  textColor: string;
  bgColor: string;
  bullets: string[];
}

const modules: ModuleNode[] = [
  {
    id: "logs",
    label: "LOGS",
    cardTitle: "Capture",
    cardSubtitle: "with LOGS",
    icon: Microphone,
    color: "#E07A3D",
    ringColor: "border-logs",
    glowColor: "rgba(224, 122, 61, 0.35)",
    textColor: "text-logs",
    bgColor: "bg-logs/10",
    bullets: [
      "Operators speak or snap a photo. 20 seconds. Any language.",
      "Captures from legacy HMIs, handwritten notes, and photos",
      "Zero friction\u2014operators don\u2019t stop working to fill in forms",
    ],
  },
  {
    id: "ida",
    label: "IDA",
    cardTitle: "Analyze",
    cardSubtitle: "with IDA",
    icon: MagnifyingGlass,
    color: "#3B82F6",
    ringColor: "border-ida",
    glowColor: "rgba(59, 130, 246, 0.35)",
    textColor: "text-ida",
    bgColor: "bg-ida/10",
    bullets: [
      "AI correlates human observations with machine data automatically",
      "Like having a personal data engineer for every operator",
      "Proactive analysis\u2014surfaces patterns before they become problems",
    ],
  },
  {
    id: "docs",
    label: "DOCS",
    cardTitle: "Implement",
    cardSubtitle: "with DOCS",
    icon: BookOpen,
    color: "#10B981",
    ringColor: "border-docs",
    glowColor: "rgba(16, 185, 129, 0.35)",
    textColor: "text-docs",
    bgColor: "bg-docs/10",
    bullets: [
      "Living procedures that update based on what actually works",
      "QR code access\u2014right knowledge at the right machine",
      "Field-accessible documentation that operators actually use",
    ],
  },
];

/* ============================================
   SVG GEOMETRY — EVERYTHING IN ONE COORDINATE SPACE
   ============================================ */

const VB = 500;
const CX = VB / 2;
const CY = 220; // Shift center up slightly to leave room for labels below bottom nodes
const R = 150;

const toRad = (deg: number) => (deg * Math.PI) / 180;

function pointOnCircle(angleDeg: number) {
  return {
    x: CX + R * Math.sin(toRad(angleDeg)),
    y: CY - R * Math.cos(toRad(angleDeg)),
  };
}

// Three nodes 120° apart: top-center (LOGS), bottom-right (IDA), bottom-left (DOCS)
const nodeAngles = [0, 120, 240];
const nodePositions = nodeAngles.map(pointOnCircle);

// Node circle radius in SVG units
const NODE_R = 44;

// Gap: angular distance to skip near each node so arcs don't overlap circles
// arcsin(NODE_R / R) in degrees + some margin
const GAP = Math.ceil((Math.asin(NODE_R / R) * 180) / Math.PI) + 4; // ~21°

function circularArcPath(fromAngle: number, toAngle: number): string {
  const start = pointOnCircle(fromAngle + GAP);
  const end = pointOnCircle(toAngle - GAP);
  return `M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${end.x} ${end.y}`;
}

const arrowPaths = [
  circularArcPath(0, 120),
  circularArcPath(120, 240),
  circularArcPath(240, 360),
];

function arrowheadAt(toAngle: number) {
  const angle = toAngle - GAP;
  const pos = pointOnCircle(angle);
  return { ...pos, rotation: angle };
}

const arrowheads = [
  arrowheadAt(120),
  arrowheadAt(240),
  arrowheadAt(360),
];

/* ============================================
   MINI DEMO ANIMATIONS
   ============================================ */

function MiniWaveform({ color }: { color: string }) {
  const barHeights = [0.6, 0.9, 0.5, 0.8, 0.4, 0.7];
  return (
    <div className="flex items-end gap-[3px] h-6 mb-3">
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[4px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ height: [`${h * 100}%`, `${h * 35}%`, `${h * 100}%`] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MiniTypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1.5 h-6 mb-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MiniScanLine({ color }: { color: string }) {
  return (
    <div className="relative h-6 w-12 mb-3 rounded overflow-hidden border border-border-light">
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{ backgroundColor: color }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-[4px] left-[4px] right-[4px] space-y-[3px]">
        <div className="h-[2px] bg-gray-200 rounded-full w-full" />
        <div className="h-[2px] bg-gray-200 rounded-full w-3/4" />
        <div className="h-[2px] bg-gray-200 rounded-full w-5/6" />
      </div>
    </div>
  );
}

function MiniDemo({ moduleId, color }: { moduleId: string; color: string }) {
  if (moduleId === "logs") return <MiniWaveform color={color} />;
  if (moduleId === "ida") return <MiniTypingDots color={color} />;
  return <MiniScanLine color={color} />;
}

/* ============================================
   SVG NODE — circle + icon + label all inside SVG foreignObject
   ============================================ */

function SvgNode({
  mod,
  pos,
  isActive,
  onClick,
}: {
  mod: ModuleNode;
  pos: { x: number; y: number };
  isActive: boolean;
  onClick: () => void;
}) {
  const IconComp = mod.icon;
  const size = NODE_R * 2; // 88 SVG units
  return (
    <foreignObject
      x={pos.x - NODE_R}
      y={pos.y - NODE_R}
      width={size}
      height={size + 28}
      overflow="visible"
    >
      <motion.button
        onClick={onClick}
        className="flex flex-col items-center cursor-pointer w-full"
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: EASE_SNAP }}
        style={{ transformOrigin: `${NODE_R}px ${NODE_R}px` }}
      >
        <motion.div
          className={cn(
            "rounded-full bg-white flex items-center justify-center border-[3px] transition-colors duration-300",
            isActive ? mod.ringColor : "border-gray-200"
          )}
          style={{ width: size, height: size }}
          animate={{
            boxShadow: isActive
              ? `0 0 28px ${mod.glowColor}, 0 4px 16px rgba(0,0,0,0.08)`
              : "0 2px 8px rgba(0,0,0,0.06)",
          }}
          transition={{ duration: 0.4 }}
        >
          <IconComp
            size={32}
            weight={isActive ? "fill" : "duotone"}
            className={cn(
              "transition-colors duration-300",
              isActive ? mod.textColor : "text-gray-400"
            )}
          />
        </motion.div>
        <span
          className={cn(
            "mt-1.5 text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300",
            isActive ? mod.textColor : "text-text-muted"
          )}
        >
          {mod.label}
        </span>
      </motion.button>
    </foreignObject>
  );
}

/* ============================================
   COMPONENT
   ============================================ */

export function ClosedLoopAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, inView]);

  const handleNodeClick = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const activeModule = modules[activeIndex];
  const ActiveIcon = activeModule.icon;

  return (
    <div ref={containerRef} className="relative">
      {/* ── Desktop Layout ── */}
      <div className="hidden lg:flex items-center justify-center gap-6">
        {/* Single SVG with everything inside — arcs, arrowheads, AND node circles */}
        <div className="w-[480px] h-[480px] flex-shrink-0">
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="w-full h-full"
            fill="none"
            overflow="visible"
          >
            {/* Background circle guide */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-100"
              fill="none"
              strokeDasharray="4 12"
            />

            {/* Circular arc paths */}
            {arrowPaths.map((path, i) => (
              <g key={i}>
                <path
                  d={path}
                  stroke="#e5e7eb"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.path
                  d={path}
                  stroke={modules[i].color}
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: activeIndex === i ? 1 : 0,
                    opacity: activeIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 1.2, ease: EASE_SMOOTH_OUT }}
                />
              </g>
            ))}

            {/* Arrowheads */}
            {arrowheads.map((ah, i) => (
              <motion.polygon
                key={`arrow-${i}`}
                points="-7,-5 7,0 -7,5"
                fill={activeIndex === i ? modules[i].color : "#d1d5db"}
                transform={`translate(${ah.x}, ${ah.y}) rotate(${ah.rotation})`}
                animate={{
                  fill: activeIndex === i ? modules[i].color : "#d1d5db",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}

            {/* Node circles — embedded in same SVG via foreignObject */}
            {modules.map((mod, i) => (
              <SvgNode
                key={mod.id}
                mod={mod}
                pos={nodePositions[i]}
                isActive={activeIndex === i}
                onClick={() => handleNodeClick(i)}
              />
            ))}
          </svg>
        </div>

        {/* Info Card */}
        <div className="w-[340px] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE_SNAP }}
              className="bg-white rounded-2xl border border-border-light shadow-elevated p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                    activeModule.id === "logs" && "bg-gradient-to-br from-logs to-logs/80",
                    activeModule.id === "ida" && "bg-gradient-to-br from-ida to-ida/80",
                    activeModule.id === "docs" && "bg-gradient-to-br from-docs to-docs/80"
                  )}
                >
                  <ActiveIcon size={20} weight="fill" />
                </div>
                <div>
                  <h4
                    className={cn(
                      "text-base font-bold tracking-wide",
                      activeModule.textColor
                    )}
                  >
                    {activeModule.cardTitle}
                  </h4>
                  <p className="text-xs text-text-muted font-semibold tracking-wider uppercase">
                    {activeModule.cardSubtitle}
                  </p>
                </div>
              </div>

              <MiniDemo moduleId={activeModule.id} color={activeModule.color} />

              <ul className="space-y-3">
                {activeModule.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.3, ease: EASE_SNAP }}
                    className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                        activeModule.textColor.replace("text-", "bg-")
                      )}
                    />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-5">
            {modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => handleNodeClick(i)}
                className="relative p-1"
                aria-label={`View ${mod.label}`}
              >
                <motion.div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300",
                    activeIndex === i
                      ? mod.textColor.replace("text-", "bg-")
                      : "bg-gray-300"
                  )}
                  animate={{
                    scale: activeIndex === i ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="lg:hidden">
        <div className="flex items-center justify-center gap-3 mb-8">
          {modules.map((mod, i) => {
            const isActive = activeIndex === i;
            const IconComp = mod.icon;
            return (
              <div key={mod.id} className="flex items-center gap-3">
                <button
                  onClick={() => handleNodeClick(i)}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={cn(
                      "w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center border-[3px] transition-colors duration-300",
                      isActive ? mod.ringColor : "border-gray-200"
                    )}
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      boxShadow: isActive
                        ? `0 0 20px ${mod.glowColor}`
                        : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComp
                      size={24}
                      weight={isActive ? "fill" : "duotone"}
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? mod.textColor : "text-gray-400"
                      )}
                    />
                  </motion.div>
                  <span
                    className={cn(
                      "mt-1.5 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-300",
                      isActive ? mod.textColor : "text-text-muted"
                    )}
                  >
                    {mod.label}
                  </span>
                </button>
                {i < 2 && (
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="text-border-medium mt-[-16px]"
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_SNAP }}
            className="bg-white rounded-2xl border border-border-light shadow-elevated p-5 mx-auto max-w-[400px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-white",
                  activeModule.id === "logs" && "bg-gradient-to-br from-logs to-logs/80",
                  activeModule.id === "ida" && "bg-gradient-to-br from-ida to-ida/80",
                  activeModule.id === "docs" && "bg-gradient-to-br from-docs to-docs/80"
                )}
              >
                <ActiveIcon size={18} weight="fill" />
              </div>
              <div>
                <h4
                  className={cn(
                    "text-sm font-bold tracking-wide",
                    activeModule.textColor
                  )}
                >
                  {activeModule.cardTitle}
                </h4>
                <p className="text-[10px] text-text-muted font-semibold tracking-wider uppercase">
                  {activeModule.cardSubtitle}
                </p>
              </div>
            </div>

            <MiniDemo moduleId={activeModule.id} color={activeModule.color} />

            <ul className="space-y-2.5">
              {activeModule.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                      activeModule.textColor.replace("text-", "bg-")
                    )}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mt-4">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => handleNodeClick(i)}
              className="p-1"
              aria-label={`View ${mod.label}`}
            >
              <motion.div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  activeIndex === i
                    ? mod.textColor.replace("text-", "bg-")
                    : "bg-gray-300"
                )}
                animate={{ scale: activeIndex === i ? 1.3 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

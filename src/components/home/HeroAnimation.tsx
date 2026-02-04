"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Monitor,
  SlidersHorizontal,
  User,
  Camera,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { EASE_SMOOTH_OUT } from "@/lib/animations";

/* ============================================
   CONSTANTS & COLORS
   ============================================ */

const W = 700;
const H = 650;

const BLUE_DARK = "#1E3A5F";
const BLUE = "#3B82F6";
const BLUE_LIGHT = "#93C5FD";

const ORANGE = "#E07A3D";

const EMERALD = "#10B981";
const EMERALD_DARK = "#047857";

/* ============================================
   STEP TIMING (ms)
   ============================================ */

const STEP_DURATIONS = [3500, 3500, 3500, 3500]; // 14s total loop
const TOTAL_LOOP = STEP_DURATIONS.reduce((a, b) => a + b, 0);

const STEP_LABELS = [
  "Machine data is precise",
  "Human knowledge adds context",
  "Context becomes data points",
  "Correlations reveal operational intelligence",
];

/* ============================================
   ISOMETRIC PLANE GEOMETRY
   ============================================ */

interface Pt { x: number; y: number }
interface Quad { fl: Pt; fr: Pt; br: Pt; bl: Pt }

// Machine data layer
const LP: Quad = {
  fl: { x: 50, y: 460 },
  fr: { x: 620, y: 505 },
  br: { x: 700, y: 270 },
  bl: { x: 180, y: 225 },
};

const PLANE_GAP = 210;
const HP: Quad = {
  fl: { x: LP.fl.x, y: LP.fl.y - PLANE_GAP },
  fr: { x: LP.fr.x, y: LP.fr.y - PLANE_GAP },
  br: { x: LP.br.x, y: LP.br.y - PLANE_GAP },
  bl: { x: LP.bl.x, y: LP.bl.y - PLANE_GAP },
};

// Orange plane landed — sits flush on top of machine plane
const LANDED_OFFSET = 0;
const HP_LANDED: Quad = {
  fl: { x: LP.fl.x, y: LP.fl.y - LANDED_OFFSET },
  fr: { x: LP.fr.x, y: LP.fr.y - LANDED_OFFSET },
  br: { x: LP.br.x, y: LP.br.y - LANDED_OFFSET },
  bl: { x: LP.bl.x, y: LP.bl.y - LANDED_OFFSET },
};

const HP_CENTER_BACK: Pt = {
  x: (HP.bl.x + HP.br.x) / 2,
  y: (HP.bl.y + HP.br.y) / 2,
};

const GRID_U = 12;
const GRID_V = 8;

/* ============================================
   MATH HELPERS
   ============================================ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function quadPt(q: Quad, u: number, v: number): Pt {
  const fx = lerp(q.fl.x, q.fr.x, u);
  const fy = lerp(q.fl.y, q.fr.y, u);
  const bx = lerp(q.bl.x, q.br.x, u);
  const by = lerp(q.bl.y, q.br.y, u);
  return { x: lerp(fx, bx, v), y: lerp(fy, by, v) };
}

function quadPath(q: Quad): string {
  return `M${q.fl.x},${q.fl.y} L${q.fr.x},${q.fr.y} L${q.br.x},${q.br.y} L${q.bl.x},${q.bl.y}Z`;
}

/* ============================================
   PERSPECTIVE GRID PLANE
   ============================================ */

function PerspGrid({
  quad,
  color,
  fillOpacity = 0.12,
  gridOpacity = 0.1,
  borderOpacity = 0.35,
}: {
  quad: Quad;
  color: string;
  fillOpacity?: number;
  gridOpacity?: number;
  borderOpacity?: number;
}) {
  return (
    <g>
      <path
        d={quadPath(quad)}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={1.5}
        strokeOpacity={borderOpacity}
        strokeLinejoin="round"
      />
      {Array.from({ length: GRID_V + 1 }).map((_, i) => {
        const v = i / GRID_V;
        const l = quadPt(quad, 0, v);
        const r = quadPt(quad, 1, v);
        return (
          <line key={`a${i}`} x1={l.x} y1={l.y} x2={r.x} y2={r.y}
            stroke={color} strokeWidth={0.5} strokeOpacity={gridOpacity} />
        );
      })}
      {Array.from({ length: GRID_U + 1 }).map((_, i) => {
        const u = i / GRID_U;
        const f = quadPt(quad, u, 0);
        const b = quadPt(quad, u, 1);
        return (
          <line key={`d${i}`} x1={f.x} y1={f.y} x2={b.x} y2={b.y}
            stroke={color} strokeWidth={0.5} strokeOpacity={gridOpacity} />
        );
      })}
    </g>
  );
}

/* ============================================
   WAVE GENERATION
   ============================================ */

interface WavePoint {
  x: number; y: number; baseY: number; offset: number; u: number;
}

function generateWavePoints(
  quad: Quad, v: number, amplitude: number, frequency: number,
  phase: number, seed: number, type: "smooth" | "jagged", count = 100
): WavePoint[] {
  const points: WavePoint[] = [];
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s / 0x7fffffff) * 2 - 1; };
  for (let i = 0; i <= count; i++) {
    const u = i / count;
    const base = quadPt(quad, u, v);
    const pScale = 1 - u * 0.15;
    let offset = 0;
    if (type === "smooth") {
      offset = Math.sin(u * Math.PI * 2 * frequency + phase) * amplitude * pScale;
    } else {
      offset = (Math.sin(u * Math.PI * 2 * frequency + phase) * amplitude * 0.7 + rand() * amplitude * 0.3) * pScale;
    }
    points.push({ x: base.x, y: base.y - offset, baseY: base.y, offset, u });
  }
  return points;
}

function splitIntoSegments(pts: WavePoint[]) {
  const aboveSegs: string[] = [];
  const belowSegs: string[] = [];
  const fillPaths: string[] = [];
  let currentAbove: WavePoint[] = [];
  let currentBelow: WavePoint[] = [];

  const flushAbove = () => {
    if (currentAbove.length > 1) {
      aboveSegs.push(currentAbove.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
      const wl = currentAbove.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
      const bl = [...currentAbove].reverse().map(p => `L${p.x.toFixed(1)},${p.baseY.toFixed(1)}`).join(" ");
      fillPaths.push(`${wl} ${bl} Z`);
    }
    currentAbove = [];
  };
  const flushBelow = () => {
    if (currentBelow.length > 1) {
      belowSegs.push(currentBelow.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
    }
    currentBelow = [];
  };

  for (const p of pts) {
    if (p.offset >= 0) {
      if (currentBelow.length > 0) { currentBelow.push({ ...p, y: p.baseY, offset: 0 }); flushBelow(); }
      currentAbove.push(p);
    } else {
      if (currentAbove.length > 0) { currentAbove.push({ ...p, y: p.baseY, offset: 0 }); flushAbove(); }
      currentBelow.push(p);
    }
  }
  flushAbove(); flushBelow();
  return { aboveSegs, belowSegs, fillPaths };
}

/* ============================================
   STEP BARS
   ============================================ */

interface StepBar { path: string; isAbove: boolean; }

function generateStepBars(quad: Quad, v: number, maxH: number, n = 16): StepBar[] {
  const bars: StepBar[] = [];
  let s = 77;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s / 0x7fffffff) * 2 - 1; };
  const bw = 1 / (n * 1.5);
  for (let i = 0; i < n; i++) {
    const uc = (i + 0.5) / n;
    const ul = uc - bw / 2, ur = uc + bw / 2;
    const ps = 1 - uc * 0.15;
    const h = rand() * maxH * ps;
    const bl2 = quadPt(quad, ul, v), br2 = quadPt(quad, ur, v);
    bars.push({
      path: `M${bl2.x.toFixed(1)},${bl2.y.toFixed(1)} L${(bl2.x).toFixed(1)},${(bl2.y - h).toFixed(1)} L${(br2.x).toFixed(1)},${(br2.y - h).toFixed(1)} L${br2.x.toFixed(1)},${br2.y.toFixed(1)}Z`,
      isAbove: h >= 0,
    });
  }
  return bars;
}

/* ============================================
   LANE CONFIG
   ============================================ */

const LANE_V = [0.25, 0.5, 0.75];
const LANE_ICONS: { icon: Icon; label: string }[] = [
  { icon: Gauge, label: "Sensors" },
  { icon: Monitor, label: "SCADA" },
  { icon: SlidersHorizontal, label: "Parameters" },
];

/* ============================================
   HUMAN DATA POINTS
   ============================================ */

interface DataPoint { u: number; v: number; icon: "mic" | "camera"; }

const HUMAN_DATA_POINTS: DataPoint[] = [
  { u: 0.25, v: 0.25, icon: "mic" },
  { u: 0.65, v: 0.25, icon: "camera" },
  { u: 0.45, v: 0.5, icon: "mic" },
  { u: 0.35, v: 0.75, icon: "camera" },
  { u: 0.75, v: 0.75, icon: "mic" },
];

/* ============================================
   HELPER: get signal amplitude at a given u for a given lane
   ============================================ */

function getSignalOffset(wave: WavePoint[], u: number): number {
  const idx = Math.min(Math.floor(u * (wave.length - 1)), wave.length - 2);
  const t = u * (wave.length - 1) - idx;
  return lerp(wave[idx].offset, wave[idx + 1].offset, t);
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

export function HeroAnimation() {
  const [step, setStep] = useState(0);
  const [manualControl, setManualControl] = useState(false);

  useEffect(() => {
    if (manualControl) return;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      if (elapsed >= TOTAL_LOOP) elapsed = 0;
      let acc = 0;
      for (let i = 0; i < STEP_DURATIONS.length; i++) {
        acc += STEP_DURATIONS[i];
        if (elapsed < acc) { setStep(i); break; }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [manualControl]);

  useEffect(() => {
    if (!manualControl) return;
    const timeout = setTimeout(() => setManualControl(false), 6000);
    return () => clearTimeout(timeout);
  }, [manualControl, step]);

  const handleDotClick = (s: number) => {
    setManualControl(true);
    setStep(s);
  };

  // ── Pre-computed wave data ──
  const smoothWave = useMemo(() => generateWavePoints(LP, LANE_V[0], 30, 1.8, 0, 1, "smooth"), []);
  const jaggedWave = useMemo(() => generateWavePoints(LP, LANE_V[1], 22, 2.5, 1, 7, "jagged"), []);
  const stepBars = useMemo(() => generateStepBars(LP, LANE_V[2], 18), []);
  const smoothSegs = useMemo(() => splitIntoSegments(smoothWave), [smoothWave]);
  const jaggedSegs = useMemo(() => splitIntoSegments(jaggedWave), [jaggedWave]);
  const barsAbove = useMemo(() => stepBars.filter(b => b.isAbove), [stepBars]);
  const barsBelow = useMemo(() => stepBars.filter(b => !b.isAbove), [stepBars]);

  // Icon positions — aligned with lanes, offset left
  const iconPositions = LANE_V.map(v => {
    const pt = quadPt(LP, 0, v);
    return { x: pt.x - 82, y: pt.y - 32 };
  });

  const operatorCenter = { x: HP_CENTER_BACK.x, y: HP_CENTER_BACK.y - 80 };
  const phoneEmitPt = { x: HP_CENTER_BACK.x, y: HP_CENTER_BACK.y - 25 };

  // Data points on the high (separated) orange plane
  const dataPointPositions = useMemo(() =>
    HUMAN_DATA_POINTS.map(dp => ({ ...dp, pos: quadPt(HP, dp.u, dp.v) })), []);

  // Data points on the machine plane (final merged positions)
  const mergedDataPoints = useMemo(() =>
    HUMAN_DATA_POINTS.map(dp => {
      const posOnLP = quadPt(LP, dp.u, dp.v);
      return { ...dp, pos: posOnLP };
    }), []);

  // Waves used per lane for correlation lines
  const waveForLane = useCallback((v: number) => {
    if (v === LANE_V[0]) return smoothWave;
    if (v === LANE_V[1]) return jaggedWave;
    return null;
  }, [smoothWave, jaggedWave]);

  // Right-side label positions
  const lpRight = quadPt(LP, 1, 0.5);
  const hpRight = quadPt(HP, 1, 0.5);
  const lpLandedRight = quadPt(HP_LANDED, 1, 0.35);

  const showMachine = step >= 0;
  const showHuman = step >= 1;
  const showMerge = step >= 2;
  const showFinal = step === 3;

  // The y-distance the orange plane needs to travel to land on the machine plane
  const descentY = PLANE_GAP - LANDED_OFFSET;

  return (
    <div className="relative w-full max-w-[700px] mx-auto lg:-mr-4 xl:-mr-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* ════════════════════════════════════════
            MACHINE DATA PLANE — always visible
            ════════════════════════════════════════ */}
        <g opacity={showMachine ? 1 : 0}>
          {/* Below-plane waves */}
          {smoothSegs.belowSegs.map((d, i) => (
            <motion.path key={`sb${i}`} d={d} stroke={BLUE_LIGHT} strokeWidth={2} strokeOpacity={0.4}
              fill="none" strokeLinecap="round" initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3, ease: EASE_SMOOTH_OUT }} />
          ))}
          {jaggedSegs.belowSegs.map((d, i) => (
            <motion.path key={`jb${i}`} d={d} stroke={BLUE_LIGHT} strokeWidth={1.8} strokeOpacity={0.35}
              fill="none" strokeLinecap="round" initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: EASE_SMOOTH_OUT }} />
          ))}
          {barsBelow.map((bar, i) => (
            <motion.path key={`bb${i}`} d={bar.path} fill={BLUE_LIGHT} fillOpacity={0.3}
              stroke={BLUE_LIGHT} strokeWidth={0.5} strokeOpacity={0.2}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 + i * 0.04 }} />
          ))}

          {/* Plane surface */}
          <PerspGrid quad={LP} color={BLUE} fillOpacity={0.15} gridOpacity={0.07} borderOpacity={0.3} />

          {/* Above-plane waves */}
          {smoothSegs.fillPaths.map((d, i) => (
            <motion.path key={`sf${i}`} d={d} fill={BLUE} fillOpacity={0.1} stroke="none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }} />
          ))}
          {smoothSegs.aboveSegs.map((d, i) => (
            <motion.path key={`sa${i}`} d={d} stroke={BLUE_DARK} strokeWidth={2.5} strokeOpacity={0.8}
              fill="none" strokeLinecap="round" initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3, ease: EASE_SMOOTH_OUT }} />
          ))}
          {jaggedSegs.aboveSegs.map((d, i) => (
            <motion.path key={`ja${i}`} d={d} stroke={BLUE_DARK} strokeWidth={2} strokeOpacity={0.75}
              fill="none" strokeLinecap="round" initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: EASE_SMOOTH_OUT }} />
          ))}
          {barsAbove.map((bar, i) => (
            <motion.path key={`ba${i}`} d={bar.path} fill={BLUE_DARK} fillOpacity={0.6}
              stroke={BLUE_DARK} strokeWidth={0.5} strokeOpacity={0.3}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 + i * 0.04 }} />
          ))}
          {LANE_V.map((v, i) => {
            const s2 = quadPt(LP, 0, v), e2 = quadPt(LP, 1, v);
            return <motion.line key={`bl${i}`} x1={s2.x} y1={s2.y} x2={e2.x} y2={e2.y}
              stroke={BLUE_DARK} strokeWidth={0.8} strokeOpacity={0.12}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.2 + i * 0.15, ease: EASE_SMOOTH_OUT }} />;
          })}
        </g>

        {/* ════════════════════════════════════════
            MACHINE ICONS — left side, larger
            ════════════════════════════════════════ */}
        <motion.g initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_SMOOTH_OUT }}>
          {LANE_ICONS.map((lane, i) => {
            const IconC = lane.icon;
            const pos = iconPositions[i];
            return (
              <foreignObject key={lane.label} x={pos.x} y={pos.y} width={76} height={64}>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-xl bg-white/95 border border-ida/25 flex items-center justify-center shadow-sm">
                    <IconC size={26} weight="duotone" className="text-ida" />
                  </div>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-text-muted whitespace-nowrap">
                    {lane.label}
                  </span>
                </div>
              </foreignObject>
            );
          })}
        </motion.g>

        {/* ════════════════════════════════════════
            MACHINE DATA label — right of blue plane
            Shifts down in step 3 to make room for Human Data label above
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {!showFinal && (
            <motion.g key="ml" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}>
              <motion.foreignObject
                x={lpRight.x + 10}
                y={lpRight.y - 16}
                width={130} height={40}
                animate={{ y: showMerge ? 14 : 0 }}
                transition={{ duration: 0.8, ease: EASE_SMOOTH_OUT }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap leading-tight"
                  style={{ color: BLUE }}>
                  Machine Data
                </span>
              </motion.foreignObject>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            HUMAN DATA PLANE — step 1 (separate, floating above)
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showHuman && !showMerge && (
            <motion.g key="hp-sep"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH_OUT }}
            >
              <PerspGrid quad={HP} color={ORANGE} fillOpacity={0.08} gridOpacity={0.05} borderOpacity={0.22} />

              {/* Corner guide lines */}
              {([[LP.fl, HP.fl], [LP.fr, HP.fr], [LP.br, HP.br], [LP.bl, HP.bl]] as [Pt, Pt][]).map(([b, t], i) => (
                <line key={`vg${i}`} x1={b.x} y1={b.y} x2={t.x} y2={t.y}
                  stroke="#64748B" strokeWidth={1} strokeOpacity={0.35} strokeDasharray="6 4" />
              ))}

              {/* Data points on orange plane */}
              {dataPointPositions.map((dp, i) => (
                <motion.g key={`dp${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.12, ease: EASE_SMOOTH_OUT }}
                  style={{ originX: `${dp.pos.x}px`, originY: `${dp.pos.y}px` }}
                >
                  <motion.circle cx={dp.pos.x} cy={dp.pos.y} r={10} fill="none" stroke={ORANGE}
                    strokeWidth={1} initial={{ r: 4, opacity: 0.5 }}
                    animate={{ r: 14, opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
                  <circle cx={dp.pos.x} cy={dp.pos.y} r={6} fill={ORANGE} fillOpacity={0.9}
                    stroke="white" strokeWidth={1.5} />
                  {dp.icon === "mic" ? (
                    <circle cx={dp.pos.x} cy={dp.pos.y} r={2.5} fill="white" />
                  ) : (
                    <rect x={dp.pos.x - 2} y={dp.pos.y - 2} width={4} height={4} fill="white" rx={0.5} />
                  )}
                </motion.g>
              ))}

              {/* Trail lines from phone */}
              {dataPointPositions.map((dp, i) => (
                <motion.path key={`trail${i}`}
                  d={`M${phoneEmitPt.x},${phoneEmitPt.y} Q${(phoneEmitPt.x + dp.pos.x) / 2},${phoneEmitPt.y + 20} ${dp.pos.x},${dp.pos.y}`}
                  stroke={ORANGE} strokeWidth={1.2} strokeOpacity={0.3} strokeDasharray="4 6" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE_SMOOTH_OUT }} />
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            HUMAN DATA label — right of orange plane (step 1)
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showHuman && !showMerge && (
            <motion.g key="hl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <foreignObject x={hpRight.x + 10} y={hpRight.y - 16} width={130} height={40}>
                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap leading-tight"
                  style={{ color: ORANGE }}>
                  Human Data
                </span>
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            OPERATOR — top center, step 1 only
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showHuman && !showMerge && (
            <motion.g key="op"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH_OUT }}
            >
              <foreignObject x={operatorCenter.x - 44} y={operatorCenter.y - 38} width={88} height={88}>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-b from-orange-100 to-orange-200 border-2 border-orange-300/60 flex items-center justify-center shadow-lg">
                      <User size={36} weight="fill" className="text-orange-500" />
                    </div>
                    <motion.div
                      className="absolute -right-2 bottom-1 w-6 h-9 rounded-md bg-slate-700 border border-slate-500 flex items-center justify-center shadow-md overflow-hidden"
                      animate={{ rotate: [-8, 0, -8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.div className="w-4 h-6 rounded-sm bg-gradient-to-b from-orange-300 to-orange-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                    </motion.div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600/80 mt-1 whitespace-nowrap">
                    Operator
                  </span>
                </div>
              </foreignObject>

              {/* Speech waves */}
              {[0, 1, 2].map((i) => (
                <motion.path key={`sp${i}`}
                  d={`M${operatorCenter.x + 35},${operatorCenter.y - 10 + i * 4} q${8 + i * 4},${5},${0},${10 + i * 3}`}
                  fill="none" stroke={ORANGE} strokeWidth={1.8} strokeOpacity={0.5} strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: [0, 0.6, 0], pathLength: [0, 1, 1] }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.3, repeat: Infinity, repeatDelay: 2, ease: "easeOut" }} />
              ))}

              {/* Camera flash */}
              <motion.circle cx={operatorCenter.x - 8} cy={operatorCenter.y - 6} r={22} fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0.5, 0], scale: [0.5, 0.5, 1.3, 1.5] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4.5, ease: "easeOut" }} />
              <motion.g initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4.5, ease: "easeOut" }}>
                <foreignObject x={operatorCenter.x - 42} y={operatorCenter.y - 22} width={28} height={28}>
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-sm">
                    <Camera size={14} weight="fill" className="text-white" />
                  </div>
                </foreignObject>
              </motion.g>

              {/* Emission waves downward */}
              {[0, 1, 2].map((ring) => (
                <motion.ellipse key={`em${ring}`} cx={phoneEmitPt.x} cy={phoneEmitPt.y}
                  rx={8} ry={4} fill="none" stroke={ORANGE} strokeWidth={1}
                  initial={{ rx: 5, ry: 2, opacity: 0 }}
                  animate={{ rx: [5, 35 + ring * 15], ry: [2, 14 + ring * 5], opacity: [0, 0.4, 0], cy: [phoneEmitPt.y, phoneEmitPt.y + 35 + ring * 12] }}
                  transition={{ duration: 2.5, delay: 0.4 + ring * 0.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }} />
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            STEP 3: Orange plane descends WITH dots onto machine plane
            The entire group (plane + grid + dots) moves down together
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showMerge && !showFinal && (
            <motion.g key="descending-unit"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: descentY, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 1.2, ease: EASE_SMOOTH_OUT }}
            >
              {/* Orange plane with grid */}
              <PerspGrid quad={HP} color={ORANGE} fillOpacity={0.06} gridOpacity={0.04} borderOpacity={0.18} />

              {/* Data points riding on the orange plane */}
              {dataPointPositions.map((dp, i) => (
                <g key={`desc-dp${i}`}>
                  <circle cx={dp.pos.x} cy={dp.pos.y} r={6} fill={ORANGE} fillOpacity={0.9}
                    stroke="white" strokeWidth={1.5} />
                  {dp.icon === "mic" ? (
                    <circle cx={dp.pos.x} cy={dp.pos.y} r={2.5} fill="white" />
                  ) : (
                    <rect x={dp.pos.x - 2} y={dp.pos.y - 2} width={4} height={4} fill="white" rx={0.5} />
                  )}
                </g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            STEP 3: "Human Data" label descends with the plane to sit above "Machine Data"
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showMerge && !showFinal && (
            <motion.g key="hl-descend"
              initial={{ opacity: 1, y: -descentY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 1.2, ease: EASE_SMOOTH_OUT }}
            >
              <foreignObject
                x={lpRight.x + 10}
                y={lpRight.y - 32}
                width={130} height={40}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap leading-tight"
                  style={{ color: ORANGE }}>
                  Human Data
                </span>
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            STEP 3: Correlation lines from merged dots to signals
            (appear after plane has landed)
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showMerge && !showFinal && (
            <motion.g key="merge-lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {mergedDataPoints.map((dp, i) => {
                const wave = waveForLane(dp.v);
                if (!wave) return null;
                const signalOff = getSignalOffset(wave, dp.u);
                const waveY = dp.pos.y - signalOff;
                const lineLen = Math.abs(dp.pos.y - waveY);

                return (
                  <motion.g key={`ml${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    {lineLen > 2 && (
                      <motion.line
                        x1={dp.pos.x} y1={dp.pos.y - LANDED_OFFSET}
                        x2={dp.pos.x} y2={waveY}
                        stroke={ORANGE}
                        strokeWidth={1.5}
                        strokeOpacity={0.5}
                        strokeDasharray="3 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE_SMOOTH_OUT }}
                      />
                    )}
                    {/* Small connection dot */}
                    <motion.circle
                      cx={dp.pos.x} cy={(dp.pos.y - LANDED_OFFSET + waveY) / 2} r={3}
                      fill={ORANGE} fillOpacity={0.7}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                    />
                  </motion.g>
                );
              })}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            STEP 4: OPERATIONAL INTELLIGENCE LAYER
            Green transformation with correlation overlays
            ════════════════════════════════════════ */}
        <AnimatePresence>
          {showFinal && (
            <motion.g key="oil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_SMOOTH_OUT }}
            >
              {/* Green glow on the merged plane */}
              <motion.path d={quadPath(LP)} fill={EMERALD} fillOpacity={0.06} stroke={EMERALD}
                strokeWidth={2} strokeOpacity={0.3}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1 }} />

              {/* Label — further right to avoid plane edge */}
              <foreignObject x={lpRight.x + 18} y={lpRight.y - 34} width={150} height={55}>
                <span className="text-[12px] font-bold uppercase tracking-wider whitespace-nowrap leading-tight"
                  style={{ color: EMERALD_DARK }}>
                  Operational<br />Intelligence
                </span>
              </foreignObject>

              {/* Data points — now green */}
              {mergedDataPoints.map((dp, i) => (
                <motion.g key={`gdp${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <circle cx={dp.pos.x} cy={dp.pos.y} r={6}
                    fill={EMERALD} fillOpacity={0.9}
                    stroke="white" strokeWidth={1.5} />
                  {dp.icon === "mic" ? (
                    <circle cx={dp.pos.x} cy={dp.pos.y} r={2.5} fill="white" />
                  ) : (
                    <rect x={dp.pos.x - 2} y={dp.pos.y - 2} width={4} height={4} fill="white" rx={0.5} />
                  )}
                </motion.g>
              ))}

              {/* Stretched correlation overlays */}
              {mergedDataPoints.map((dp, i) => {
                const wave = waveForLane(dp.v);
                if (!wave) return null;
                const signalOff = getSignalOffset(wave, dp.u);
                const waveY = dp.pos.y - signalOff;
                const midY = (dp.pos.y + waveY) / 2;
                const halfH = Math.abs(dp.pos.y - waveY) / 2 + 14;

                return (
                  <motion.g key={`corr-overlay${i}`}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: EASE_SMOOTH_OUT }}
                  >
                    {/* Stretched elliptical glow */}
                    <motion.ellipse
                      cx={dp.pos.x} cy={midY}
                      rx={20} ry={halfH}
                      fill={EMERALD} fillOpacity={0.07}
                      stroke={EMERALD} strokeWidth={1} strokeOpacity={0.22}
                      strokeDasharray="4 3"
                    />
                    {/* Inner glow pulse */}
                    <motion.ellipse
                      cx={dp.pos.x} cy={midY}
                      rx={11} ry={halfH * 0.6}
                      fill={EMERALD} fillOpacity={0.1}
                      stroke="none"
                      animate={{ fillOpacity: [0.06, 0.14, 0.06] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Solid correlation line */}
                    <motion.line
                      x1={dp.pos.x} y1={dp.pos.y}
                      x2={dp.pos.x} y2={waveY}
                      stroke={EMERALD}
                      strokeWidth={2}
                      strokeOpacity={0.45}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE_SMOOTH_OUT }}
                    />
                  </motion.g>
                );
              })}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            STEP INDICATORS + LABEL — bottom center
            Clickable dots, larger text, more spacing
            ════════════════════════════════════════ */}
        <g>
          {/* Step label text */}
          <AnimatePresence mode="wait">
            <motion.g key={`stxt${step}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <foreignObject x={W / 2 - 220} y={H - 75} width={440} height={35}>
                <div className="text-center">
                  <span className="text-[16px] font-semibold tracking-wide"
                    style={{ color: step === 3 ? EMERALD_DARK : (step === 0 ? BLUE_DARK : ORANGE) }}>
                    {STEP_LABELS[step]}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          </AnimatePresence>

          {/* Step dots — clickable, with more gap below text */}
          {[0, 1, 2, 3].map((s) => {
            const dx = W / 2 - 33 + s * 22;
            const dy = H - 18;
            return (
              <g key={`sd${s}`} style={{ cursor: "pointer" }} onClick={() => handleDotClick(s)}>
                <circle cx={dx} cy={dy} r={14} fill="transparent" />
                <motion.circle
                  cx={dx} cy={dy} r={5.5}
                  fill={step === s ? (s === 3 ? EMERALD : (s === 0 ? BLUE : ORANGE)) : "#CBD5E1"}
                  animate={{ scale: step === s ? 1.4 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

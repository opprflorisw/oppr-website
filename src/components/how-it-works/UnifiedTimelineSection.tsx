"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { UserCircle } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

/* ──────────────────────────── Chart constants ──────────────────────────── */

const tempData = [
  { x: 0, y: 183 },
  { x: 4, y: 184 },
  { x: 8, y: 183 },
  { x: 12, y: 185 },
  { x: 16, y: 184 },
  { x: 20, y: 186 },
  { x: 24, y: 188 },
  { x: 28, y: 192 },
  { x: 32, y: 198 }, // spike 1 peak
  { x: 36, y: 194 },
  { x: 40, y: 189 },
  { x: 44, y: 186 },
  { x: 48, y: 184 },
  { x: 52, y: 183 },
  { x: 56, y: 184 },
  { x: 60, y: 183 },
  { x: 64, y: 185 },
  { x: 68, y: 184 },
  { x: 72, y: 186 },
  { x: 76, y: 190 },
  { x: 80, y: 197 }, // spike 2 peak
  { x: 84, y: 193 },
  { x: 88, y: 188 },
  { x: 92, y: 185 },
  { x: 96, y: 184 },
  { x: 100, y: 183 },
];

const TOLERANCE = 195;
const Y_MIN = 175;
const Y_MAX = 205;
const CHART_W = 900;
const CHART_H = 300;
const PAD = { top: 55, right: 30, bottom: 40, left: 55 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

function toX(pct: number) {
  return PAD.left + (pct / 100) * PLOT_W;
}
function toY(temp: number) {
  return PAD.top + ((Y_MAX - temp) / (Y_MAX - Y_MIN)) * PLOT_H;
}

const linePath = tempData
  .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`)
  .join(" ");

// Human observations — well spread to avoid pill overlap
const humanMarkers = [
  { x: 10, label: "Material looks off", time: "07:30" },
  { x: 28, label: "Granulate feels damp", time: "08:15" },
  { x: 65, label: "Same batch, same issue", time: "06:45" },
];

// Shift changes — well separated from human markers
const shiftMarkers = [
  { x: 40, label: "S→N" },
  { x: 90, label: "S→N" },
];

const highlightZones = [
  { x1: 24, x2: 44 },
  { x1: 72, x2: 92 },
];

const xLabels = [
  { x: 0, label: "Day 1" },
  { x: 12.5, label: "6:00" },
  { x: 25, label: "12:00" },
  { x: 37.5, label: "18:00" },
  { x: 50, label: "Day 2" },
  { x: 62.5, label: "6:00" },
  { x: 75, label: "12:00" },
  { x: 87.5, label: "18:00" },
  { x: 100, label: "0:00" },
];

const frameCaptions = [
  "Your machine data shows two temperature spikes…",
  "But operators noticed something hours before the spikes…",
  "IDA identifies the pattern — spikes always follow damp material reports…",
  "One insight. One root cause. One actionable recommendation.",
];

const FRAME_DURATION = 5000;

/* ──────────────────────────── Timeline Chart ──────────────────────────── */

function TimelineAnimation() {
  const [frame, setFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const advance = useCallback(() => {
    setFrame((prev) => (prev + 1) % 4);
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(advance, FRAME_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, isInView, advance]);

  const tolY = toY(TOLERANCE);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border border-border-light p-5 md:p-7 shadow-sm max-w-[920px] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fixed-height chart container to prevent size jumps */}
      <div className="relative" style={{ minHeight: "clamp(200px, 34vw, 340px)" }}>
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Horizontal grid lines */}
          {[180, 185, 190, 195, 200].map((temp) => (
            <line
              key={temp}
              x1={PAD.left}
              y1={toY(temp)}
              x2={CHART_W - PAD.right}
              y2={toY(temp)}
              stroke="#E2E8F0"
              strokeWidth={0.6}
            />
          ))}

          {/* Vertical grid lines */}
          {xLabels.map((l) => (
            <line
              key={l.x}
              x1={toX(l.x)}
              y1={PAD.top}
              x2={toX(l.x)}
              y2={CHART_H - PAD.bottom}
              stroke="#E2E8F0"
              strokeWidth={0.6}
            />
          ))}

          {/* Frame 3+: Highlight zones */}
          {frame >= 2 &&
            highlightZones.map((zone, i) => (
              <motion.rect
                key={`zone-${i}`}
                x={toX(zone.x1)}
                y={PAD.top}
                width={toX(zone.x2) - toX(zone.x1)}
                height={PLOT_H}
                fill="rgba(239, 68, 68, 0.07)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}

          {/* Tolerance line */}
          <line
            x1={PAD.left}
            y1={tolY}
            x2={CHART_W - PAD.right}
            y2={tolY}
            stroke="#EF4444"
            strokeWidth={1}
            strokeDasharray="6,4"
            opacity={0.5}
          />
          <text
            x={CHART_W - PAD.right + 4}
            y={tolY + 4}
            fontSize={10}
            fill="#EF4444"
            fontWeight={500}
          >
            {TOLERANCE}°C
          </text>

          {/* Y-axis label */}
          <text
            x={12}
            y={CHART_H / 2}
            fontSize={10}
            fill="#94A3B8"
            textAnchor="middle"
            transform={`rotate(-90, 12, ${CHART_H / 2})`}
          >
            Temperature (°C)
          </text>

          {/* Y-axis values */}
          {[180, 190, 200].map((temp) => (
            <text
              key={temp}
              x={PAD.left - 8}
              y={toY(temp) + 4}
              fontSize={10}
              fill="#94A3B8"
              textAnchor="end"
            >
              {temp}
            </text>
          ))}

          {/* X-axis labels */}
          {xLabels.map((l) => (
            <text
              key={`label-${l.x}`}
              x={toX(l.x)}
              y={CHART_H - PAD.bottom + 18}
              fontSize={10}
              fill={l.label.startsWith("Day") ? "#334155" : "#94A3B8"}
              fontWeight={l.label.startsWith("Day") ? 600 : 400}
              textAnchor="middle"
            >
              {l.label}
            </text>
          ))}

          {/* Temperature line — always visible, draws on first view */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Frame 2+: Human observation stems (orange dashed lines from pill area to chart) */}
          {frame >= 1 &&
            humanMarkers.map((m, i) => (
              <motion.line
                key={`stem-${i}`}
                x1={toX(m.x)}
                y1={10}
                x2={toX(m.x)}
                y2={PAD.top}
                stroke="#E07A3D"
                strokeWidth={1}
                strokeDasharray="3,3"
                opacity={0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              />
            ))}

          {/* Frame 2+: Orange dots at top of plot area where stems meet the chart */}
          {frame >= 1 &&
            humanMarkers.map((m, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={toX(m.x)}
                cy={PAD.top}
                r={4}
                fill="#E07A3D"
                initial={{ opacity: 0, r: 0 }}
                animate={{ opacity: 1, r: 4 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
              />
            ))}

          {/* Frame 2+: Shift change markers — positioned at plot top, separate from human pills */}
          {frame >= 1 &&
            shiftMarkers.map((m, i) => (
              <motion.g
                key={`shift-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              >
                <line
                  x1={toX(m.x)}
                  y1={PAD.top}
                  x2={toX(m.x)}
                  y2={CHART_H - PAD.bottom}
                  stroke="#8B5CF6"
                  strokeWidth={1}
                  strokeDasharray="4,4"
                  opacity={0.5}
                />
                <rect
                  x={toX(m.x) - 16}
                  y={PAD.top + 4}
                  width={32}
                  height={18}
                  rx={4}
                  fill="#8B5CF6"
                />
                <text
                  x={toX(m.x)}
                  y={PAD.top + 16}
                  fontSize={10}
                  fill="white"
                  textAnchor="middle"
                  fontWeight={600}
                >
                  {m.label}
                </text>
              </motion.g>
            ))}

          {/* Frame 3+: Dashed connecting lines from observations to spikes */}
          {frame >= 2 && (
            <>
              <motion.line
                x1={toX(28)}
                y1={PAD.top + 5}
                x2={toX(32)}
                y2={toY(198)}
                stroke="#E07A3D"
                strokeWidth={1}
                strokeDasharray="4,3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.line
                x1={toX(65)}
                y1={PAD.top + 5}
                x2={toX(80)}
                y2={toY(197)}
                stroke="#E07A3D"
                strokeWidth={1}
                strokeDasharray="4,3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              />
            </>
          )}
        </svg>

        {/* Human observation pills — HTML overlays above SVG, absolutely positioned */}
        <AnimatePresence>
          {frame >= 1 &&
            humanMarkers.map((m, i) => (
              <motion.div
                key={`pill-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{
                  left: `${(toX(m.x) / CHART_W) * 100}%`,
                  top: `${(2 / CHART_H) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="bg-oppr-secondary text-white text-[9px] md:text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm flex items-center gap-1.5">
                  <UserCircle size={14} weight="fill" className="opacity-80" />
                  {m.label}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Missing Data callout — Frame 3+ */}
        <AnimatePresence>
          {frame >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                right: "3%",
                top: "5%",
              }}
            >
              <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-2.5 md:p-3 max-w-[150px] shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-500 text-[10px] font-bold flex items-center justify-center">?</span>
                  <span className="text-red-500 text-[10px] md:text-[11px] font-bold leading-tight">
                    Missing Data
                  </span>
                </div>
                <p className="text-[9px] md:text-[10px] text-text-secondary leading-snug">
                  No moisture reading logged at material intake
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* IDA speech bubble — Frame 4 */}
        <AnimatePresence>
          {frame >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute left-[5%] right-[5%] md:left-[10%] md:right-[10%] pointer-events-none"
              style={{ top: "35%" }}
            >
              <div className="bg-white/95 backdrop-blur-sm border border-border-light rounded-xl p-4 md:p-5 shadow-lg flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-ida flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-[9px] font-bold">IDA</span>
                </div>
                <p className="text-[11px] md:text-[13px] text-text-secondary leading-relaxed">
                  &ldquo;Temperature spikes correlate with damp granulate
                  reports. The moisture check at intake isn&apos;t being
                  logged&mdash;operators notice it, but there&apos;s no data
                  trail.{" "}
                  <strong className="text-text-primary">
                    Recommend: add a moisture check to the intake SOP.
                  </strong>
                  &rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption + frame navigation */}
      <div className="mt-4 flex items-center justify-between gap-4">
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
          {[0, 1, 2, 3].map((i) => (
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

export function UnifiedTimelineSection() {
  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="The Core Innovation"
        title="The Unified Timeline"
        subtitle={
          <>
            Human observations and machine data on one time axis.
            <br />
            <em>Correlatable. Queryable. Connected.</em>
          </>
        }
      />

      {/* Full-width animated chart */}
      <AnimatedSection>
        <TimelineAnimation />
      </AnimatedSection>

      {/* Info row below chart — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-[920px] mx-auto mt-14">
        <AnimatedSection direction="left">
          <h3 className="text-heading-3 font-serif text-text-primary mb-4">
            Why This Matters
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you investigate an issue today, you query your machine systems.
            You see the temperature spike at 2pm. But you don&apos;t see the
            operator&apos;s observation from 8am that &ldquo;the material looked
            different today.&rdquo;
          </p>
          <p className="text-text-secondary leading-relaxed">
            That observation exists&mdash;but it&apos;s trapped in someone&apos;s
            head, mentioned verbally at shift change, or scribbled in a notebook
            nobody reads.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <p className="text-text-secondary leading-relaxed mb-4">
            <strong className="text-text-primary">
              The unified timeline changes this.
            </strong>{" "}
            Every observation is timestamped, tagged to equipment, and available
            for correlation. When the temperature spikes, you see the human
            context that explains it.
          </p>
          <p className="text-text-secondary leading-relaxed italic border-l-2 border-oppr-secondary/40 pl-4">
            An operator&apos;s observation automatically links to machine data from
            two days later&mdash;revealing a cause-and-effect relationship that
            was always there, but never visible.
          </p>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}

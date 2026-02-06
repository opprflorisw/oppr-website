"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Microphone,
  Lightning,
  ChatText,
  GitMerge,
  MagnifyingGlass,
  FileText,
  QrCode,
  Brain,
  CheckCircle,
  Tag,
  UserCircle,
  TrendUp,
  ArrowRight,
  Camera,
  Warning,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

interface Highlight {
  icon: Icon;
  label: string;
  description: string;
}

interface DetailItem {
  icon: Icon;
  label: string;
  description: string;
}

interface Comparison {
  before: string;
  after: string;
  afterLabel: string;
}

interface ModuleData {
  id: string;
  pill: string;
  title: string;
  subtitle: string;
  color: string; // hex
  pillBg: string; // tailwind class
  pillText: string;
  highlights: Highlight[];
  frameCaptions: string[];
  detailHeading: string;
  detailItems: DetailItem[];
  comparison: Comparison;
}

const modules: ModuleData[] = [
  {
    id: "logs",
    pill: "LOGS",
    title: "Capture Knowledge in 20 Seconds",
    subtitle:
      "Operators speak what they notice — in any language. AI does the rest: transcription, structuring, tagging. Unlike unstructured feedback, LOGS creates a continuous stream of structured, tagged, time-stamped observations — the foundation for systematic analysis.",
    color: "#E07A3D",
    pillBg: "bg-[#E07A3D]/10",
    pillText: "text-[#E07A3D]",
    highlights: [
      {
        icon: Microphone,
        label: "Voice, photo & text capture",
        description: "Any language, auto-translated",
      },
      {
        icon: Tag,
        label: "AI structures automatically",
        description: "Equipment tags, timestamps, categories",
      },
      {
        icon: Lightning,
        label: "20 seconds, not 8 minutes",
        description: "Zero workflow disruption",
      },
    ],
    frameCaptions: [
      "Speak what you notice. Any language.",
      "AI transcribes, structures, and tags automatically.",
      "Every observation — findable, correlatable, permanent.",
    ],
    detailHeading: "What LOGS Captures",
    detailItems: [
      {
        icon: Microphone,
        label: "Voice observations",
        description: "Any language, any accent. AI transcribes and structures automatically.",
      },
      {
        icon: Camera,
        label: "Photo evidence",
        description: "Defects, gauge readings, equipment conditions. AI extracts data from images.",
      },
      {
        icon: CheckCircle,
        label: "Quality checks",
        description: "Structured or unstructured. Integrates with existing quality workflows.",
      },
      {
        icon: Warning,
        label: "Events and anomalies",
        description: "Downtime, near-misses, deviations. Captured in the moment.",
      },
    ],
    comparison: {
      before: "The operator mentioned something about the bearing at shift change. Nobody wrote it down. A week later, the bearing fails.",
      after: "The operator voice-logged \u2018Bearing on Line 3 sounds higher-pitched than normal\u2019 in 20 seconds. It\u2019s timestamped, tagged, and waiting to be correlated.",
      afterLabel: "With LOGS",
    },
  },
  {
    id: "ida",
    pill: "IDA",
    title: "Your AI Co-Pilot for Root Cause",
    subtitle:
      "Your AI investigation engine. Ask questions in plain language. IDA connects human observations with machine data to find root causes, surface patterns, and accelerate every investigation. This is where gut feelings become confirmed causes.",
    color: "#3B82F6",
    pillBg: "bg-[#3B82F6]/10",
    pillText: "text-[#3B82F6]",
    highlights: [
      {
        icon: ChatText,
        label: "Natural language queries",
        description: "No SQL, no dashboards needed",
      },
      {
        icon: GitMerge,
        label: "Cross-data correlation",
        description: "Human context meets machine data",
      },
      {
        icon: TrendUp,
        label: "Pattern detection",
        description: "Recurring issues surface automatically",
      },
    ],
    frameCaptions: [
      "Ask in plain language. No SQL. No dashboards.",
      "IDA connects human observations with machine data.",
      "Patterns surface automatically. Root cause in hours, not weeks.",
    ],
    detailHeading: "What IDA Does",
    detailItems: [
      {
        icon: ChatText,
        label: "Natural language queries",
        description: "Ask questions in plain language. No technical expertise required.",
      },
      {
        icon: GitMerge,
        label: "Cross-data correlation",
        description: "Connects human observations with machine data automatically.",
      },
      {
        icon: TrendUp,
        label: "Pattern detection",
        description: "Surfaces recurring themes, anomalies, and correlations.",
      },
      {
        icon: Lightning,
        label: "Root cause acceleration",
        description: "Finds the human context that explains machine data anomalies.",
      },
    ],
    comparison: {
      before: "Investigation takes weeks. Engineers dig through dashboards, interview operators, and still miss the human context that explains the data.",
      after: "Ask \u2018What happened before the quality drop on Line 2?\u2019 and IDA shows operator observations alongside machine data \u2014 root cause in hours, not weeks.",
      afterLabel: "With IDA",
    },
  },
  {
    id: "docs",
    pill: "DOCS",
    title: "Living Documentation at the Point of Work",
    subtitle:
      "The final piece of the execution loop. Procedures that update when better approaches are validated. Accessible via QR codes on equipment. Validated insights become permanent, living procedures accessible at the point of work.",
    color: "#10B981",
    pillBg: "bg-[#10B981]/10",
    pillText: "text-[#10B981]",
    highlights: [
      {
        icon: FileText,
        label: "Living procedures",
        description: "Updates from validated insights automatically",
      },
      {
        icon: QrCode,
        label: "QR code access",
        description: "Right info at the machine, instantly",
      },
      {
        icon: Brain,
        label: "Expertise preservation",
        description: "Knowledge stays when people leave",
      },
    ],
    frameCaptions: [
      "Scan. Get the right procedure. At the machine.",
      "Documentation updates when better approaches are validated.",
      "Expertise stays — even when people leave.",
    ],
    detailHeading: "What DOCS Provides",
    detailItems: [
      {
        icon: FileText,
        label: "Living procedures",
        description: "Documentation that updates from validated insights and actual practices.",
      },
      {
        icon: QrCode,
        label: "Point-of-work access",
        description: "QR codes on equipment link to relevant knowledge instantly.",
      },
      {
        icon: MagnifyingGlass,
        label: "Searchable knowledge base",
        description: "Find what you need with natural language search.",
      },
      {
        icon: Brain,
        label: "Expertise preservation",
        description: "Tacit knowledge captured and accessible to everyone.",
      },
    ],
    comparison: {
      before: "The procedure says one thing. What we actually do is different. New operators follow the procedure, get it wrong, then learn the \u2018real\u2019 way from colleagues.",
      after: "Documentation reflects what actually works. When the \u2018real\u2019 way proves better, it becomes the documented way. New operators learn the right approach from day one.",
      afterLabel: "With DOCS",
    },
  },
];

const FRAME_DURATION = 6000;

/* ══════════════════════════════════════════════════════════════
   LOGS ANIMATION FRAMES
   ══════════════════════════════════════════════════════════════ */

function LogsFrame0() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-[240px] md:w-[300px] bg-white rounded-2xl shadow-lg border border-[#E07A3D]/20 overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Phone header */}
        <div className="bg-[#E07A3D] px-5 py-3.5 flex items-center gap-2">
          <Microphone size={18} weight="fill" className="text-white" />
          <span className="text-white text-sm font-semibold">Voice Capture</span>
        </div>
        {/* Waveform area */}
        <div className="px-5 py-6 flex flex-col items-center gap-4">
          <div className="flex items-end gap-[3px] h-14">
            {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.3, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8].map((h, i) => (
              <motion.div
                key={i}
                className="w-[4px] rounded-full bg-[#E07A3D]"
                animate={{ height: [`${h * 100}%`, `${h * 40}%`, `${h * 100}%`] }}
                transition={{ duration: 0.8, delay: i * 0.06, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <p className="text-xs text-text-secondary text-center leading-snug italic">
            &quot;Bearing on Line 3 sounds higher than normal&quot;
          </p>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[11px] font-mono text-text-muted">Recording... 12s</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LogsFrame1() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-[280px] md:w-[340px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="px-5 py-3.5 border-b border-border-light flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 20 }}
          >
            <CheckCircle size={20} weight="fill" className="text-[#E07A3D]" />
          </motion.div>
          <span className="text-sm font-semibold text-text-primary">AI Structured</span>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: "Equipment", value: "Line 3 — Bearing", delay: 0.15 },
            { label: "Category", value: "Anomaly — Sound", delay: 0.25 },
            { label: "Timestamp", value: "14:32 · Dec 4, 2024", delay: 0.35 },
            { label: "Language", value: "EN (auto-detected)", delay: 0.45 },
            { label: "Priority", value: "Medium — Monitoring", delay: 0.55 },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, duration: 0.3 }}
            >
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                {item.label}
              </span>
              <span className="text-xs text-text-primary font-medium">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function LogsFrame2() {
  const entries = [
    { time: "14:32", text: "Bearing on Line 3 sounds higher than normal", tag: "Line 3", active: true },
    { time: "14:15", text: "Material batch looks different today", tag: "Intake", active: false },
    { time: "13:48", text: "Cleaned extruder head — ready for next run", tag: "Line 1", active: false },
    { time: "12:30", text: "Temperature fluctuation on cooling system", tag: "Line 2", active: false },
    { time: "11:55", text: "Unusual vibration during startup cycle", tag: "Line 3", active: false },
  ];

  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="px-5 py-3 border-b border-border-light bg-gray-50/50 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Recent Logs</span>
          <span className="text-[10px] text-text-muted font-medium">Today · 23 entries</span>
        </div>
        <div className="divide-y divide-border-light">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              className={`px-4 py-3 flex gap-3 ${entry.active ? "bg-[#E07A3D]/5" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
            >
              <UserCircle
                size={20}
                weight="fill"
                className={entry.active ? "text-[#E07A3D] shrink-0 mt-0.5" : "text-text-muted shrink-0 mt-0.5"}
              />
              <div className="min-w-0">
                <p className={`text-xs leading-snug truncate ${entry.active ? "text-text-primary font-medium" : "text-text-secondary"}`}>
                  {entry.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-text-muted">{entry.time}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${entry.active ? "bg-[#E07A3D]/15 text-[#E07A3D]" : "bg-gray-100 text-text-muted"}`}>
                    {entry.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   IDA ANIMATION FRAMES
   ══════════════════════════════════════════════════════════════ */

function IdaFrame0() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Chat header */}
        <div className="px-5 py-3 border-b border-border-light bg-[#3B82F6] flex items-center gap-2">
          <MagnifyingGlass size={16} weight="bold" className="text-white" />
          <span className="text-sm font-semibold text-white">IDA — Investigation Assistant</span>
        </div>
        <div className="p-5 space-y-4">
          {/* User message */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            <div className="bg-[#3B82F6]/10 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
              <p className="text-xs text-text-primary leading-snug">
                What happened before the quality drop on Line 2?
              </p>
            </div>
          </motion.div>
          {/* IDA response preview */}
          <motion.div
            className="flex items-start gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35 }}
          >
            <div className="w-6 h-6 rounded-full bg-[#3B82F6]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Lightning size={12} weight="fill" className="text-[#3B82F6]" />
            </div>
            <div className="bg-gray-50 rounded-xl rounded-bl-sm px-4 py-2.5 flex-1">
              <p className="text-xs text-text-secondary leading-snug mb-2">
                Analyzing 142 observations and machine data...
              </p>
              {/* Typing indicator */}
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.5, delay: i * 0.12, repeat: Infinity, repeatDelay: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function IdaFrame1() {
  const events = [
    { label: "Material change noted", color: "#E07A3D", type: "human", time: "09:15" },
    { label: "Temp spike +12°C", color: "#EF4444", type: "machine", time: "09:42" },
    { label: "Quality drop", color: "#3B82F6", type: "alert", time: "10:01" },
  ];

  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="px-5 py-3 border-b border-border-light flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">
            Timeline Analysis
          </span>
          <span className="text-[10px] text-[#3B82F6] font-medium">Line 2 · Today</span>
        </div>
        <div className="p-5">
          {/* Mini timeline */}
          <div className="relative py-8">
            <div className="absolute top-1/2 left-6 right-6 h-px bg-border-light -translate-y-1/2" />
            <div className="flex justify-between relative px-3">
              {events.map((evt, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 0.35 }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 bg-white"
                    style={{ borderColor: evt.color }}
                  />
                  <p className="text-[10px] text-text-primary font-medium text-center leading-tight max-w-[80px]">
                    {evt.label}
                  </p>
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${evt.color}15`, color: evt.color }}
                    >
                      {evt.type}
                    </span>
                    <span className="text-[9px] text-text-muted">{evt.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Connecting arrows */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${28 + i * 33}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <ArrowRight size={12} className="text-text-muted" />
              </motion.div>
            ))}
          </div>
          {/* Correlation badge */}
          <motion.div
            className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-lg px-4 py-2.5 text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <p className="text-xs text-[#3B82F6] font-semibold">
              3 events correlated across 45 minutes
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">
              Human observation preceded machine alert by 27 min
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function IdaFrame2() {
  const bars = [
    { label: "Batch A", height: "30%", value: "12%", highlight: false },
    { label: "Batch B", height: "85%", value: "73%", highlight: true },
    { label: "Batch C", height: "20%", value: "8%", highlight: false },
    { label: "Batch D", height: "45%", value: "31%", highlight: false },
  ];

  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-[#3B82F6]/20 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="px-5 py-3.5 border-b border-border-light">
          <div className="flex items-center gap-2 mb-1">
            <TrendUp size={16} weight="bold" className="text-[#3B82F6]" />
            <span className="text-sm font-bold text-text-primary">Recurring Pattern Found</span>
          </div>
          <p className="text-xs text-text-secondary leading-snug">
            Material batch changes correlate with quality drops in 73% of cases
          </p>
        </div>
        <div className="p-5">
          {/* Mini bar chart */}
          <div className="flex items-end gap-3 h-24 mb-2">
            {bars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.span
                  className="text-[10px] font-bold"
                  style={{ color: bar.highlight ? "#3B82F6" : "#9ca3af" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {bar.value}
                </motion.span>
                <motion.div
                  className="w-full rounded-t"
                  style={{ backgroundColor: bar.highlight ? "#3B82F6" : "#3B82F640" }}
                  initial={{ height: 0 }}
                  animate={{ height: bar.height }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                />
                <span className="text-[9px] text-text-muted font-medium">{bar.label}</span>
              </div>
            ))}
          </div>
          <motion.div
            className="flex items-center gap-2 text-[10px] text-text-muted justify-center mb-4 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
            <span>Strong correlation</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]/25 ml-2" />
            <span>Weak correlation</span>
          </motion.div>
          <motion.button
            className="w-full bg-[#3B82F6] text-white text-xs font-semibold py-2.5 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Create Investigation →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DOCS ANIMATION FRAMES
   ══════════════════════════════════════════════════════════════ */

function DocsFrame0() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <div className="relative">
        {/* QR code */}
        <motion.div
          className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] bg-white rounded-xl border-2 border-[#10B981]/30 flex flex-col items-center justify-center shadow-sm gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <QrCode size={72} weight="regular" className="text-[#10B981]" />
          <span className="text-[10px] font-semibold text-text-muted">Scan at machine</span>
        </motion.div>
        {/* Phone scanning result */}
        <motion.div
          className="absolute -right-24 md:-right-32 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-[120px] md:w-[150px] bg-white rounded-xl shadow-lg border border-border-light p-3">
            <div className="bg-[#10B981]/10 rounded-lg p-2.5 mb-2">
              <FileText size={20} weight="duotone" className="text-[#10B981] mx-auto" />
            </div>
            <p className="text-[10px] font-semibold text-text-primary leading-tight text-center">
              SOP-042
            </p>
            <p className="text-[9px] text-text-muted text-center mb-2">
              Line 3 Startup
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-[8px] bg-[#10B981]/15 text-[#10B981] font-bold px-1.5 py-0.5 rounded-full">
                v3.2
              </span>
              <span className="text-[8px] text-text-muted">Updated 2d ago</span>
            </div>
          </div>
        </motion.div>
        {/* Scan line animation */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-[#10B981]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.4 }}
        />
      </div>
    </div>
  );
}

function DocsFrame1() {
  const steps = [
    { num: 1, text: "Verify safety lockout", status: "done" },
    { num: 2, text: "Check material feeder alignment", status: "updated" },
    { num: 3, text: "Set temperature to 192°C", status: "normal" },
    { num: 4, text: "Run test cycle for 3 minutes", status: "normal" },
    { num: 5, text: "Verify output quality before full run", status: "normal" },
  ];

  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="px-5 py-3 border-b border-border-light flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">SOP-042: Startup Procedure</span>
          <motion.span
            className="text-[9px] bg-[#10B981]/15 text-[#10B981] font-bold px-2 py-0.5 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
          >
            UPDATED
          </motion.span>
        </div>
        <div className="p-4 space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`flex items-start gap-2.5 px-3 py-2 rounded-lg ${step.status === "updated" ? "bg-[#10B981]/5 border border-[#10B981]/20" : ""}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.3 }}
            >
              <span className={`text-xs font-bold mt-px ${step.status === "updated" ? "text-[#10B981]" : step.status === "done" ? "text-text-muted line-through" : "text-text-muted"}`}>
                {step.num}.
              </span>
              <div className="flex-1">
                <p className={`text-xs leading-snug ${step.status === "updated" ? "text-text-primary font-medium" : step.status === "done" ? "text-text-muted" : "text-text-secondary"}`}>
                  {step.text}
                </p>
                {step.status === "updated" && (
                  <motion.p
                    className="text-[9px] text-[#10B981] font-semibold mt-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    ↑ Updated from validated operator feedback
                  </motion.p>
                )}
              </div>
              {step.status === "done" && (
                <CheckCircle size={14} weight="fill" className="text-[#10B981]/40 shrink-0 mt-0.5" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DocsFrame2() {
  return (
    <div className="flex items-center justify-center h-full px-3">
      <motion.div
        className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Search bar */}
        <div className="px-4 py-3 border-b border-border-light">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <MagnifyingGlass size={14} className="text-text-muted" />
            <motion.span
              className="text-xs text-text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              How do we handle humid conditions on Line 3?
            </motion.span>
          </div>
        </div>
        {/* Result */}
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <UserCircle size={22} weight="fill" className="text-[#10B981]" />
            <div>
              <p className="text-xs font-semibold text-text-primary">Best practices found</p>
              <p className="text-[10px] text-text-muted">From 47 operator observations</p>
            </div>
          </div>
          <div className="space-y-2 ml-1">
            {[
              "Reduce feed rate by 8% when humidity > 65%",
              "Pre-dry granulate for 20 min in morning shift",
              "Check extruder temp every 30 min during rain",
            ].map((tip, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.25 }}
              >
                <CheckCircle size={14} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-snug">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODULE ANIMATION WRAPPER
   ══════════════════════════════════════════════════════════════ */

const frameComponents: Record<string, React.FC[]> = {
  logs: [LogsFrame0, LogsFrame1, LogsFrame2],
  ida: [IdaFrame0, IdaFrame1, IdaFrame2],
  docs: [DocsFrame0, DocsFrame1, DocsFrame2],
};

function ModuleAnimation({
  moduleId,
  color,
  captions,
}: {
  moduleId: string;
  color: string;
  captions: string[];
}) {
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

  const frames = frameComponents[moduleId];
  const FrameComp = frames[frame];

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: `${color}08` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animation area */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(320px, 38vw, 440px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={frame}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <FrameComp />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption + dots */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={frame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs md:text-sm text-text-secondary italic flex-1"
          >
            {captions[frame]}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1.5 shrink-0">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setFrame(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: frame === i ? color : "#e5e7eb",
                transform: frame === i ? "scale(1.25)" : "scale(1)",
              }}
              aria-label={`Frame ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODULE BLOCK (text + visual, alternating)
   ══════════════════════════════════════════════════════════════ */

function ModuleBlock({
  module,
  reversed,
}: {
  module: ModuleData;
  reversed: boolean;
}) {
  return (
    <div id={module.id} className="scroll-mt-24">
      <AnimatedSection>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-[1100px] mx-auto`}
        >
          {/* Text column */}
          <div className={reversed ? "lg:order-2" : ""}>
            {/* Module pill */}
            <span
              className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${module.pillBg} ${module.pillText}`}
            >
              {module.pill}
            </span>

            <h3 className="text-2xl md:text-3xl font-serif text-text-primary mb-3 leading-tight">
              {module.title}
            </h3>

            <p className="text-text-secondary leading-relaxed mb-6">
              {module.subtitle}
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {module.highlights.map((hl) => {
                const HlIcon = hl.icon;
                return (
                  <div key={hl.label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${module.color}12` }}
                    >
                      <HlIcon size={18} weight="duotone" style={{ color: module.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {hl.label}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {hl.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual column */}
          <div className={reversed ? "lg:order-1" : ""}>
            <ModuleAnimation
              moduleId={module.id}
              color={module.color}
              captions={module.frameCaptions}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Detail items grid */}
      <AnimatedSection>
        <div className="max-w-[1100px] mx-auto mt-10">
          <h4
            className="text-lg font-semibold text-text-primary mb-5"
            style={{ color: module.color }}
          >
            {module.detailHeading}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {module.detailItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border-light"
                  style={{ borderLeftWidth: 3, borderLeftColor: `${module.color}40` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${module.color}10` }}
                  >
                    <ItemIcon size={18} weight="duotone" style={{ color: module.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Before / After comparison */}
      <AnimatedSection>
        <div className="max-w-[1100px] mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50/50">
              <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                Before
              </p>
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;{module.comparison.before}&rdquo;
              </p>
            </div>
            <div
              className="p-5 rounded-xl border-2"
              style={{
                borderColor: `${module.color}30`,
                backgroundColor: `${module.color}05`,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: module.color }}
              >
                {module.comparison.afterLabel}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;{module.comparison.after}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════════ */

export function ModulesSection() {
  return (
    <SectionWrapper bg="white" id="modules">
      <SectionHeader
        label="The Platform"
        title="Three Modules, One Workflow"
        subtitle="From capture to action. Each module serves a purpose. Together, they close the loop."
      />

      <div className="space-y-20 md:space-y-28">
        {modules.map((m, i) => (
          <ModuleBlock key={m.id} module={m} reversed={i % 2 === 1} />
        ))}
      </div>
    </SectionWrapper>
  );
}

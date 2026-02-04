"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { EASE_SMOOTH_OUT, EASE_SNAP } from "@/lib/animations";

type EventType = "human" | "machine" | "correlation" | "outcome";

interface TimelineEvent {
  type: EventType;
  time: string;
  label: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    type: "human",
    time: "Day -7",
    label: "Operator Observation",
    description: '"Bearing on Line 3 sounds higher-pitched than normal"',
  },
  {
    type: "machine",
    time: "Day -5",
    label: "Machine Data",
    description: "Vibration sensor: +5% above baseline",
  },
  {
    type: "machine",
    time: "Day -3",
    label: "Machine Data",
    description: "Vibration sensor: +12% above baseline",
  },
  {
    type: "correlation",
    time: "Day -1",
    label: "AI Correlation",
    description:
      "Pattern detected: Human observations + machine trend aligned. Maintenance alert triggered.",
  },
  {
    type: "outcome",
    time: "Day 0",
    label: "Outcome",
    description:
      "Bearing replaced during scheduled maintenance. Failure prevented.",
  },
];

const typeStyles: Record<EventType, { dot: string; badge: string }> = {
  human: {
    dot: "bg-logs",
    badge: "bg-logs/10 text-logs",
  },
  machine: {
    dot: "bg-ida",
    badge: "bg-ida/10 text-ida",
  },
  correlation: {
    dot: "bg-accent-purple",
    badge: "bg-accent-purple/10 text-accent-purple",
  },
  outcome: {
    dot: "bg-docs",
    badge: "bg-docs/10 text-docs",
  },
};

const eventVariant: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_SMOOTH_OUT },
  },
};

export function BearingTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-elevated">
      {/* Header */}
      <div className="bg-gradient-to-r from-oppr-dark to-oppr-primary px-6 py-4">
        <h4 className="text-white font-semibold text-base">
          See it in action: The Bearing Story
        </h4>
      </div>

      {/* Timeline */}
      <div className="p-6 relative">
        {/* Animated vertical progress line */}
        <motion.div
          className="absolute left-[2.25rem] top-6 w-0.5 bg-gradient-to-b from-logs via-ida to-docs origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: EASE_SMOOTH_OUT }}
          style={{ bottom: "6rem" }}
        />

        <div className="space-y-5">
          {events.map((event, i) => (
            <motion.div
              key={`${event.time}-${event.type}`}
              variants={eventVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{
                delay: i * 0.2 + 0.3,
              }}
              className="flex gap-4 relative"
            >
              {/* Dot with glow */}
              <div className="flex-shrink-0 w-[18px] h-[18px] mt-1 relative z-10">
                <motion.div
                  className={cn(
                    "w-full h-full rounded-full border-[3px] border-white",
                    typeStyles[event.type].dot
                  )}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.3, ease: EASE_SNAP }}
                />
                {/* Glow effect */}
                <motion.div
                  className={cn(
                    "absolute inset-[-4px] rounded-full opacity-0",
                    typeStyles[event.type].dot
                  )}
                  animate={inView ? { opacity: [0, 0.4, 0] } : {}}
                  transition={{ delay: i * 0.2 + 0.4, duration: 0.8 }}
                  style={{ filter: "blur(6px)" }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono font-semibold text-text-muted">
                    {event.time}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                      typeStyles[event.type].badge
                    )}
                  >
                    {event.label}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result — with shimmer and counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.4, duration: 0.6, ease: EASE_SMOOTH_OUT }}
          className="mt-6 p-5 rounded-xl bg-gradient-to-r from-oppr-primary to-oppr-dark text-white flex items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 shimmer" />
          <span className="text-3xl font-serif font-normal relative z-10">
            &euro;<AnimatedCounter target={55000} className="font-mono" />
          </span>
          <span className="text-sm text-white/80 max-w-[300px] relative z-10">
            Saved by connecting the dots that would otherwise be invisible
          </span>
        </motion.div>
      </div>
    </div>
  );
}

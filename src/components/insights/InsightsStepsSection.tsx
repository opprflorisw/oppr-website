"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Question,
  Microphone,
  ChartBar,
  Check,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Icon } from "@phosphor-icons/react";

interface Step {
  number: number;
  title: string;
  description: string;
  checks: string[];
  icon: Icon;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Create Your Topic",
    description:
      "Define the question or challenge you want input on. Invite contributors from any department, shift, or location.",
    checks: [
      "Ask focused questions",
      "Invite specific groups or everyone",
      "Set deadlines or keep open",
    ],
    icon: Question,
  },
  {
    number: 2,
    title: "Gather Feedback",
    description:
      "Contributors respond via voice, text, or photos—in any language. Input is captured asynchronously whenever it's convenient.",
    checks: [
      "Voice, text, or image input",
      "Any language auto-translated",
      "Asynchronous—no meetings needed",
    ],
    icon: Microphone,
  },
  {
    number: 3,
    title: "Get AI-Powered Insights",
    description:
      "AI analyzes all responses, identifies patterns, surfaces themes, and delivers actionable insights—no manual analysis required.",
    checks: [
      "Automatic theme detection",
      "Sentiment analysis",
      "Exportable reports",
    ],
    icon: ChartBar,
  },
];

const CYCLE_DURATION = 6000; // ms per tab

export function InsightsStepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const advance = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    setProgress(0);
  }, []);

  // Progress ticker
  useEffect(() => {
    if (isPaused || !isInView) return;

    const tick = 30; // ms between updates
    const increment = (tick / CYCLE_DURATION) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          advance();
          return 0;
        }
        return next;
      });
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, isInView, advance]);

  const handleTabClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  const activeData = steps[activeStep];
  const IconComponent = activeData.icon;

  return (
    <SectionWrapper bg="light" id="how-it-works">
      <SectionHeader
        label="How It Works"
        title="From Question to Insight in Three Steps"
      />

      <div
        ref={sectionRef}
        className="max-w-[800px] mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Tabs with progress bars */}
        <div className="grid grid-cols-3 gap-3 mb-0">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = i < activeStep;

            return (
              <button
                key={step.number}
                onClick={() => handleTabClick(i)}
                className={`relative text-left px-4 pt-4 pb-5 rounded-t-xl transition-colors duration-200 ${
                  isActive
                    ? "bg-white shadow-sm"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? "text-oppr-primary" : "text-text-muted"
                    }`}
                  >
                    Step {step.number}
                  </span>
                </div>
                <p
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {step.title}
                </p>

                {/* Progress bar track */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-oppr-primary rounded-full transition-none"
                    style={{
                      width: isActive
                        ? `${progress}%`
                        : isCompleted
                        ? "100%"
                        : "0%",
                      transition: isActive ? "none" : "width 0.3s ease",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Content card */}
        <div className="bg-white rounded-b-2xl rounded-tr-none border border-border-light border-t-0 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-oppr-primary/10 to-oppr-primary/5 flex items-center justify-center shrink-0">
                  <IconComponent
                    size={32}
                    weight="duotone"
                    className="text-oppr-primary"
                  />
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {activeData.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-5">
                    {activeData.description}
                  </p>
                  <ul className="space-y-2.5">
                    {activeData.checks.map((check, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2.5 text-sm text-text-secondary"
                      >
                        <Check
                          size={16}
                          weight="bold"
                          className="text-oppr-primary shrink-0"
                        />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}

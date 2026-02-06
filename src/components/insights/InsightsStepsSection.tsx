"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Question,
  Microphone,
  ChartBar,
  ChatTeardropDots,
  Check,
  Star,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Icon } from "@phosphor-icons/react";

interface Step {
  number: number;
  title: string;
  tabDescription: string;
  description: string;
  checks: string[];
  icon: Icon;
  image: string;
  isBonus?: boolean;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Create Your Topic",
    tabDescription: "Define your question and invite contributors",
    description:
      "Define the question or challenge you want input on. Invite contributors from any department, shift, or location.",
    checks: [
      "Ask focused questions",
      "Invite specific groups or everyone",
      "Set deadlines or keep open",
    ],
    icon: Question,
    image: "/images/create_topic.png",
  },
  {
    number: 2,
    title: "Gather Feedback",
    tabDescription: "Collect voice, text, or photo responses",
    description:
      "Contributors respond via voice, text, or photos—in any language. Input is captured asynchronously whenever it's convenient.",
    checks: [
      "Voice, text, or image input",
      "Any language auto-translated",
      "Asynchronous—no meetings needed",
    ],
    icon: Microphone,
    image: "/images/collect_feedback.png",
  },
  {
    number: 3,
    title: "Analyze Your Data",
    tabDescription: "AI structures and surfaces patterns",
    description:
      "AI structures all responses, identifies themes, surfaces patterns, and organizes loose ideas into clear priorities — giving you a structured starting point for action.",
    checks: [
      "Automatic theme detection",
      "Sentiment analysis",
      "Exportable reports",
    ],
    icon: ChartBar,
    image: "/images/analyze_work.png",
  },
  {
    number: 4,
    title: "Talk to Your Data",
    tabDescription: "Ask follow-up questions conversationally",
    description:
      "Go beyond reports — ask follow-up questions, drill into themes, and explore your data conversationally. AI lets you interact with collected insights as if you're having a dialogue with your entire organization.",
    checks: [
      "Ask follow-up questions naturally",
      "Drill into specific themes or groups",
      "Get instant answers from all responses",
    ],
    icon: ChatTeardropDots,
    image: "/images/talk_to_data.png",
    isBonus: true,
  },
];

const CYCLE_DURATION = 6000; // ms per tab

export function InsightsStepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Simple requestAnimationFrame loop — steps 0 → 1 → 2 → 3 → 0 → ...
  useEffect(() => {
    if (isPaused || !isInView) return;

    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / CYCLE_DURATION) * 100, 100);

      setProgress(pct);

      if (elapsed >= CYCLE_DURATION) {
        // Advance to next step: 0 → 1 → 2 → 3 → 0
        setActiveStep((prev) => (prev + 1) % steps.length);
        setProgress(0);
        startTimeRef.current = Date.now();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, isInView]);

  const handleTabClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
    startTimeRef.current = Date.now();
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
        className="w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Tabs with icons, descriptions, and progress bars */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-0">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = i < activeStep;
            const StepIcon = step.icon;

            return (
              <button
                key={step.number}
                onClick={() => handleTabClick(i)}
                className={`relative text-left px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5 rounded-t-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-md -translate-y-0.5"
                    : isCompleted
                    ? "bg-white/60 hover:bg-white/80"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              >
                {/* Step label + icon row */}
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {step.isBonus ? (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                          isActive ? "text-oppr-secondary" : "text-text-muted"
                        }`}
                      >
                        <Star size={12} weight="fill" className={isActive ? "text-oppr-secondary" : "text-text-muted"} />
                        Bonus
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                          isActive ? "text-oppr-primary" : "text-text-muted"
                        }`}
                      >
                        Step {step.number}
                      </span>
                    )}
                  </div>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? step.isBonus
                        ? "bg-oppr-secondary/10"
                        : "bg-oppr-primary/10"
                      : "bg-transparent"
                  }`}>
                    <StepIcon
                      size={15}
                      weight={isActive ? "duotone" : "regular"}
                      className={`transition-colors duration-200 ${
                        isActive
                          ? step.isBonus ? "text-oppr-secondary" : "text-oppr-primary"
                          : "text-text-muted"
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <p
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-200 leading-tight mb-1 ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {step.title}
                </p>

                {/* Short description — visible on larger screens */}
                <p
                  className={`hidden sm:block text-[11px] leading-snug transition-colors duration-200 ${
                    isActive ? "text-text-secondary" : "text-text-muted"
                  }`}
                >
                  {step.tabDescription}
                </p>

                {/* Progress bar track */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border-light rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      step.isBonus ? "bg-oppr-secondary" : "bg-oppr-primary"
                    }`}
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

        {/* Content card — text row + full-width screenshot */}
        <div className="bg-white rounded-b-2xl rounded-tr-none border border-border-light border-t-0 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Text content — 3-column layout + magnify button */}
              <div className="px-5 pt-4 pb-3 border-b border-border-light/40">
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 items-start">
                    {/* Col 1: Icon + Title */}
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        activeData.isBonus
                          ? "bg-gradient-to-br from-oppr-secondary/15 to-oppr-secondary/5"
                          : "bg-gradient-to-br from-oppr-primary/10 to-oppr-primary/5"
                      }`}>
                        <IconComponent
                          size={18}
                          weight="duotone"
                          className={activeData.isBonus ? "text-oppr-secondary" : "text-oppr-primary"}
                        />
                      </div>
                      <h3 className="text-[15px] font-semibold text-text-primary leading-snug">
                        {activeData.title}
                      </h3>
                    </div>

                    {/* Col 2: Description */}
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {activeData.description}
                    </p>

                    {/* Col 3: Checklist */}
                    <ul className="space-y-1.5">
                      {activeData.checks.map((check, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-[13px] text-text-secondary"
                        >
                          <Check
                            size={13}
                            weight="bold"
                            className={`shrink-0 ${
                              activeData.isBonus ? "text-oppr-secondary" : "text-oppr-primary"
                            }`}
                          />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Magnify button — right side */}
                  <div
                    className="shrink-0 self-center"
                    onMouseEnter={() => setIsImageHovered(true)}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isImageHovered
                        ? "bg-oppr-primary text-white scale-110 shadow-md"
                        : "bg-bg-light text-text-muted hover:bg-oppr-primary/10 hover:text-oppr-primary"
                    }`}>
                      <MagnifyingGlassPlus size={18} weight="bold" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot — full width */}
              <div className="bg-[#f8f9fb] p-2">
                <Image
                  src={activeData.image}
                  alt={`${activeData.title} screenshot`}
                  width={1600}
                  height={1000}
                  className="w-full h-auto object-contain"
                  quality={90}
                />
              </div>

              {/* Floating enlarged image — fixed, no backdrop, just the image */}
              <AnimatePresence>
                {isImageHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      className="pointer-events-auto"
                      style={{ maxWidth: "85vw", maxHeight: "85vh" }}
                      onMouseLeave={() => setIsImageHovered(false)}
                    >
                      <Image
                        src={activeData.image}
                        alt={`${activeData.title} screenshot — enlarged`}
                        width={2400}
                        height={1500}
                        className="w-auto h-auto object-contain drop-shadow-2xl"
                        style={{ maxWidth: "85vw", maxHeight: "85vh" }}
                        quality={95}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { EASE_SMOOTH_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { examples } from "./examplesData";
import { ExampleViewerContent } from "./ExampleViewerContent";

const categoryThemes: Record<string, { base: string; light: string; border: string }> = {
  maintenance: { base: "#6366F1", light: "rgba(99,102,241,0.05)", border: "rgba(99,102,241,0.2)" },
  quality: { base: "#D97706", light: "rgba(217,119,6,0.05)", border: "rgba(217,119,6,0.2)" },
  knowledge: { base: "#DB2777", light: "rgba(219,39,119,0.05)", border: "rgba(219,39,119,0.2)" },
  efficiency: { base: "#059669", light: "rgba(5,150,105,0.05)", border: "rgba(5,150,105,0.2)" },
};

export function ExamplesViewer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % examples.length;
    setDirection(1);
    setActiveIndex(next);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + examples.length) % examples.length;
    setDirection(-1);
    setActiveIndex(prev);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <SectionWrapper bg="light">
      <div
        className="max-w-none"
        role="region"
        aria-label="Example scenarios viewer"
      >
        {/* Category Buttons (Horizontal & Compact) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-w-[1100px] mx-auto">
          {examples.map((ex, i) => {
            const isActive = activeIndex === i;
            const Icon = ex.icon;
            const theme = categoryThemes[ex.category] || categoryThemes.maintenance;

            return (
              <button
                key={ex.title}
                onClick={() => goTo(i)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 group overflow-hidden",
                  isActive
                    ? "bg-white shadow-sm ring-1"
                    : "bg-white/40 border-slate-100 hover:bg-white hover:border-slate-200"
                )}
                style={{
                  borderColor: isActive ? theme.base : undefined,
                  boxShadow: isActive ? `0 4px 12px ${theme.base}15` : undefined,
                  outlineColor: isActive ? `${theme.base}40` : undefined,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? theme.base : theme.light,
                    color: isActive ? "white" : theme.base
                  }}
                >
                  <Icon size={16} weight={isActive ? "bold" : "duotone"} />
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider truncate",
                    isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                  )}>
                    {ex.categoryLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Viewer panel */}
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm">
          <div
            className="p-6 md:p-10"
            role="tabpanel"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
              >
                <ExampleViewerContent example={examples[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation bar */}
          <div className="border-t border-border-light bg-bg-light/30 px-6 md:px-10 py-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-oppr-primary transition-colors group"
              aria-label="Previous example"
            >
              <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {examples.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Example ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "bg-oppr-primary w-7"
                      : "bg-border-medium hover:bg-oppr-primary/40 w-2"
                  )}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-oppr-primary transition-colors group"
              aria-label="Next example"
            >
              <span className="hidden sm:inline">Next</span>
              <CaretRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}


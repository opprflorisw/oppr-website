"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight, CaretDown } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { EASE_SMOOTH_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { examples } from "./examplesData";
import { ExampleViewerContent } from "./ExampleViewerContent";

const categoryColors: Record<string, string> = {
  maintenance: "bg-[#6366F1]",
  quality: "bg-[#F59E0B]",
  knowledge: "bg-[#EC4899]",
  efficiency: "bg-[#10B981]",
};

export function ExamplesViewer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setDropdownOpen(false);
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
      if (e.key === "Escape") setDropdownOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

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

  const active = examples[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <SectionWrapper bg="light">
      <div
        className="max-w-none"
        role="region"
        aria-label="Example scenarios viewer"
      >
        {/* Dropdown selector */}
        <div ref={dropdownRef} className="relative mb-6">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-3 bg-white border border-border-light rounded-xl px-5 py-4 hover:border-oppr-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${active.iconGradient} flex items-center justify-center flex-shrink-0`}
              >
                <ActiveIcon size={20} weight="duotone" className="text-white" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-base font-semibold text-text-primary truncate">
                  {active.title}
                </p>
                <p className="text-xs text-text-muted">{active.categoryLabel}</p>
              </div>
            </div>
            <CaretDown
              size={18}
              weight="bold"
              className={cn(
                "text-text-muted flex-shrink-0 transition-transform duration-200",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-border-light rounded-xl shadow-lg overflow-hidden"
              >
                {examples.map((ex, i) => {
                  const ExIcon = ex.icon;
                  return (
                    <button
                      key={ex.title}
                      onClick={() => goTo(i)}
                      className={cn(
                        "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors",
                        activeIndex === i
                          ? "bg-bg-light"
                          : "hover:bg-bg-light/50",
                        i !== examples.length - 1 && "border-b border-border-light/50"
                      )}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${ex.iconGradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <ExIcon size={18} weight="duotone" className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn(
                          "text-sm truncate",
                          activeIndex === i
                            ? "font-semibold text-text-primary"
                            : "font-medium text-text-secondary"
                        )}>
                          {ex.title}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[10px] font-semibold rounded-full flex-shrink-0 uppercase tracking-wider",
                          categoryColors[ex.category]
                            ? `${categoryColors[ex.category]}/10 text-text-muted`
                            : "bg-oppr-primary/10 text-oppr-primary"
                        )}
                        style={{
                          backgroundColor:
                            ex.category === "maintenance" ? "rgba(99,102,241,0.1)" :
                              ex.category === "quality" ? "rgba(245,158,11,0.1)" :
                                ex.category === "knowledge" ? "rgba(236,72,153,0.1)" :
                                  ex.category === "efficiency" ? "rgba(16,185,129,0.1)" :
                                    undefined,
                          color:
                            ex.category === "maintenance" ? "#6366F1" :
                              ex.category === "quality" ? "#D97706" :
                                ex.category === "knowledge" ? "#DB2777" :
                                  ex.category === "efficiency" ? "#059669" :
                                    undefined,
                        }}
                      >
                        {ex.categoryLabel}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Viewer panel */}
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
          <div
            className="p-6 md:p-8"
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
          <div className="border-t border-border-light px-6 md:px-8 py-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Previous example"
            >
              <CaretLeft size={16} weight="bold" />
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
                    "h-2 rounded-full transition-all duration-200",
                    activeIndex === i
                      ? "bg-oppr-primary w-6"
                      : "bg-border-medium hover:bg-text-muted w-2"
                  )}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Next example"
            >
              <span className="hidden sm:inline">Next</span>
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

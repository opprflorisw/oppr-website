"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, CaretDown, Play } from "@phosphor-icons/react";
import { HeroAnimation } from "./HeroAnimation";
import { EASE_SMOOTH_OUT } from "@/lib/animations";
import { VideoModal } from "@/components/shared/VideoModal";

/* ── Hand-drawn underline stroke beneath a word ── */
function StrokeUnderline({
  children,
  color = "#E07A3D",
  delay = 0,
}: {
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  return (
    <span className="relative inline-block">
      <span className="relative z-[1]">{children}</span>
      {/* SVG underline — sits behind the text so descenders (y, g, etc.) appear on top */}
      <motion.svg
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        className="absolute left-[-2%] bottom-[-0.05em] w-[104%] h-[0.14em] pointer-events-none z-0"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 1 5.5 Q 50 2.5, 99 5.5"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.15, delay },
          }}
        />
      </motion.svg>
    </span>
  );
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH_OUT },
  },
};

const YOUTUBE_VIDEO_ID = "kZsbxEuO0xs";

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <section className="relative flex items-center gradient-mesh-hero pt-[72px] overflow-hidden">

        <div className="container-wide py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-[560px]"
            >
              <motion.div variants={fadeUp} className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-oppr-secondary">
                  The Digital Operator Platform
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.06em] text-text-muted mt-1">
                  Adding the Human Data Layer to Manufacturing
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-display-1 font-serif text-text-primary mb-6"
              >
                The <StrokeUnderline delay={0.5}>what</StrokeUnderline> from machines.
                <br />
                The <StrokeUnderline delay={0.7}>why</StrokeUnderline> from people.
                <br />
                <span className="text-gradient-warm">Together.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-text-secondary leading-relaxed mb-8 max-w-[500px]"
              >
                You&apos;ve invested millions capturing machine data. The human
                knowledge that explains it? That&apos;s never been captured
                properly. Until now.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg border-2 border-oppr-primary hover:bg-oppr-dark hover:border-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-glow-primary"
                >
                  Book a Demo
                </Link>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group inline-flex items-center gap-2 px-5 py-3 text-base font-semibold text-text-secondary hover:text-oppr-primary transition-all cursor-pointer"
                >
                  <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-text-muted/10 group-hover:bg-oppr-primary/10 transition-colors">
                    <Play size={16} weight="fill" className="text-text-secondary group-hover:text-oppr-primary ml-0.5 transition-colors" />
                  </span>
                  Watch Video
                </button>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-oppr-primary rounded-lg border-2 border-transparent hover:bg-bg-subtle transition-all"
                >
                  See How It Works
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated hero visual */}
            <div className="hidden lg:block">
              <HeroAnimation />
            </div>
          </div>
        </div>

        {/* Scroll Indicator — fades on scroll */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-wide uppercase">Scroll to explore</span>
          <CaretDown size={16} weight="bold" className="animate-bounce-gentle" />
        </motion.div>
      </section>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        youtubeId={YOUTUBE_VIDEO_ID}
      />
    </>
  );
}

import type { Variants, Transition } from "framer-motion";

/* ============================================
   CUSTOM EASING CURVES
   ============================================ */

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const EASE_SNAP: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const EASE_DECEL: [number, number, number, number] = [0.0, 0.0, 0.2, 1];
export const EASE_ACCEL: [number, number, number, number] = [0.4, 0.0, 1, 1];
export const EASE_SMOOTH_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================
   SPRING CONFIGS
   ============================================ */

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 26,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/* ============================================
   BASE VARIANTS (upgraded with custom easing)
   ============================================ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

export const staggerContainer = (staggerDelay = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_SNAP },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH_OUT },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH_OUT },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1.2, ease: EASE_SMOOTH },
  },
};

export const scaleUpFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

/* ============================================
   NEW PREMIUM VARIANTS
   ============================================ */

/** Scale + blur entrance — premium card reveal */
export const morphIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_SNAP },
  },
};

/** Clip-path reveal from bottom */
export const revealUp: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH_OUT },
  },
};

/** Glow pulse for box-shadow animations */
export const glowPulse: Variants = {
  hidden: { boxShadow: "0 0 0px rgba(224, 122, 61, 0)" },
  visible: {
    boxShadow: [
      "0 0 0px rgba(224, 122, 61, 0)",
      "0 0 30px rgba(224, 122, 61, 0.3)",
      "0 0 15px rgba(224, 122, 61, 0.15)",
    ],
    transition: { duration: 2, ease: EASE_SMOOTH, repeat: Infinity },
  },
};

/** Parallax-style fade (for scroll-linked motion) */
export const parallaxFade: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_DECEL },
  },
};

/** Stagger with wave-like sine timing */
export const staggerWave = (count: number, baseDelay = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: baseDelay,
      delayChildren: 0.1,
    },
  },
});

/** Wave child variant with slight scale bounce */
export const waveChild: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_SNAP,
    },
  },
};

/** Float up with rotation */
export const floatUpRotate: Variants = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH_OUT },
  },
};

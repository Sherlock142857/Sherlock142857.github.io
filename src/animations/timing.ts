/**
 * Single source of truth for animation timing.
 *
 * The CSS custom properties in src/styles/variables.css mirror these values so
 * CSS transitions and GSAP timelines stay in lockstep. Keep the two files in
 * sync when tuning.
 *
 * ## Timing philosophy
 * - Carousel advances should feel snappy and responsive (< 0.5s)
 * - Page transitions should feel deliberate but not sluggish (total < 2.5s)
 * - Individual transition phases are kept short to maintain momentum
 */

export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_IN = "cubic-bezier(0.55, 0.06, 0.68, 0.19)";
export const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Linear — used for the mechanical 180° rotation. */
export const EASE_LINEAR = "none";

/** Carousel transition timing */
export const CAROUSEL = {
  /** Duration of carousel slide animation (seconds) */
  duration: 0.45,
  ease: EASE_IN_OUT,
} as const;

/** Page transition timing - each phase is now 25% faster than before */
export const TRANSITION = {
  /** Hide homepage content (was 0.5s) */
  hideHome: 0.375,
  /** Chevrons merge into diamond (was 0.55s) */
  merge: 0.4,
  /** Diamond fills with black (was 0.45s) */
  fill: 0.35,
  /** 180° rotation (was 0.55s) */
  rotate: 0.4,
  /** Chevrons split to page edges (was 0.7s) */
  split: 0.5,
  /** Diamond settles beside title (was 0.55s) */
  settle: 0.4,
  /** Reveal destination page (was 0.4s) */
  reveal: 0.3,
  ease: EASE_IN_OUT,
  rotateEase: EASE_LINEAR,
} as const;

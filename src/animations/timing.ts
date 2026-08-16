/**
 * Single source of truth for animation timing.
 *
 * The CSS custom properties in src/styles/variables.css mirror these values so
 * CSS transitions and GSAP timelines stay in lockstep. Keep the two files in
 * sync when tuning.
 *
 * ## Timing philosophy
 * - Carousel advances should feel snappy and responsive (< 0.5s)
 * - Page transitions should feel fast and fluid (total < 1.5s)
 * - Overlapping animations create momentum and flow
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

/** Page transition timing - faster and more overlapped */
export const TRANSITION = {
  /** Hide homepage content - must complete before merge starts */
  hideHome: 0.25,
  /** Chevrons merge into diamond */
  merge: 0.35,
  /** Diamond fills with black (overlaps with merge) */
  fill: 0.3,
  /** 180° rotation */
  rotate: 0.35,
  /** Chevrons split to page edges */
  split: 0.4,
  /** Diamond settles beside title */
  settle: 0.35,
  /** Reveal destination page */
  reveal: 0.25,
  ease: EASE_IN_OUT,
  rotateEase: EASE_LINEAR,
} as const;

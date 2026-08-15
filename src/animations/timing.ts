/**
 * Single source of truth for animation timing.
 *
 * The CSS custom properties in src/styles/variables.css mirror these values so
 * CSS transitions and GSAP timelines stay in lockstep. Keep the two files in
 * sync when tuning.
 */

export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_IN = "cubic-bezier(0.55, 0.06, 0.68, 0.19)";
export const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Linear — used for the mechanical 180° rotation. */
export const EASE_LINEAR = "none";

export const CAROUSEL = {
  duration: 0.6,
  ease: EASE_IN_OUT,
} as const;

export const TRANSITION = {
  hideHome: 0.5,
  merge: 0.55,
  fill: 0.45,
  rotate: 0.55,
  split: 0.7,
  settle: 0.55,
  reveal: 0.4,
  ease: EASE_IN_OUT,
  rotateEase: EASE_LINEAR,
} as const;

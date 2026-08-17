/**
 * Animation timing configuration.
 *
 * This file now re-exports values from the central design tokens.
 * The CSS custom properties in src/styles/variables.css mirror these values.
 *
 * @see src/config/designTokens.ts for the source of truth
 * @deprecated Import from '@/config' instead for new code
 */

import { ANIMATION, EASING } from '../config/designTokens';

export const EASE_OUT = EASING.out;
export const EASE_IN = EASING.in;
export const EASE_IN_OUT = EASING.inOut;
/** Linear — used for the mechanical 180° rotation. */
export const EASE_LINEAR = EASING.linear;

/** Carousel transition timing */
export const CAROUSEL = {
  /** Duration of carousel slide animation (seconds) */
  duration: ANIMATION.carouselDuration,
  ease: EASE_IN_OUT,
} as const;

/** Page transition timing - faster and more overlapped */
export const TRANSITION = {
  /** Hide homepage content - must complete before merge starts */
  hideHome: ANIMATION.transitionHideHome,
  /** Chevrons merge into diamond */
  merge: ANIMATION.transitionMerge,
  /** Diamond fills with black (overlaps with merge) */
  fill: ANIMATION.transitionFill,
  /** 180° rotation */
  rotate: ANIMATION.transitionRotate,
  /** Chevrons split to page edges */
  split: ANIMATION.transitionSplit,
  /** Diamond settles beside title */
  settle: ANIMATION.transitionSettle,
  /** Reveal destination page */
  reveal: ANIMATION.transitionReveal,
  ease: EASE_IN_OUT,
  rotateEase: EASE_LINEAR,
} as const;

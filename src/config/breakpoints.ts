/**
 * Responsive breakpoints for the application.
 *
 * These breakpoints define the major layout shifts in the design:
 * - MOBILE: Single-column layout, stacked carousel, touch-first interaction
 * - TABLET: Transition zone, some elements remain stacked
 * - DESKTOP: Full three-column carousel, mouse wheel navigation
 *
 * Usage:
 * ```ts
 * import { BREAKPOINTS } from '@/config/breakpoints';
 *
 * // In TypeScript/JavaScript
 * if (window.innerWidth < BREAKPOINTS.MOBILE) { ... }
 *
 * // In CSS modules
 * @media (max-width: 760px) { ... }
 * ```
 */

/**
 * Breakpoint values in pixels.
 * Values represent the maximum width where the style applies (max-width behavior).
 */
export const BREAKPOINTS = {
  /**
   * Mobile devices and small tablets.
   * Below this width, carousel switches to stacked layout.
   */
  MOBILE: 760,

  /**
   * Tablets and small desktops.
   * Below this width, detail page switches to single-column layout.
   */
  TABLET: 860,

  /**
   * Maximum content width.
   * Content container never exceeds this width.
   */
  MAX_CONTENT_WIDTH: 1920,
} as const;

/**
 * Media query strings for use in CSS-in-JS or styled-components.
 */
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  tablet: `(max-width: ${BREAKPOINTS.TABLET}px)`,
  desktop: `(min-width: ${BREAKPOINTS.MOBILE + 1}px)`,
} as const;

/**
 * Check if the current viewport is mobile-sized.
 * Use with care - prefer CSS media queries when possible.
 */
export function isMobileViewport(): boolean {
  return window.innerWidth < BREAKPOINTS.MOBILE;
}

/**
 * Check if the current viewport is tablet-sized.
 */
export function isTabletViewport(): boolean {
  return window.innerWidth < BREAKPOINTS.TABLET;
}

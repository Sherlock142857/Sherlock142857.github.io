/**
 * Design tokens - single source of truth for design values.
 *
 * These tokens define the visual language of the site. When syncing with CSS,
 * the values here are authoritative; CSS custom properties in variables.css
 * should mirror these values.
 *
 * @see src/styles/variables.css for CSS custom properties
 */

/**
 * Spacing scale following a geometric progression.
 * Based on a 4px (0.25rem) base unit.
 */
export const SPACING = {
  /** 4px - Minimal spacing for tight groups */
  '2xs': '0.25rem',
  /** 8px - Compact spacing */
  xs: '0.5rem',
  /** 12px - Small spacing */
  sm: '0.75rem',
  /** 16px - Base spacing unit */
  md: '1rem',
  /** 24px - Medium spacing */
  lg: '1.5rem',
  /** 40px - Large spacing */
  xl: '2.5rem',
  /** 64px - Extra large spacing */
  '2xl': '4rem',
  /** 96px - Massive spacing for major sections */
  '3xl': '6rem',
} as const;

/**
 * Typography scale.
 * Uses clamp() for fluid typography that scales with viewport.
 */
export const FONT_SIZES = {
  /** Hero text (48-128px) */
  hero: 'clamp(3rem, 9vw, 8rem)',
  /** Page titles (32-72px) */
  title: 'clamp(2rem, 5.5vw, 4.5rem)',
  /** Active carousel item (32-51.2px) */
  carouselActive: 'clamp(2rem, 3vw, 3.2rem)',
  /** Side carousel items (17.6-24px) */
  carouselSide: 'clamp(1.1rem, 1.8vw, 1.5rem)',
  /** Section headings (24-36px) */
  section: 'clamp(1.5rem, 3vw, 2.25rem)',
  /** Body text (17px) */
  body: '1.0625rem',
  /** Metadata and labels (12px) */
  meta: '0.75rem',
} as const;

/**
 * Color palette.
 * Strong black/white/grayscale hierarchy for editorial feel.
 */
export const COLORS = {
  /** Page background - warm off-white */
  bg: '#f4f4f1',
  /** Surface color for cards/panels */
  surface: '#ecece8',
  /** Primary text color - near black */
  ink: '#0a0a0a',
  /** Secondary text color - medium gray */
  inkSoft: '#6d6d68',
  /** Tertiary text color - light gray */
  inkFaint: '#a9a9a3',
  /** Frame/border color */
  frame: '#0a0a0a',
} as const;

/**
 * Layout dimensions.
 */
export const LAYOUT = {
  /** Maximum content width (1920px) */
  maxWidth: '1920px',
  /** Horizontal gutter - fluid between 16-56px */
  gutter: 'clamp(1rem, 4vw, 3.5rem)',
  /** Vertical page padding - fluid between 24-56px */
  pagePadY: 'clamp(1.5rem, 4vh, 3.5rem)',
} as const;

/**
 * Carousel geometry.
 * These values define the size and layout of the homepage carousel.
 */
export const CAROUSEL = {
  /** Height of one carousel slot (desktop: 272px, mobile: 160px) */
  slotHeight: '17rem',
  slotHeightMobile: '10rem',

  /** Height of one title slot (desktop: 144px, mobile: 96px) */
  titleSlotHeight: '9rem',
  titleSlotHeightMobile: '6rem',

  /** Image width (desktop: 224px, mobile: 136px) */
  imageWidth: '14rem',
  imageWidthMobile: '8.5rem',

  /** Image height (desktop: 272px, mobile: 160px) */
  imageHeight: '17rem',
  imageHeightMobile: '10rem',

  /**
   * Image column width ratio.
   * Width = imageHeight * widthRatio (2.475 = aspect ratio that accommodates chevrons)
   */
  widthRatio: 2.475,

  /**
   * Fixed brackets height ratio.
   * Height = imageHeight * heightRatio (1.21 = room for chevron overlap)
   */
  heightRatio: 1.21,
} as const;

/**
 * Geometry for the diamond/chevron visual system.
 *
 * The site uses two right-angle chevrons (`<` and `>`) around images.
 * When merged, they form a diamond (45° rotated square).
 */
export const GEOMETRY = {
  /** SVG stroke width for brackets and frames (2px) */
  bracketStroke: 2,

  /** Diamond half-diagonal as a fraction of image height (0-1) */
  diamondRatio: 0.55,

  /**
   * Homepage bracket gap as a fraction of the half-diagonal (0-1).
   * At 0, chevrons touch. At 1.1, they have a visible gap.
   */
  gapRatio: 1.1,

  /** Detail page framing brackets' distance from viewport edge (px) */
  framePadding: 40,

  /** Framing brackets scale multiplier vs diamond brackets */
  frameScale: 1.4,

  /** Small diamond anchor size in detail page header (14px) */
  anchorSize: '0.875rem',

  /** Minimum safe diamond size to prevent degenerate geometry (px) */
  minDiamondSize: 20,

  /** Maximum diamond size as a fraction of viewport (0-1) */
  maxDiamondRatio: 0.8,
} as const;

/**
 * Animation timing configuration.
 *
 * Philosophy:
 * - Carousel advances: snappy and responsive (< 0.5s)
 * - Page transitions: fast and fluid (< 1.5s total)
 * - Overlapping animations create momentum and flow
 *
 * @see src/styles/variables.css - CSS durations must mirror these values
 */
export const ANIMATION = {
  /** Carousel slide transition duration (450ms) */
  carouselDuration: 0.45,

  /** Page transition: hide homepage content (250ms) */
  transitionHideHome: 0.25,

  /** Page transition: chevrons merge into diamond (350ms) */
  transitionMerge: 0.35,

  /** Page transition: diamond fills with black (300ms, overlaps merge) */
  transitionFill: 0.3,

  /** Page transition: 180° rotation (350ms) */
  transitionRotate: 0.35,

  /** Page transition: chevrons split to page edges (400ms) */
  transitionSplit: 0.4,

  /** Page transition: diamond settles beside title (350ms) */
  transitionSettle: 0.35,

  /** Page transition: reveal destination page (250ms) */
  transitionReveal: 0.25,
} as const;

/**
 * Easing functions for animations.
 * These define the acceleration curves for motion.
 */
export const EASING = {
  /** Ease out - deceleration curve for exits */
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',

  /** Ease in - acceleration curve for entrances */
  in: 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',

  /** Ease in-out - smooth acceleration and deceleration */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',

  /** Linear - constant speed (for mechanical rotations) */
  linear: 'none',
} as const;

/**
 * Performance and interaction tuning.
 */
export const PERFORMANCE = {
  /** Throttle delay for ResizeObserver callbacks (ms) */
  resizeThrottleMs: 100,

  /** Gallery auto-scroll animation duration (seconds) */
  galleryScrollDuration: 26,
} as const;

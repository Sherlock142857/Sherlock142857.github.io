/**
 * Shared geometry for the "angle bracket" visual system.
 *
 * The site uses two right-angle chevrons (`<` and `>`) around the homepage
 * image. Each chevron is two equal-length edges meeting at a 90° corner whose
 * vertex points outward (left bracket points left, right bracket points right).
 * When merged they form a square rotated 45° (a diamond) whose four vertices
 * point up / right / down / left.
 *
 * ## Coordinate system
 * - The diamond center (cx, cy) is in absolute viewport coordinates
 * - Bracket lines are computed in a local coordinate frame centered at (0, 0)
 * - The half-diagonal `d` determines the diamond size: vertices are at (±d, 0) and (0, ±d)
 *
 * ## Animation sequence
 * 1. Homepage: two chevrons separated by a gap (controlled by GAP_RATIO)
 * 2. Merge: chevrons move together to form a closed diamond outline
 * 3. Fill: the diamond interior becomes opaque
 * 4. Rotate: 180° rotation (diamond is symmetric, so this is invisible)
 * 5. Split: chevrons expand to frame the detail page edges
 * 6. Settle: the diamond interior moves to rest beside the page title
 *
 * @see src/config/designTokens.ts for the source configuration values
 */

import { GEOMETRY } from '../config/designTokens';

/** SVG stroke width for bracket lines (px) */
export const BRACKET_STROKE = GEOMETRY.bracketStroke;

/** Diamond half-diagonal as a fraction of the image height (0-1) */
export const DIAMOND_RATIO = GEOMETRY.diamondRatio;

/** Homepage bracket gap as a fraction of the half-diagonal (0-1). At 0, chevrons touch. */
export const GAP_RATIO = GEOMETRY.gapRatio;

/** Detail-page framing brackets' distance from the viewport edge (px) */
export const FRAME_PAD = GEOMETRY.framePadding;

/** Framing brackets are this much larger than the diamond brackets (scale multiplier) */
export const FRAME_SCALE = GEOMETRY.frameScale;

/** Minimum safe diamond size to prevent degenerate geometry (px) */
const MIN_DIAMOND_SIZE = GEOMETRY.minDiamondSize;

/** Maximum reasonable diamond size as a fraction of viewport (0-1) */
const MAX_DIAMOND_RATIO = GEOMETRY.maxDiamondRatio;

/** Specification for a diamond: center point and half-diagonal */
export interface DiamondSpec {
  /** Center X in viewport coordinates (px) */
  cx: number;
  /** Center Y in viewport coordinates (px) */
  cy: number;
  /** Half-diagonal length (px). Vertices are at (cx±d, cy) and (cx, cy±d) */
  d: number;
}

/** A line segment in 2D space */
export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** A pair of lines forming one angle bracket (< or >) */
export interface BracketLines {
  /** Upper edge of the bracket */
  top: Line;
  /** Lower edge of the bracket */
  bottom: Line;
}

/**
 * Compute diamond specification from a bounding rectangle.
 * Used to center the diamond on the homepage carousel image.
 *
 * @param rect - Bounding rectangle (typically from getBoundingClientRect)
 * @returns Diamond spec with validated size
 * @throws Error if rect dimensions are invalid
 */
export function diamondSpecFromRect(rect: {
  left: number;
  top: number;
  width: number;
  height: number;
}): DiamondSpec {
  if (rect.width <= 0 || rect.height <= 0) {
    throw new Error(`Invalid rect dimensions: width=${rect.width}, height=${rect.height}`);
  }

  const d = Math.max(MIN_DIAMOND_SIZE, rect.height * DIAMOND_RATIO);

  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    d,
  };
}

/**
 * Compute default diamond specification for fallback cases.
 * Centers the diamond in the viewport with a reasonable size.
 *
 * @returns Diamond spec centered in the current viewport
 */
export function defaultDiamondSpec(): DiamondSpec {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const maxDimension = Math.min(window.innerWidth, window.innerHeight);
  const d = Math.max(
    MIN_DIAMOND_SIZE,
    Math.min(maxDimension * 0.16, maxDimension * MAX_DIAMOND_RATIO)
  );
  return { cx, cy, d };
}

/**
 * Left bracket (`<`), in a local frame centered at the diamond center (0,0).
 * The vertex points to the left, with two edges extending up-right and down-right.
 *
 * @param d - Half-diagonal of the diamond (px)
 * @param gap - Outward offset from the diamond center (px). Pushes the bracket left.
 * @returns Two lines forming the left angle bracket
 */
export function leftBracketLines(d: number, gap: number): BracketLines {
  if (d <= 0) {
    console.warn(`Invalid diamond size: d=${d}. Using minimum size.`);
    d = MIN_DIAMOND_SIZE;
  }

  const vx = -(d + gap); // Vertex X position (left of origin)
  return {
    top: { x1: vx, y1: 0, x2: -gap, y2: -d },
    bottom: { x1: vx, y1: 0, x2: -gap, y2: d },
  };
}

/**
 * Right bracket (`>`), mirrored from the left bracket.
 * The vertex points to the right, with two edges extending up-left and down-left.
 *
 * @param d - Half-diagonal of the diamond (px)
 * @param gap - Outward offset from the diamond center (px). Pushes the bracket right.
 * @returns Two lines forming the right angle bracket
 */
export function rightBracketLines(d: number, gap: number): BracketLines {
  if (d <= 0) {
    console.warn(`Invalid diamond size: d=${d}. Using minimum size.`);
    d = MIN_DIAMOND_SIZE;
  }

  const vx = d + gap; // Vertex X position (right of origin)
  return {
    top: { x1: vx, y1: 0, x2: gap, y2: -d },
    bottom: { x1: vx, y1: 0, x2: gap, y2: d },
  };
}

/**
 * Framing brackets positioned at the viewport edges for the detail page.
 * These brackets are larger than the homepage brackets (scaled by FRAME_SCALE)
 * and their vertices touch the left/right edges of the viewport.
 *
 * @param spec - Diamond specification from which to derive the framing size
 * @param vw - Viewport width (px)
 * @returns Left and right bracket pairs in absolute viewport coordinates
 */
export function framingBracketLines(spec: DiamondSpec, vw: number): {
  left: BracketLines;
  right: BracketLines;
} {
  if (vw <= 0) {
    console.warn(`Invalid viewport width: ${vw}. Using window.innerWidth.`);
    vw = window.innerWidth;
  }

  const df = spec.d * FRAME_SCALE;
  const leftVx = FRAME_PAD;
  const rightVx = vw - FRAME_PAD;
  const cy = spec.cy;

  // Check if framing brackets would overlap
  if (leftVx + df > rightVx - df) {
    console.warn(`Viewport too narrow for framing brackets: vw=${vw}, df=${df}`);
  }

  return {
    left: {
      top: { x1: leftVx, y1: cy, x2: leftVx + df, y2: cy - df },
      bottom: { x1: leftVx, y1: cy, x2: leftVx + df, y2: cy + df },
    },
    right: {
      top: { x1: rightVx, y1: cy, x2: rightVx - df, y2: cy - df },
      bottom: { x1: rightVx, y1: cy, x2: rightVx - df, y2: cy + df },
    },
  };
}

/**
 * Generate SVG path data for a solid diamond interior.
 * The path forms a square rotated 45° with vertices at cardinal directions.
 *
 * @param d - Half-diagonal (distance from center to each vertex, px)
 * @returns SVG path string (M x y L x y ...) defining the diamond shape
 */
export function diamondPath(d: number): string {
  if (d <= 0) {
    console.warn(`Invalid diamond size for path: d=${d}. Using minimum size.`);
    d = MIN_DIAMOND_SIZE;
  }
  // Start at top vertex, trace clockwise: top → right → bottom → left → close
  return `M 0 ${-d} L ${d} 0 L 0 ${d} L ${-d} 0 Z`;
}

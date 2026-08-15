/**
 * Shared geometry for the "angle bracket" visual system.
 *
 * The site uses two right-angle chevrons (`<` and `>`) around the homepage
 * image. Each chevron is two equal-length edges meeting at a 90° corner whose
 * vertex points outward (left bracket points left, right bracket points right).
 * When merged they form a square rotated 45° (a diamond) whose four vertices
 * point up / right / down / left.
 */

export const BRACKET_STROKE = 2;
/** Diamond half-diagonal as a fraction of the image height. */
export const DIAMOND_RATIO = 0.55;
/** Homepage bracket gap as a fraction of the half-diagonal. */
export const GAP_RATIO = 0.3;
/** Detail-page framing brackets' distance from the viewport edge (px). */
export const FRAME_PAD = 40;
/** Framing brackets are this much larger than the diamond brackets. */
export const FRAME_SCALE = 1.4;

export interface DiamondSpec {
  cx: number;
  cy: number;
  d: number;
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface BracketLines {
  top: Line;
  bottom: Line;
}

export function diamondSpecFromRect(rect: {
  left: number;
  top: number;
  width: number;
  height: number;
}): DiamondSpec {
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    d: rect.height * DIAMOND_RATIO,
  };
}

export function defaultDiamondSpec(): DiamondSpec {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const d = Math.min(window.innerWidth, window.innerHeight) * 0.16;
  return { cx, cy, d };
}

/**
 * Left bracket (`<`), in a local frame centered at the diamond center (0,0).
 * `gap` pushes the whole chevron outward (used on the homepage).
 */
export function leftBracketLines(d: number, gap: number): BracketLines {
  const vx = -(d + gap);
  return {
    top: { x1: vx, y1: 0, x2: -gap, y2: -d },
    bottom: { x1: vx, y1: 0, x2: -gap, y2: d },
  };
}

/** Right bracket (`>`), mirrored. */
export function rightBracketLines(d: number, gap: number): BracketLines {
  const vx = d + gap;
  return {
    top: { x1: vx, y1: 0, x2: gap, y2: -d },
    bottom: { x1: vx, y1: 0, x2: gap, y2: d },
  };
}

/**
 * Framing brackets (absolute viewport coordinates), vertically centered on the
 * diamond's `cy`, with vertices at the left / right viewport edges.
 */
export function framingBracketLines(spec: DiamondSpec, vw: number): {
  left: BracketLines;
  right: BracketLines;
} {
  const df = spec.d * FRAME_SCALE;
  const leftVx = FRAME_PAD;
  const rightVx = vw - FRAME_PAD;
  const cy = spec.cy;
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

/** Solid diamond interior path, in a local frame centered at (0,0). */
export function diamondPath(d: number): string {
  return `M 0 ${-d} L ${d} 0 L 0 ${d} L ${-d} 0 Z`;
}

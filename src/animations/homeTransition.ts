import gsap from "gsap";
import type { RefObject } from "react";
import {
  defaultDiamondSpec,
  diamondSpecFromRect,
  framingBracketLines,
  GAP_RATIO,
  leftBracketLines,
  rightBracketLines,
  type BracketLines,
  type Line,
} from "./geometry";
import { EASE_IN, EASE_IN_OUT, EASE_LINEAR, TRANSITION } from "./timing";

/**
 * DOM elements required for the page transition animation.
 * These refs are passed from the HomeTransition component which renders
 * the SVG overlay and manages the transition lifecycle.
 */
export interface TransitionElements {
  /** Full-screen overlay containing all transition graphics */
  overlay: HTMLElement;
  /** Black backdrop that fades in during the transition */
  backdrop: HTMLElement;
  /** Homepage carousel image (fades out as diamond fills) */
  image: HTMLElement;
  /** Rotates the whole diamond around its center during the 180° spin */
  rotator: HTMLElement;
  /** The solid diamond interior (translated to its resting place on detail page) */
  interior: SVGGElement;
  /** Left bracket top edge (animated line) */
  leftTop: SVGLineElement;
  /** Left bracket bottom edge (animated line) */
  leftBottom: SVGLineElement;
  /** Right bracket top edge (animated line) */
  rightTop: SVGLineElement;
  /** Right bracket bottom edge (animated line) */
  rightBottom: SVGLineElement;
}

interface BaseParams {
  elements: TransitionElements;
  onComplete: () => void;
}

/**
 * Parameters for entering a field detail page from the homepage.
 */
export interface EnterParams extends BaseParams {
  /** Bounding rect of the homepage carousel image frame */
  fromRect: DOMRect;
  /** Homepage content container (to be hidden) */
  homeContent: HTMLElement | null;
  /** Target anchor element beside the detail page title */
  detailAnchor: RefObject<HTMLElement>;
  /** Callback to mount the detail page (called mid-transition) */
  onNavigateToField: () => void;
}

/**
 * Parameters for exiting a field detail page back to the homepage.
 */
export interface ExitParams extends BaseParams {
  /** Bounding rect of the homepage image frame (may be null on first render) */
  fromRect: DOMRect | null;
  /** Anchor element beside the detail page title (starting position of diamond) */
  detailAnchor: RefObject<HTMLElement>;
  /** Callback to mount the homepage (called at start of transition) */
  onNavigateHome: () => void;
}

/**
 * Convert a line from absolute viewport coordinates to local coordinates
 * relative to the diamond center (cx, cy).
 *
 * @param line - Line in viewport coordinates
 * @param cx - Diamond center X
 * @param cy - Diamond center Y
 * @returns Line in local coordinate frame centered at (0, 0)
 */
function toLocal(line: Line, cx: number, cy: number): Line {
  return { x1: line.x1 - cx, y1: line.y1 - cy, x2: line.x2 - cx, y2: line.y2 - cy };
}

/**
 * Set SVG line element attributes via GSAP.
 * Using GSAP ensures the line coordinates are animatable and stay in sync
 * with other timeline animations.
 *
 * @param line - SVG line element to update
 * @param coords - New line coordinates
 */
function setLine(line: SVGLineElement, coords: Line) {
  gsap.set(line, {
    attr: { x1: coords.x1, y1: coords.y1, x2: coords.x2, y2: coords.y2 },
  });
}

/**
 * Play the enter transition: homepage → detail page.
 *
 * ## Animation sequence (total ~2.375s, was ~3.7s)
 * 1. **Hide home** (0.375s): Fade out homepage content, fade in black backdrop
 * 2. **Merge** (0.4s): Two chevrons close together to form diamond outline
 * 3. **Fill** (0.35s): Diamond interior fades to opaque black, image fades out
 * 4. **Rotate** (0.4s): Precise 180° rotation (invisible due to diamond symmetry)
 * 5. **Split** (0.5s): Chevrons fly outward to frame the viewport edges
 * 6. **Settle** (0.4s): Diamond interior moves beside the detail page title
 * 7. **Reveal** (0.3s): Fade out overlay to show detail page
 *
 * ## Coordinate frames
 * - Bracket lines are computed in a **local frame** centered at (cx, cy)
 * - The rotator element spins around its center, then snaps back to 0° (invisible)
 * - After rotation, the diamond looks identical but we're back in unrotated coords
 *
 * ## State mounting
 * - Homepage is visible at start
 * - Detail page mounts mid-transition (after split phase starts)
 * - Overlay hides at the end to reveal the detail page
 *
 * @param params - Transition parameters including DOM refs and callbacks
 * @returns GSAP timeline (can be controlled externally if needed)
 */
export function playEnterTransition(params: EnterParams): gsap.core.Timeline {
  const {
    elements,
    fromRect,
    homeContent,
    detailAnchor,
    onNavigateToField,
    onComplete,
  } = params;
  const {
    overlay,
    backdrop,
    image,
    rotator,
    interior,
    leftTop,
    leftBottom,
    rightTop,
    rightBottom,
  } = elements;

  const spec = diamondSpecFromRect(fromRect);
  const { cx, cy, d } = spec;
  const gap = d * GAP_RATIO;
  const vw = window.innerWidth;

  const homeL = leftBracketLines(d, gap);
  const homeR = rightBracketLines(d, gap);
  const mergedL = leftBracketLines(d, 0);
  const mergedR = rightBracketLines(d, 0);
  const framing = framingBracketLines(spec, vw);
  const frameL: BracketLines = {
    top: toLocal(framing.left.top, cx, cy),
    bottom: toLocal(framing.left.bottom, cx, cy),
  };
  const frameR: BracketLines = {
    top: toLocal(framing.right.top, cx, cy),
    bottom: toLocal(framing.right.bottom, cx, cy),
  };

  // Initial state mirrors the static homepage frame exactly.
  gsap.set(overlay, { opacity: 1 });
  gsap.set(backdrop, { opacity: 0 });
  gsap.set(image, { opacity: 1 });
  gsap.set(rotator, { rotation: 0 });
  gsap.set(interior, { opacity: 0, x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" });
  setLine(leftTop, homeL.top);
  setLine(leftBottom, homeL.bottom);
  setLine(rightTop, homeR.top);
  setLine(rightBottom, homeR.bottom);

  const tl = gsap.timeline({ defaults: { ease: EASE_IN_OUT }, onComplete });
  let t = 0;

  // Fast hide: homepage content, backdrop fade in, and image all disappear quickly.
  // This happens BEFORE the merge starts to avoid collision.
  if (homeContent) {
    tl.to(homeContent, { opacity: 0, y: -18, duration: TRANSITION.hideHome }, t);
  }
  tl.to(backdrop, { opacity: 1, duration: TRANSITION.hideHome }, t)
    .to(image, { opacity: 0, duration: TRANSITION.hideHome }, t);
  t += TRANSITION.hideHome;

  // Now that everything is clear, the chevrons merge into diamond.
  tl.to(
    leftTop,
    { attr: { x1: mergedL.top.x1, y1: mergedL.top.y1, x2: mergedL.top.x2, y2: mergedL.top.y2 }, duration: TRANSITION.merge },
    t
  )
    .to(
      leftBottom,
      { attr: { x1: mergedL.bottom.x1, y1: mergedL.bottom.y1, x2: mergedL.bottom.x2, y2: mergedL.bottom.y2 }, duration: TRANSITION.merge },
      t
    )
    .to(
      rightTop,
      { attr: { x1: mergedR.top.x1, y1: mergedR.top.y1, x2: mergedR.top.x2, y2: mergedR.top.y2 }, duration: TRANSITION.merge },
      t
    )
    .to(
      rightBottom,
      { attr: { x1: mergedR.bottom.x1, y1: mergedR.bottom.y1, x2: mergedR.bottom.x2, y2: mergedR.bottom.y2 }, duration: TRANSITION.merge },
      t
    );
  t += TRANSITION.merge;

  // After merge completes, the diamond interior fills black.
  tl.to(interior, { opacity: 1, duration: TRANSITION.fill }, t);
  t += TRANSITION.fill;

  // Precise 180° rotation around the diamond center. The diamond is invariant
  // under a half-turn, so we snap the rotator back to upright afterwards — this
  // keeps every later stage (split, settle) in the unrotated coordinate frame.
  tl.to(rotator, { rotation: 180, duration: TRANSITION.rotate, ease: EASE_LINEAR }, t);
  t += TRANSITION.rotate;
  tl.set(rotator, { rotation: 0 }, t);

  // Split: mount the detail page, then fly the two chevrons to the page edges.
  tl.call(onNavigateToField, undefined, t)
    .to(
      leftTop,
      { attr: { x1: frameL.top.x1, y1: frameL.top.y1, x2: frameL.top.x2, y2: frameL.top.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to(
      leftBottom,
      { attr: { x1: frameL.bottom.x1, y1: frameL.bottom.y1, x2: frameL.bottom.x2, y2: frameL.bottom.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to(
      rightTop,
      { attr: { x1: frameR.top.x1, y1: frameR.top.y1, x2: frameR.top.x2, y2: frameR.top.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to(
      rightBottom,
      { attr: { x1: frameR.bottom.x1, y1: frameR.bottom.y1, x2: frameR.bottom.x2, y2: frameR.bottom.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    );
  t += TRANSITION.split;

  // Carry the interior to its resting place near the detail-page title.
  let target: { dx: number; dy: number; scale: number } | null = null;
  tl.call(() => {
    const rect = detailAnchor.current?.getBoundingClientRect();
    if (rect && rect.width > 0) {
      target = {
        dx: rect.left + rect.width / 2 - cx,
        dy: rect.top + rect.height / 2 - cy,
        scale: rect.width / 2 / d,
      };
    }
  }, undefined, t);
  tl.to(
    interior,
    {
      x: () => target?.dx ?? 0,
      y: () => target?.dy ?? 0,
      scale: () => target?.scale ?? 1,
      duration: TRANSITION.settle,
    },
    t
  );
  t += TRANSITION.settle;

  // Reveal the detail page.
  tl.to(overlay, { opacity: 0, duration: TRANSITION.reveal }, t);

  return tl;
}

/**
 * Play the exit transition: detail page → homepage.
 * This is the exact reverse of playEnterTransition.
 *
 * ## Animation sequence (total ~2.375s, was ~3.7s)
 * 1. **Mount homepage early** (0s): Homepage renders behind the overlay
 * 2. **Settle return** (0.4s): Diamond interior returns from title to center
 * 3. **Merge** (0.5s): Framing chevrons fly inward to form diamond outline
 * 4. **Rotate** (0.4s): Counter-rotation by -180° (opposite direction)
 * 5. **Fill clear** (0.35s): Diamond interior fades out, image fades in
 * 6. **Unmerge** (0.4s): Diamond splits back into two separated chevrons
 * 7. **Reveal** (0.3s): Fade out overlay to show homepage
 *
 * ## Differences from enter transition
 * - Homepage mounts at the very start (not mid-transition)
 * - Rotation direction is reversed (-180° instead of +180°)
 * - All phases run in reverse order
 * - The final state exactly matches the static homepage frame
 *
 * @param params - Transition parameters including DOM refs and callbacks
 * @returns GSAP timeline (can be controlled externally if needed)
 */
export function playExitTransition(params: ExitParams): gsap.core.Timeline {
  const {
    elements,
    fromRect,
    detailAnchor,
    onNavigateHome,
    onComplete,
  } = params;
  const {
    overlay,
    backdrop,
    image,
    rotator,
    interior,
    leftTop,
    leftBottom,
    rightTop,
    rightBottom,
  } = elements;

  const spec = fromRect ? diamondSpecFromRect(fromRect) : defaultDiamondSpec();
  const { cx, cy, d } = spec;
  const gap = d * GAP_RATIO;
  const vw = window.innerWidth;

  const homeL = leftBracketLines(d, gap);
  const homeR = rightBracketLines(d, gap);
  const mergedL = leftBracketLines(d, 0);
  const mergedR = rightBracketLines(d, 0);
  const framing = framingBracketLines(spec, vw);
  const frameL: BracketLines = {
    top: toLocal(framing.left.top, cx, cy),
    bottom: toLocal(framing.left.bottom, cx, cy),
  };
  const frameR: BracketLines = {
    top: toLocal(framing.right.top, cx, cy),
    bottom: toLocal(framing.right.bottom, cx, cy),
  };

  // Start from the state the entry transition left behind.
  const anchorRect = detailAnchor.current?.getBoundingClientRect();
  const anchorStart = anchorRect
    ? {
        x: anchorRect.left + anchorRect.width / 2 - cx,
        y: anchorRect.top + anchorRect.height / 2 - cy,
      }
    : { x: 0, y: 0 };

  gsap.set(overlay, { opacity: 1 });
  gsap.set(backdrop, { opacity: 1 });
  gsap.set(image, { opacity: 0 });
  gsap.set(rotator, { rotation: 0 });
  gsap.set(interior, { opacity: 1, x: anchorStart.x, y: anchorStart.y, scale: 1 });
  setLine(leftTop, frameL.top);
  setLine(leftBottom, frameL.bottom);
  setLine(rightTop, frameR.top);
  setLine(rightBottom, frameR.bottom);

  const tl = gsap.timeline({ defaults: { ease: EASE_IN_OUT }, onComplete });
  let t = 0;

  // Mount the homepage early.
  tl.call(onNavigateHome, undefined, 0);

  // The interior returns to the center of the diamond.
  tl.to(interior, { x: 0, y: 0, scale: 1, duration: TRANSITION.settle }, t);
  t += TRANSITION.settle;

  // Chevrons return to the diamond.
  tl.to(
    leftTop,
    { attr: { x1: mergedL.top.x1, y1: mergedL.top.y1, x2: mergedL.top.x2, y2: mergedL.top.y2 }, duration: TRANSITION.split },
    t
  )
    .to(
      leftBottom,
      { attr: { x1: mergedL.bottom.x1, y1: mergedL.bottom.y1, x2: mergedL.bottom.x2, y2: mergedL.bottom.y2 }, duration: TRANSITION.split },
      t
    )
    .to(
      rightTop,
      { attr: { x1: mergedR.top.x1, y1: mergedR.top.y1, x2: mergedR.top.x2, y2: mergedR.top.y2 }, duration: TRANSITION.split },
      t
    )
    .to(
      rightBottom,
      { attr: { x1: mergedR.bottom.x1, y1: mergedR.bottom.y1, x2: mergedR.bottom.x2, y2: mergedR.bottom.y2 }, duration: TRANSITION.split },
      t
    );
  t += TRANSITION.split;

  // Rotate back in the opposite direction, then snap to upright (invisible for
  // the half-turn-symmetric diamond) so the unmerge stage stays unrotated.
  tl.to(rotator, { rotation: -180, duration: TRANSITION.rotate, ease: EASE_LINEAR }, t);
  t += TRANSITION.rotate;
  tl.set(rotator, { rotation: 0 }, t);

  // The fill clears first, THEN the image reappears.
  tl.to(interior, { opacity: 0, duration: TRANSITION.fill }, t);
  t += TRANSITION.fill;

  // Chevrons open back into the homepage frame.
  tl.to(
    leftTop,
    { attr: { x1: homeL.top.x1, y1: homeL.top.y1, x2: homeL.top.x2, y2: homeL.top.y2 }, duration: TRANSITION.merge },
    t
  )
    .to(
      leftBottom,
      { attr: { x1: homeL.bottom.x1, y1: homeL.bottom.y1, x2: homeL.bottom.x2, y2: homeL.bottom.y2 }, duration: TRANSITION.merge },
      t
    )
    .to(
      rightTop,
      { attr: { x1: homeR.top.x1, y1: homeR.top.y1, x2: homeR.top.x2, y2: homeR.top.y2 }, duration: TRANSITION.merge },
      t
    )
    .to(
      rightBottom,
      { attr: { x1: homeR.bottom.x1, y1: homeR.bottom.y1, x2: homeR.bottom.x2, y2: homeR.bottom.y2 }, duration: TRANSITION.merge },
      t
    );
  t += TRANSITION.merge;

  // After unmerge completes, show the image and reveal homepage content quickly.
  tl.to(image, { opacity: 1, duration: TRANSITION.hideHome }, t)
    .to(backdrop, { opacity: 0, duration: TRANSITION.hideHome }, t);

  // Reveal the homepage.
  tl.to(overlay, { opacity: 0, duration: TRANSITION.reveal }, t);

  return tl;
}

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

export interface TransitionElements {
  overlay: HTMLElement;
  backdrop: HTMLElement;
  image: HTMLElement;
  /** Rotates the whole diamond around its center. */
  rotator: HTMLElement;
  /** The solid diamond interior (translated to its resting place). */
  interior: SVGGElement;
  leftTop: SVGLineElement;
  leftBottom: SVGLineElement;
  rightTop: SVGLineElement;
  rightBottom: SVGLineElement;
}

interface BaseParams {
  elements: TransitionElements;
  onComplete: () => void;
}

export interface EnterParams extends BaseParams {
  fromRect: DOMRect;
  homeContent: HTMLElement | null;
  detailAnchor: RefObject<HTMLElement>;
  onNavigateToField: () => void;
}

export interface ExitParams extends BaseParams {
  fromRect: DOMRect | null;
  detailAnchor: RefObject<HTMLElement>;
  onNavigateHome: () => void;
}

function toLocal(line: Line, cx: number, cy: number): Line {
  return { x1: line.x1 - cx, y1: line.y1 - cy, x2: line.x2 - cx, y2: line.y2 - cy };
}

function setLine(line: SVGLineElement, coords: Line) {
  gsap.set(line, {
    attr: { x1: coords.x1, y1: coords.y1, x2: coords.x2, y2: coords.y2 },
  });
}

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

  // Hide the surrounding homepage.
  if (homeContent) {
    tl.to(homeContent, { opacity: 0, y: -18, duration: TRANSITION.hideHome }, t);
  }
  tl.to(backdrop, { opacity: 1, duration: TRANSITION.hideHome }, t);
  t += TRANSITION.hideHome;

  // The two chevrons merge into the diamond outline.
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

  // The diamond interior fills black.
  tl.to(interior, { opacity: 1, duration: TRANSITION.fill }, t).to(
    image,
    { opacity: 0, duration: TRANSITION.fill },
    t
  );
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
    { attr: { x1: mergedL.top.x1, y1: mergedL.top.y1, x2: mergedL.top.x2, y2: mergedL.top.y2 }, duration: TRANSITION.split, ease: EASE_IN },
    t
  )
    .to(
      leftBottom,
      { attr: { x1: mergedL.bottom.x1, y1: mergedL.bottom.y1, x2: mergedL.bottom.x2, y2: mergedL.bottom.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to(
      rightTop,
      { attr: { x1: mergedR.top.x1, y1: mergedR.top.y1, x2: mergedR.top.x2, y2: mergedR.top.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to(
      rightBottom,
      { attr: { x1: mergedR.bottom.x1, y1: mergedR.bottom.y1, x2: mergedR.bottom.x2, y2: mergedR.bottom.y2 }, duration: TRANSITION.split, ease: EASE_IN },
      t
    );
  t += TRANSITION.split;

  // Rotate back in the opposite direction, then snap to upright (invisible for
  // the half-turn-symmetric diamond) so the unmerge stage stays unrotated.
  tl.to(rotator, { rotation: -180, duration: TRANSITION.rotate, ease: EASE_LINEAR }, t);
  t += TRANSITION.rotate;
  tl.set(rotator, { rotation: 0 }, t);

  // The fill clears and the image reappears.
  tl.to(interior, { opacity: 0, duration: TRANSITION.fill }, t).to(
    image,
    { opacity: 1, duration: TRANSITION.fill },
    t
  );
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

  // Reveal the homepage.
  tl.to(overlay, { opacity: 0, duration: TRANSITION.reveal }, t);

  return tl;
}

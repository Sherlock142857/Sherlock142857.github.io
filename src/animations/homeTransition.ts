import gsap from "gsap";
import type { RefObject } from "react";
import { EASE_IN, EASE_IN_OUT, TRANSITION } from "./timing";

/**
 * Geometric constants shared between the static homepage frame and the animated
 * transition overlay, so the overlay can pick up exactly where the frame leaves
 * off (and return to it).
 */
const GAP_RATIO = 0.22; // initial bracket gap, as a fraction of image width
const ARM_INITIAL = 0.3; // initial bracket arm length, as a fraction of half width
const ANCHOR_BASE = 14; // px — mirrors --anchor-size

export interface TransitionElements {
  overlay: HTMLElement;
  backdrop: HTMLElement;
  stage: HTMLElement;
  image: HTMLElement;
  fill: HTMLElement;
  leftBracket: HTMLElement;
  rightBracket: HTMLElement;
  wedgeLeft: HTMLElement;
  wedgeRight: HTMLElement;
  anchor: HTMLElement;
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
  homeImage: RefObject<HTMLElement>;
  detailAnchor: RefObject<HTMLElement>;
  onNavigateHome: () => void;
}

function center(rect: DOMRect) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/** A sane centered fallback when the homepage rect is unavailable (deep links). */
export function fallbackRect(): DOMRect {
  const w = Math.min(window.innerWidth * 0.32, 240);
  const h = w * 1.25;
  const left = (window.innerWidth - w) / 2;
  const top = (window.innerHeight - h) / 2;
  return new DOMRect(left, top, w, h);
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
  const { overlay, backdrop, stage, image, fill, leftBracket, rightBracket, wedgeLeft, wedgeRight, anchor } =
    elements;

  const W = fromRect.width;
  const H = fromRect.height;
  const c = center(fromRect);
  const gap = W * GAP_RATIO;
  const spread = Math.max(W * 2.2, window.innerWidth * 0.36);

  // Initial state mirrors the static homepage frame exactly.
  gsap.set(overlay, { opacity: 1 });
  gsap.set(backdrop, { opacity: 0 });
  gsap.set(stage, {
    left: c.x,
    top: c.y,
    width: W,
    height: H,
    xPercent: -50,
    yPercent: -50,
    rotation: 0,
    opacity: 1,
    scale: 1,
  });
  gsap.set(image, { opacity: 1 });
  gsap.set(fill, { opacity: 0 });
  gsap.set(leftBracket, { x: -gap, scaleX: ARM_INITIAL, opacity: 1 });
  gsap.set(rightBracket, { x: gap, scaleX: ARM_INITIAL, opacity: 1 });
  gsap.set(wedgeLeft, { left: c.x, top: c.y, xPercent: -50, yPercent: -50, opacity: 0, x: 0 });
  gsap.set(wedgeRight, { left: c.x, top: c.y, xPercent: -50, yPercent: -50, opacity: 0, x: 0 });
  gsap.set(anchor, {
    left: c.x,
    top: c.y,
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
  });

  const tl = gsap.timeline({ defaults: { ease: EASE_IN_OUT }, onComplete });
  let t = 0;

  // Stage 2 — hide the surrounding homepage.
  if (homeContent) {
    tl.to(homeContent, { opacity: 0, y: -18, duration: TRANSITION.hideHome }, t);
  }
  tl.to(backdrop, { opacity: 1, duration: TRANSITION.hideHome }, t);
  t += TRANSITION.hideHome;

  // Stage 3 — brackets merge into a square frame.
  tl.to([leftBracket, rightBracket], { x: 0, scaleX: 1, duration: TRANSITION.merge }, t);
  t += TRANSITION.merge;

  // Stage 4 — black fill.
  tl.to(fill, { opacity: 1, duration: TRANSITION.fill }, t).to(
    [image, leftBracket, rightBracket],
    { opacity: 0, duration: TRANSITION.fill },
    t
  );
  t += TRANSITION.fill;

  // Stage 5 — precise 360° rotation.
  tl.to(stage, { rotation: 360, duration: TRANSITION.rotate, ease: "none" }, t);
  t += TRANSITION.rotate;

  // Stage 6 — split; mount the detail page now so its anchor can be measured.
  tl.call(onNavigateToField, undefined, t)
    .to(stage, { opacity: 0, scale: 0.82, duration: TRANSITION.split }, t)
    .fromTo(
      wedgeLeft,
      { opacity: 0, x: 0 },
      { opacity: 1, x: -spread, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .fromTo(
      wedgeRight,
      { opacity: 0, x: 0 },
      { opacity: 1, x: spread, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .to([wedgeLeft, wedgeRight], { opacity: 0, duration: TRANSITION.split * 0.4 }, t + TRANSITION.split)
    .fromTo(
      anchor,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: TRANSITION.split * 0.45 },
      t + TRANSITION.split * 0.45
    );
  t += TRANSITION.split;

  // Stage 7 — carry the anchor to its resting place on the detail page.
  let anchorTarget: { dx: number; dy: number; scale: number } | null = null;
  tl.call(() => {
    const rect = detailAnchor.current?.getBoundingClientRect();
    if (rect && rect.width > 0) {
      anchorTarget = {
        dx: rect.left + rect.width / 2 - c.x,
        dy: rect.top + rect.height / 2 - c.y,
        scale: rect.width / ANCHOR_BASE,
      };
    }
  }, undefined, t);
  tl.to(
    anchor,
    {
      x: () => anchorTarget?.dx ?? 0,
      y: () => anchorTarget?.dy ?? 0,
      scale: () => anchorTarget?.scale ?? 1,
      duration: TRANSITION.anchor,
    },
    t
  );
  t += TRANSITION.anchor;

  // Reveal the detail page.
  tl.to(overlay, { opacity: 0, duration: TRANSITION.reveal }, t);

  return tl;
}

export function playExitTransition(params: ExitParams): gsap.core.Timeline {
  const {
    elements,
    fromRect,
    homeImage,
    detailAnchor,
    onNavigateHome,
    onComplete,
  } = params;
  const { overlay, backdrop, stage, image, fill, leftBracket, rightBracket, wedgeLeft, wedgeRight, anchor } =
    elements;

  const rect = fromRect ?? fallbackRect();
  const W = rect.width;
  const H = rect.height;
  const c = center(rect);
  const gap = W * GAP_RATIO;
  const spread = Math.max(W * 2.2, window.innerWidth * 0.36);

  // Start from the state the entry transition left behind, plus the anchor at
  // its detail-page position.
  const anchorRect = detailAnchor.current?.getBoundingClientRect();
  const anchorStart = anchorRect
    ? {
        x: anchorRect.left + anchorRect.width / 2 - c.x,
        y: anchorRect.top + anchorRect.height / 2 - c.y,
        scale: anchorRect.width / ANCHOR_BASE,
      }
    : { x: 0, y: 0, scale: 1 };

  gsap.set(overlay, { opacity: 1 });
  gsap.set(backdrop, { opacity: 1 });
  gsap.set(stage, {
    left: c.x,
    top: c.y,
    width: W,
    height: H,
    xPercent: -50,
    yPercent: -50,
    rotation: 360,
    opacity: 0,
    scale: 0.82,
  });
  gsap.set(image, { opacity: 0 });
  gsap.set(fill, { opacity: 1 });
  gsap.set(leftBracket, { x: 0, scaleX: 1, opacity: 0 });
  gsap.set(rightBracket, { x: 0, scaleX: 1, opacity: 0 });
  gsap.set(wedgeLeft, { left: c.x, top: c.y, xPercent: -50, yPercent: -50, opacity: 0, x: 0 });
  gsap.set(wedgeRight, { left: c.x, top: c.y, xPercent: -50, yPercent: -50, opacity: 0, x: 0 });
  gsap.set(anchor, {
    left: c.x,
    top: c.y,
    xPercent: -50,
    yPercent: -50,
    opacity: 1,
    scale: anchorStart.scale,
    x: anchorStart.x,
    y: anchorStart.y,
  });

  const tl = gsap.timeline({ defaults: { ease: EASE_IN_OUT }, onComplete });
  let t = 0;

  // Mount the homepage early so the return rect can be re-measured.
  tl.call(onNavigateHome, undefined, 0);

  // Anchor travels back to the center of the square.
  tl.to(anchor, { x: 0, y: 0, scale: 1, duration: TRANSITION.anchor }, t);
  t += TRANSITION.anchor;

  // Split in reverse — the square reforms while the wedges fly back in.
  tl.to(anchor, { scale: 0, opacity: 0, duration: TRANSITION.split * 0.45 }, t)
    .to(stage, { opacity: 1, scale: 1, duration: TRANSITION.split }, t)
    .fromTo(
      wedgeLeft,
      { opacity: 1, x: -spread, immediateRender: false },
      { opacity: 0, x: 0, duration: TRANSITION.split, ease: EASE_IN },
      t
    )
    .fromTo(
      wedgeRight,
      { opacity: 1, x: spread, immediateRender: false },
      { opacity: 0, x: 0, duration: TRANSITION.split, ease: EASE_IN },
      t
    );
  t += TRANSITION.split;

  // Rotation back to upright.
  tl.to(stage, { rotation: 0, duration: TRANSITION.rotate, ease: "none" }, t);
  t += TRANSITION.rotate;

  // Fill clears; the image and frame reappear.
  tl.to(fill, { opacity: 0, duration: TRANSITION.fill }, t).to(
    [image, leftBracket, rightBracket],
    { opacity: 1, duration: TRANSITION.fill },
    t
  );
  t += TRANSITION.fill;

  // Brackets open back into the homepage frame.
  tl.to(leftBracket, { x: -gap, scaleX: ARM_INITIAL, duration: TRANSITION.merge }, t).to(
    rightBracket,
    { x: gap, scaleX: ARM_INITIAL, duration: TRANSITION.merge },
    t
  );
  t += TRANSITION.merge;

  // Correct for any viewport drift, then reveal the homepage.
  tl.call(() => {
    const el = homeImage.current;
    const live = el?.getBoundingClientRect();
    if (!live || live.width === 0) return;
    const liveGap = live.width * GAP_RATIO;
    gsap.set(stage, {
      left: live.left + live.width / 2,
      top: live.top + live.height / 2,
      width: live.width,
      height: live.height,
    });
    gsap.set(leftBracket, { x: -liveGap, scaleX: ARM_INITIAL });
    gsap.set(rightBracket, { x: liveGap, scaleX: ARM_INITIAL });
  }, undefined, t);
  tl.to(overlay, { opacity: 0, duration: TRANSITION.reveal }, t);

  return tl;
}

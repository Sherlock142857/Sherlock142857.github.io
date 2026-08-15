import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  fallbackRect,
  playEnterTransition,
  playExitTransition,
  type TransitionElements,
} from "../../animations/homeTransition";
import { getFieldById } from "../../data/fields";
import type { PageTransitionState } from "../../hooks/usePageTransition";
import { asset } from "../../lib/assets";
import s from "./HomeTransition.module.css";

interface HomeTransitionProps {
  transition: PageTransitionState;
  homeContentRef: RefObject<HTMLDivElement>;
  homeImageRef: RefObject<HTMLDivElement>;
  detailAnchorRef: RefObject<HTMLDivElement>;
  onNavigateToField: (fieldId: string) => void;
  onNavigateHome: () => void;
  onDone: () => void;
}

/**
 * Full-screen overlay that owns the geometric homepage ⇄ detail transition.
 * It mounts once per transition, reproduces the homepage frame, and plays a
 * single GSAP timeline; the exit direction plays the exact inverse.
 */
export function HomeTransition({
  transition,
  homeContentRef,
  homeImageRef,
  detailAnchorRef,
  onNavigateToField,
  onNavigateHome,
  onDone,
}: HomeTransitionProps) {
  const field = getFieldById(transition.fieldId);

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const leftBracketRef = useRef<HTMLDivElement>(null);
  const rightBracketRef = useRef<HTMLDivElement>(null);
  const wedgeLeftRef = useRef<HTMLDivElement>(null);
  const wedgeRightRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const rect = transition.fromRect ?? fallbackRect();
  const stageStyle = {
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
    width: rect.width,
    height: rect.height,
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    // Enter always has a measured rect; exit tolerates a missing one (deep link)
    // and falls back to a centered square.
    if (!field || (transition.direction === "enter" && !transition.fromRect)) return;

    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const stage = stageRef.current;
    const image = imageRef.current;
    const fill = fillRef.current;
    const leftBracket = leftBracketRef.current;
    const rightBracket = rightBracketRef.current;
    const wedgeLeft = wedgeLeftRef.current;
    const wedgeRight = wedgeRightRef.current;
    const anchor = anchorRef.current;
    if (
      !overlay ||
      !backdrop ||
      !stage ||
      !image ||
      !fill ||
      !leftBracket ||
      !rightBracket ||
      !wedgeLeft ||
      !wedgeRight ||
      !anchor
    ) {
      return;
    }

    const elements: TransitionElements = {
      overlay,
      backdrop,
      stage,
      image,
      fill,
      leftBracket,
      rightBracket,
      wedgeLeft,
      wedgeRight,
      anchor,
    };

    // The overlay mounts fresh for each transition, so the effect runs once.
    const timeline =
      transition.direction === "enter"
        ? playEnterTransition({
            elements,
            fromRect: transition.fromRect as DOMRect,
            homeContent: homeContentRef.current,
            detailAnchor: detailAnchorRef,
            onNavigateToField: () => onNavigateToField(transition.fieldId),
            onComplete: onDone,
          })
        : playExitTransition({
            elements,
            fromRect: transition.fromRect,
            homeImage: homeImageRef,
            detailAnchor: detailAnchorRef,
            onNavigateHome,
            onComplete: onDone,
          });

    return () => {
      timeline.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.overlay} ref={overlayRef} aria-hidden="true">
      <div className={s.backdrop} ref={backdropRef} />
      <div className={s.stage} ref={stageRef} style={stageStyle}>
        <img
          ref={imageRef}
          className={s.stageImage}
          src={field ? asset(field.image) : undefined}
          alt=""
        />
        <div className={s.fill} ref={fillRef} />
        <div className={`${s.bracket} ${s.bracketLeft}`} ref={leftBracketRef} />
        <div className={`${s.bracket} ${s.bracketRight}`} ref={rightBracketRef} />
      </div>
      <div className={`${s.wedge} ${s.wedgeLeft}`} ref={wedgeLeftRef} />
      <div className={`${s.wedge} ${s.wedgeRight}`} ref={wedgeRightRef} />
      <div className={s.anchor} ref={anchorRef} />
    </div>
  );
}

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  defaultDiamondSpec,
  diamondPath,
  diamondSpecFromRect,
} from "../../animations/geometry";
import {
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
  detailAnchorRef: RefObject<HTMLDivElement>;
  onNavigateToField: (fieldId: string) => void;
  onNavigateHome: () => void;
  onDone: () => void;
}

/**
 * Full-screen overlay that owns the geometric homepage ⇄ detail transition:
 * two right-angle chevrons merge into a diamond, the interior fills black and
 * rotates 360°, then splits into a left chevron, a right chevron, and the solid
 * interior. The exit direction plays the exact inverse.
 */
export function HomeTransition({
  transition,
  homeContentRef,
  detailAnchorRef,
  onNavigateToField,
  onNavigateHome,
  onDone,
}: HomeTransitionProps) {
  const field = getFieldById(transition.fieldId);

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<SVGGElement>(null);
  const leftTopRef = useRef<SVGLineElement>(null);
  const leftBottomRef = useRef<SVGLineElement>(null);
  const rightTopRef = useRef<SVGLineElement>(null);
  const rightBottomRef = useRef<SVGLineElement>(null);

  const rect = transition.fromRect;
  const spec = rect ? diamondSpecFromRect(rect) : defaultDiamondSpec();
  const { cx, cy, d } = spec;
  const extent = Math.max(window.innerWidth, window.innerHeight);

  const imageStyle = rect
    ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    : undefined;

  useEffect(() => {
    if (!field || (transition.direction === "enter" && !transition.fromRect)) return;

    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    const rotator = rotatorRef.current;
    const interior = interiorRef.current;
    const leftTop = leftTopRef.current;
    const leftBottom = leftBottomRef.current;
    const rightTop = rightTopRef.current;
    const rightBottom = rightBottomRef.current;
    if (
      !overlay ||
      !backdrop ||
      !image ||
      !rotator ||
      !interior ||
      !leftTop ||
      !leftBottom ||
      !rightTop ||
      !rightBottom
    ) {
      return;
    }

    const elements: TransitionElements = {
      overlay,
      backdrop,
      image,
      rotator,
      interior,
      leftTop,
      leftBottom,
      rightTop,
      rightBottom,
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
      {imageStyle && (
        <img
          ref={imageRef}
          className={s.image}
          style={imageStyle}
          src={field ? asset(field.image) : undefined}
          alt=""
        />
      )}
      <div className={s.rotator} ref={rotatorRef} style={{ left: cx, top: cy }}>
        <svg
          className={s.geo}
          style={{ left: -extent, top: -extent, width: extent * 2, height: extent * 2, overflow: "visible" }}
        >
          <g transform={`translate(${extent} ${extent})`}>
            <g ref={interiorRef}>
              <path className={s.interior} d={diamondPath(d)} />
            </g>
            <line ref={leftTopRef} className={s.chevron} />
            <line ref={leftBottomRef} className={s.chevron} />
            <line ref={rightTopRef} className={s.chevron} />
            <line ref={rightBottomRef} className={s.chevron} />
          </g>
        </svg>
      </div>
    </div>
  );
}

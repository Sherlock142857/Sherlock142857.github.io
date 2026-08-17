import { useEffect, useState } from "react";
import type { RefObject, TransitionEvent } from "react";
import { DIAMOND_RATIO, GAP_RATIO, leftBracketLines, rightBracketLines } from "../../animations/geometry";
import type { Field } from "../../types/content";
import { Image } from "../common/Image";
import s from "./FieldCarousel.module.css";

interface FieldImageColumnProps {
  fields: Field[];
  slot: number;
  viewportRef: RefObject<HTMLDivElement>;
  trackRef: RefObject<HTMLDivElement>;
  frameRef: RefObject<HTMLDivElement>;
  y: number;
  snap: boolean;
  onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
  onSelect: (index: number) => void;
  onActivate: () => void;
}

export function FieldImageColumn({
  fields,
  slot,
  viewportRef,
  trackRef,
  frameRef,
  y,
  snap,
  onTransitionEnd,
  onSelect,
  onActivate,
}: FieldImageColumnProps) {
  const triple = [...fields, ...fields, ...fields];
  const trackStyle = {
    transform: `translate3d(0, ${y}px, 0)`,
    transition: snap ? "none" : "transform var(--dur-carousel) var(--ease-in-out)",
  };

  // Dynamically compute bracket coordinates using EXACT same method as animation
  const [bracketState, setBracketState] = useState<{
    d: number;
    leftTop: { x1: number; y1: number; x2: number; y2: number };
    leftBottom: { x1: number; y1: number; x2: number; y2: number };
    rightTop: { x1: number; y1: number; x2: number; y2: number };
    rightBottom: { x1: number; y1: number; x2: number; y2: number };
  } | null>(null);

  useEffect(() => {
    const updateBrackets = () => {
      if (!frameRef.current) return;

      const rect = frameRef.current.getBoundingClientRect();

      // Use EXACT same calculation as homeTransition.ts
      const d = rect.height * DIAMOND_RATIO;
      const gap = d * GAP_RATIO;

      // Use EXACT same functions as animation
      const left = leftBracketLines(d, gap);
      const right = rightBracketLines(d, gap);

      setBracketState({
        d,
        leftTop: left.top,
        leftBottom: left.bottom,
        rightTop: right.top,
        rightBottom: right.bottom,
      });
    };

    updateBrackets();
    window.addEventListener('resize', updateBrackets);
    return () => window.removeEventListener('resize', updateBrackets);
  }, [frameRef]);

  return (
    <div className={`${s.column} ${s.imageColumn}`} ref={viewportRef}>
      <div className={s.track} ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
        {triple.map((field, i) => {
          const isActive = i === slot;
          const visible = i === slot - 1 || i === slot || i === slot + 1;
          return (
            <div key={i} className={s.imageItem} aria-hidden={!visible || undefined}>
              <div ref={isActive ? frameRef : undefined}>
                <button
                  type="button"
                  className={isActive ? s.imageButtonActive : s.imageButton}
                  onClick={isActive ? onActivate : () => onSelect(i % fields.length)}
                  aria-label={isActive ? `Open ${field.title}` : `Show ${field.title}`}
                  tabIndex={visible ? 0 : -1}
                >
                  <Image src={field.image} alt={isActive ? field.imageAlt : ""} className={isActive ? s.imageActive : s.imageSide} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Fixed brackets overlay - uses EXACT same coordinate system as HomeTransition */}
      {bracketState && (
        <svg
          className={s.fixedBrackets}
          aria-hidden="true"
        >
          {/* Use same structure as HomeTransition: g with translate to center */}
          <g transform="translate(0, 0)">
            {/* Use <line> elements exactly like the animation */}
            <line
              className={s.chevron}
              x1={bracketState.leftTop.x1}
              y1={bracketState.leftTop.y1}
              x2={bracketState.leftTop.x2}
              y2={bracketState.leftTop.y2}
            />
            <line
              className={s.chevron}
              x1={bracketState.leftBottom.x1}
              y1={bracketState.leftBottom.y1}
              x2={bracketState.leftBottom.x2}
              y2={bracketState.leftBottom.y2}
            />
            <line
              className={s.chevron}
              x1={bracketState.rightTop.x1}
              y1={bracketState.rightTop.y1}
              x2={bracketState.rightTop.x2}
              y2={bracketState.rightTop.y2}
            />
            <line
              className={s.chevron}
              x1={bracketState.rightBottom.x1}
              y1={bracketState.rightBottom.y1}
              x2={bracketState.rightBottom.x2}
              y2={bracketState.rightBottom.y2}
            />
          </g>
        </svg>
      )}
    </div>
  );
}

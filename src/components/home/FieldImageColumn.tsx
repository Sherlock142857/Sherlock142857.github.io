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

  // Dynamically compute bracket coordinates to match animation exactly
  const [bracketCoords, setBracketCoords] = useState({ viewBox: "", leftPath: "", rightPath: "" });

  useEffect(() => {
    const updateBrackets = () => {
      if (!frameRef.current) return;

      const rect = frameRef.current.getBoundingClientRect();
      const d = rect.height * DIAMOND_RATIO;
      const gap = d * GAP_RATIO;

      const left = leftBracketLines(d, gap);
      const right = rightBracketLines(d, gap);

      // Calculate viewBox to contain both brackets with some padding
      const maxX = Math.max(Math.abs(left.top.x1), Math.abs(right.top.x1)) + 10;
      const maxY = d + 10;
      const viewBox = `${-maxX} ${-maxY} ${maxX * 2} ${maxY * 2}`;

      const leftPath = `M ${left.top.x1} ${left.top.y1} L ${left.top.x2} ${left.top.y2} M ${left.bottom.x1} ${left.bottom.y1} L ${left.bottom.x2} ${left.bottom.y2}`;
      const rightPath = `M ${right.top.x1} ${right.top.y1} L ${right.top.x2} ${right.top.y2} M ${right.bottom.x1} ${right.bottom.y1} L ${right.bottom.x2} ${right.bottom.y2}`;

      setBracketCoords({ viewBox, leftPath, rightPath });
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
      {/* Fixed brackets overlay - dynamically positioned to match animation exactly */}
      {bracketCoords.viewBox && (
        <svg
          className={s.fixedBrackets}
          viewBox={bracketCoords.viewBox}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path className={s.chevron} d={bracketCoords.leftPath} />
          <path className={s.chevron} d={bracketCoords.rightPath} />
        </svg>
      )}
    </div>
  );
}

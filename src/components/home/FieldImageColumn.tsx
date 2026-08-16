import type { RefObject, TransitionEvent } from "react";
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
      {/* Fixed brackets overlay - stays in place while images scroll */}
      <svg
        className={s.fixedBrackets}
        viewBox="-2.25 -1.1 4.5 2.2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className={s.chevron} d="M -1.05 -1 L -2.15 0 L -1.05 1" />
        <path className={s.chevron} d="M 1.05 -1 L 2.15 0 L 1.05 1" />
      </svg>
    </div>
  );
}

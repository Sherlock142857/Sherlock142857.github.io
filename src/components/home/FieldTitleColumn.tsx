import type { RefObject, TransitionEvent } from "react";
import type { Field } from "../../types/content";
import s from "./FieldCarousel.module.css";

interface FieldTitleColumnProps {
  fields: Field[];
  slot: number;
  viewportRef: RefObject<HTMLDivElement>;
  trackRef: RefObject<HTMLDivElement>;
  y: number;
  snap: boolean;
  onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
  onSelect: (index: number) => void;
  onActivate: () => void;
}

export function FieldTitleColumn({
  fields,
  slot,
  viewportRef,
  trackRef,
  y,
  snap,
  onTransitionEnd,
  onSelect,
  onActivate,
}: FieldTitleColumnProps) {
  const n = fields.length;
  const triple = [...fields, ...fields, ...fields];
  const trackStyle = {
    transform: `translate3d(0, ${y}px, 0)`,
    transition: snap ? "none" : "transform var(--dur-carousel) var(--ease-in-out)",
  };

  return (
    <div className={`${s.column} ${s.titleColumn}`} ref={viewportRef}>
      <div className={s.track} ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
        {triple.map((field, i) => {
          const isActive = i === slot;
          const visible = i >= slot - 3 && i <= slot + 3;
          const itemStyle = snap ? { transition: "none" } : undefined;
          return (
            <button
              key={i}
              type="button"
              className={`${s.titleItem} ${isActive ? s.titleActive : ""}`}
              style={itemStyle}
              onClick={() => (isActive ? onActivate() : onSelect(i % n))}
              aria-hidden={!visible || undefined}
              aria-current={isActive ? "true" : undefined}
              aria-label={isActive ? `${field.title} — open` : `Show ${field.title}`}
              tabIndex={visible ? 0 : -1}
            >
              {field.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import type { RefObject, TransitionEvent } from "react";
import type { Field } from "../../types/content";
import { Image } from "../common/Image";
import { GeometryFrame } from "./GeometryFrame";
import s from "./FieldCarousel.module.css";

interface FieldImageColumnProps {
  fields: Field[];
  slot: number;
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
    <div className={`${s.column} ${s.imageColumn}`}>
      <div className={s.track} ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
        {triple.map((field, i) => {
          const isActive = i === slot;
          const visible = i === slot - 1 || i === slot || i === slot + 1;
          return (
            <div key={i} className={s.imageItem} aria-hidden={!visible || undefined}>
              {isActive ? (
                <GeometryFrame field={field} frameRef={frameRef} onClick={onActivate} />
              ) : (
                <button
                  type="button"
                  className={s.imageButton}
                  onClick={() => onSelect(i % fields.length)}
                  aria-label={`Show ${field.title}`}
                  tabIndex={visible ? 0 : -1}
                >
                  <Image src={field.image} alt="" className={s.imageSide} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

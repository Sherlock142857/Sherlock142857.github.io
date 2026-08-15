import type { RefObject } from "react";
import type { Field } from "../../types/content";
import { Image } from "../common/Image";
import s from "./GeometryFrame.module.css";

interface GeometryFrameProps {
  field: Field;
  frameRef: RefObject<HTMLDivElement>;
  onClick: () => void;
}

/**
 * The framed homepage image. The two square-corner brackets are built from
 * border geometry (not typographic glyphs) so their exact angle, stroke, scale,
 * and spacing are controllable — and so the transition overlay can reproduce
 * them precisely.
 */
export function GeometryFrame({ field, frameRef, onClick }: GeometryFrameProps) {
  return (
    <div className={s.frame} ref={frameRef}>
      <span className={`${s.bracket} ${s.bracketLeft}`} aria-hidden="true" />
      <span className={`${s.bracket} ${s.bracketRight}`} aria-hidden="true" />
      <button type="button" className={s.trigger} onClick={onClick} aria-label={`Open ${field.title}`}>
        <Image src={field.image} alt={field.imageAlt} eager className={s.image} />
      </button>
    </div>
  );
}

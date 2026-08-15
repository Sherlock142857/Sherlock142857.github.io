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
 * The framed homepage image. The two square-corner chevrons (`<` and `>`) are
 * SVG polylines — each is two equal-length edges meeting at a 90° corner whose
 * vertex points outward — so their exact angle, stroke, scale, and spacing are
 * controllable, and the transition overlay can reproduce them precisely.
 */
export function GeometryFrame({ field, frameRef, onClick }: GeometryFrameProps) {
  return (
    <div className={s.frame} ref={frameRef}>
      <button type="button" className={s.trigger} onClick={onClick} aria-label={`Open ${field.title}`}>
        <Image src={field.image} alt={field.imageAlt} eager className={s.image} />
      </button>
      <svg
        className={s.brackets}
        viewBox="-1.4 -1.1 2.8 2.2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className={s.chevron} d="M -0.3 -1 L -1.3 0 L -0.3 1" />
        <path className={s.chevron} d="M 0.3 -1 L 1.3 0 L 0.3 1" />
      </svg>
    </div>
  );
}

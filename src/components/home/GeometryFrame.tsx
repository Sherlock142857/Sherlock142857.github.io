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
 * The framed homepage image for the transition overlay.
 * Note: The visible brackets are now rendered in FieldImageColumn as a fixed overlay.
 * This component only provides the image that gets captured by the transition animation.
 */
export function GeometryFrame({ field, frameRef, onClick }: GeometryFrameProps) {
  return (
    <div className={s.frame} ref={frameRef}>
      <button type="button" className={s.trigger} onClick={onClick} aria-label={`Open ${field.title}`}>
        <Image src={field.image} alt={field.imageAlt} eager className={s.image} />
      </button>
    </div>
  );
}

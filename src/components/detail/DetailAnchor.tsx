import type { RefObject } from "react";
import s from "./Detail.module.css";

/**
 * The small black square that links the detail page back to the homepage
 * transition. Its position is measured by the transition overlay so the entry
 * animation can land the anchor precisely here.
 */
export function DetailAnchor({ anchorRef }: { anchorRef: RefObject<HTMLDivElement> }) {
  return <div ref={anchorRef} className={s.anchor} aria-hidden="true" />;
}

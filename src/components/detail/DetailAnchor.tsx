import type { RefObject } from "react";
import { diamondPath } from "../../animations/geometry";
import s from "./Detail.module.css";

/**
 * The solid diamond that links the detail page back to the homepage transition.
 * Its position is measured by the transition overlay so the split interior can
 * settle precisely here.
 */
export function DetailAnchor({ anchorRef, d }: { anchorRef: RefObject<HTMLDivElement>; d: number }) {
  return (
    <div ref={anchorRef} className={s.anchor} aria-hidden="true">
      <svg width={2 * d} height={2 * d} viewBox={`${-d} ${-d} ${2 * d} ${2 * d}`}>
        <path className={s.anchorFill} d={diamondPath(d)} />
      </svg>
    </div>
  );
}

import { useEffect, useState } from "react";
import { framingBracketLines, type Line } from "../../animations/geometry";
import s from "./Detail.module.css";

/**
 * The two framing chevrons (`<` and `>`) that remain on the detail page,
 * fixed at the left and right edges of the viewport.
 */
export function DetailFraming({ d, cy }: { d: number; cy: number }) {
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const framing = framingBracketLines({ cx: 0, cy, d }, vw);

  return (
    <svg className={s.framing} aria-hidden="true">
      <line className={s.frameChevron} {...lineProps(framing.left.top)} />
      <line className={s.frameChevron} {...lineProps(framing.left.bottom)} />
      <line className={s.frameChevron} {...lineProps(framing.right.top)} />
      <line className={s.frameChevron} {...lineProps(framing.right.bottom)} />
    </svg>
  );
}

function lineProps(line: Line) {
  return { x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 };
}

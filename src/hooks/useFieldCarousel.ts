import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { RefObject, TransitionEvent } from "react";
import { computeTrackY } from "../animations/carousel";
import type { Field } from "../types/content";

export interface FieldCarouselApi {
  viewportRef: RefObject<HTMLDivElement>;
  titleTrackRef: RefObject<HTMLDivElement>;
  imageTrackRef: RefObject<HTMLDivElement>;
  slot: number;
  activeIndex: number;
  activeField: Field;
  previous: Field;
  next: Field;
  y: number;
  snap: boolean;
  advance: (dir: 1 | -1) => void;
  goTo: (index: number) => void;
  onTrackTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
}

/**
 * Single source of truth for the homepage carousel. The title and image columns
 * are driven by one `slot` value, so they can never fall out of sync. There is
 * no autoplay — the carousel is advanced by mouse wheel, keyboard, or click.
 */
export function useFieldCarousel(fields: Field[], initialIndex = 0): FieldCarouselApi {
  const n = fields.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);

  // Start in the middle copy of the tripled list so the loop has no visible
  // end. `initialIndex` restores the field the visitor was viewing on return.
  const initialSlot = n + (((initialIndex % n) + n) % n);
  const [slot, setSlot] = useState(initialSlot);
  const [slotHeight, setSlotHeight] = useState(0);
  const [snap, setSnap] = useState(false);

  const slotRef = useRef(slot);
  const animatingRef = useRef(false);

  // Measure the slot height (the viewport is exactly three slots tall). A layout
  // effect keeps the first paint correctly positioned instead of animating in.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setSlotHeight(el.clientHeight / 3);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeIndex = ((slot % n) + n) % n;

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (animatingRef.current || n === 0) return;
      animatingRef.current = true;
      setSnap(false);
      slotRef.current = slotRef.current + dir;
      setSlot(slotRef.current);
    },
    [n]
  );

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current || n === 0) return;
      const target = ((index % n) + n) % n;
      const current = ((slotRef.current % n) + n) % n;
      let delta = target - current;
      if (delta > n / 2) delta -= n;
      else if (delta < -n / 2) delta += n;
      if (delta === 0) return;
      animatingRef.current = true;
      setSnap(false);
      slotRef.current = slotRef.current + delta;
      setSlot(slotRef.current);
    },
    [n]
  );

  const onTrackTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "transform") return;
      animatingRef.current = false;
      const s = slotRef.current;
      // Rebase into the middle copy without a visible jump: snap to the
      // visually identical position, then re-enable transitions next frame.
      if (s >= 2 * n || s < n) {
        const normalized = s >= 2 * n ? s - n : s + n;
        slotRef.current = normalized;
        setSnap(true);
        setSlot(normalized);
        requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
      }
    },
    [n]
  );

  const y = computeTrackY(slot, slotHeight);

  return {
    viewportRef,
    titleTrackRef,
    imageTrackRef,
    slot,
    activeIndex,
    activeField: fields[activeIndex],
    previous: fields[(activeIndex - 1 + n) % n],
    next: fields[(activeIndex + 1) % n],
    y,
    snap,
    advance,
    goTo,
    onTrackTransitionEnd,
  };
}

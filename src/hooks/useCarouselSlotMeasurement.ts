import { useLayoutEffect, useState } from "react";
import type { RefObject } from "react";
import { PERFORMANCE } from "../config/designTokens";

/**
 * Measures the slot height for carousel columns.
 *
 * Each carousel column is divided into equal-height slots:
 * - Title column: 5 slots (tighter spacing)
 * - Image column: 3 slots (larger images)
 *
 * Uses ResizeObserver to track viewport size changes and updates slot heights accordingly.
 * Throttled to avoid excessive re-measurements during window resize.
 *
 * @param viewportRef - Reference to the viewport container
 * @param slotCount - Number of slots in the viewport (3 or 5)
 * @returns Current slot height in pixels
 */
export function useCarouselSlotMeasurement(
  viewportRef: RefObject<HTMLDivElement>,
  slotCount: number
): number {
  const [slotHeight, setSlotHeight] = useState(0);

  useLayoutEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const measure = () => {
      if (viewportRef.current) {
        setSlotHeight(viewportRef.current.clientHeight / slotCount);
      }
    };

    const throttledMeasure = () => {
      if (throttleTimer !== null) return;
      throttleTimer = setTimeout(() => {
        measure();
        throttleTimer = null;
      }, PERFORMANCE.resizeThrottleMs);
    };

    // Measure immediately on mount
    measure();

    const observer = new ResizeObserver(throttledMeasure);
    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    return () => {
      observer.disconnect();
      if (throttleTimer !== null) {
        clearTimeout(throttleTimer);
      }
    };
  }, [viewportRef, slotCount]);

  return slotHeight;
}

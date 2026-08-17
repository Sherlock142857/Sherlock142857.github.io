import { useCallback, useRef, useState } from "react";
import type { TransitionEvent } from "react";

/**
 * State management for infinite carousel navigation.
 *
 * Implements a tripled-list infinite scroll pattern:
 * - The rendered track contains [items, items, items] (three copies)
 * - The slot index starts in the middle copy (n + initialIndex)
 * - When scrolling beyond boundaries, snaps back to the middle copy without visual jump
 *
 * This ensures there's always context above and below the active item,
 * creating a seamless infinite loop.
 *
 * @param itemCount - Total number of items in the carousel
 * @param initialIndex - Starting index (0-based)
 * @returns Navigation state and control functions
 */
export function useCarouselNavigation(itemCount: number, initialIndex = 0) {
  const n = itemCount;

  // Start in the middle copy of the tripled list
  const initialSlot = n + (((initialIndex % n) + n) % n);
  const [slot, setSlot] = useState(initialSlot);
  const [snap, setSnap] = useState(false);

  const slotRef = useRef(slot);
  const animatingRef = useRef(false);

  /**
   * Advance the carousel by one step.
   *
   * @param dir - Direction: 1 for next, -1 for previous
   */
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

  /**
   * Jump directly to a specific item index.
   * Calculates the shortest path (considering the infinite loop).
   *
   * @param index - Target item index (0-based)
   */
  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current || n === 0) return;
      const target = ((index % n) + n) % n;
      const current = ((slotRef.current % n) + n) % n;
      let delta = target - current;

      // Choose shortest path around the loop
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

  /**
   * Handle transition end - rebase to middle copy if needed.
   * This creates the infinite loop illusion by snapping to the visually
   * identical position in the middle copy after scrolling past boundaries.
   */
  const onTrackTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "transform") return;
      animatingRef.current = false;
      const s = slotRef.current;

      // Rebase into the middle copy without a visible jump
      if (s >= 2 * n || s < n) {
        const normalized = s >= 2 * n ? s - n : s + n;
        slotRef.current = normalized;
        setSnap(true);
        setSlot(normalized);
        // Re-enable transitions after snap completes
        requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
      }
    },
    [n]
  );

  // Current active item index (0-based)
  const activeIndex = ((slot % n) + n) % n;

  return {
    slot,
    activeIndex,
    snap,
    advance,
    goTo,
    onTrackTransitionEnd,
  };
}

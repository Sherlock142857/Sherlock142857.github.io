/**
 * Carousel track math. Both the title and image columns share the same slot
 * height, so a single `y` value drives the two tracks in perfect sync.
 *
 * The rendered track is the field list repeated three times; `slot` points at
 * the list index of the active item and starts in the middle copy so there is
 * always a previous and a next item above and below.
 */
export function computeTrackY(slot: number, slotHeight: number): number {
  return -(slot - 1) * slotHeight;
}

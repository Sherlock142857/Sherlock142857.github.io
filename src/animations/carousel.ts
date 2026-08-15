/**
 * Carousel track math.
 *
 * The rendered track is the field list repeated three times; `slot` points at
 * the list index of the active item and starts in the middle copy so there is
 * always context above and below. `centerIndex` is the number of slots above
 * the active item — 1 for a three-slot window (images), 2 for a five-slot
 * window (titles).
 */
export function computeTrackY(slot: number, slotHeight: number, centerIndex: number): number {
  return -(slot - centerIndex) * slotHeight;
}

import { useRef } from "react";
import type { RefObject, TransitionEvent } from "react";
import { computeTrackY } from "../animations/carousel";
import type { Field } from "../types/content";
import { useCarouselNavigation } from "./useCarouselNavigation";
import { useCarouselSlotMeasurement } from "./useCarouselSlotMeasurement";

/**
 * Number of slots visible in each carousel column.
 */
const TITLE_COLUMN_SLOTS = 5;
const IMAGE_COLUMN_SLOTS = 3;

/**
 * API returned by useFieldCarousel hook.
 * Provides refs, state, and control functions for the carousel.
 */
export interface FieldCarouselApi {
  /** Ref for the title column viewport container */
  titleViewportRef: RefObject<HTMLDivElement>;
  /** Ref for the image column viewport container */
  imageViewportRef: RefObject<HTMLDivElement>;
  /** Ref for the title column track (the sliding element) */
  titleTrackRef: RefObject<HTMLDivElement>;
  /** Ref for the image column track (the sliding element) */
  imageTrackRef: RefObject<HTMLDivElement>;
  /** Current slot index in the tripled list */
  slot: number;
  /** Current active item index (0-based, in original list) */
  activeIndex: number;
  /** Currently active field */
  activeField: Field;
  /** Previous field in the list */
  previous: Field;
  /** Next field in the list */
  next: Field;
  /** Title track Y position (CSS transform) */
  titleY: number;
  /** Image track Y position (CSS transform) */
  imageY: number;
  /** Whether to disable transitions (for instant snap-back) */
  snap: boolean;
  /** Advance carousel by one step */
  advance: (dir: 1 | -1) => void;
  /** Jump to a specific item */
  goTo: (index: number) => void;
  /** Handle track transition end event */
  onTrackTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
}

/**
 * Single source of truth for the homepage carousel.
 *
 * Manages the synchronized scrolling of two columns:
 * - Title column: 5 visible slots with tighter spacing
 * - Image column: 3 visible slots with larger images
 *
 * Both columns are driven by one `slot` value, so they advance together.
 * Only the active title sits level with the active image due to different
 * slot counts and heights.
 *
 * Uses an infinite scroll pattern with a tripled list to create seamless looping.
 *
 * @param fields - Array of fields to display in the carousel
 * @param initialIndex - Starting index (used for restoring position after navigation)
 * @returns Carousel API with refs, state, and control functions
 */
export function useFieldCarousel(fields: Field[], initialIndex = 0): FieldCarouselApi {
  const n = fields.length;

  // DOM refs for both columns
  const titleViewportRef = useRef<HTMLDivElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);

  // Measure slot heights (responsive, updates on resize)
  const titleSlotHeight = useCarouselSlotMeasurement(titleViewportRef, TITLE_COLUMN_SLOTS);
  const imageSlotHeight = useCarouselSlotMeasurement(imageViewportRef, IMAGE_COLUMN_SLOTS);

  // Navigation state and controls
  const navigation = useCarouselNavigation(n, initialIndex);

  // Calculate track positions
  // Title column shows 5 slots, so center index is 2 (0, 1, [2], 3, 4)
  const titleY = computeTrackY(navigation.slot, titleSlotHeight, 2);
  // Image column shows 3 slots, so center index is 1 (0, [1], 2)
  const imageY = computeTrackY(navigation.slot, imageSlotHeight, 1);

  return {
    titleViewportRef,
    imageViewportRef,
    titleTrackRef,
    imageTrackRef,
    slot: navigation.slot,
    activeIndex: navigation.activeIndex,
    activeField: fields[navigation.activeIndex],
    previous: fields[(navigation.activeIndex - 1 + n) % n],
    next: fields[(navigation.activeIndex + 1) % n],
    titleY,
    imageY,
    snap: navigation.snap,
    advance: navigation.advance,
    goTo: navigation.goTo,
    onTrackTransitionEnd: navigation.onTrackTransitionEnd,
  };
}

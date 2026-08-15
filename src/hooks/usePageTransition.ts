import { useCallback, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Route } from "./useHashRoute";
import { useReducedMotion } from "./useReducedMotion";

export type TransitionDirection = "enter" | "exit";

export interface PageTransitionState {
  direction: TransitionDirection;
  fieldId: string;
  /** Homepage image rect — known at entry, cached for the return trip. */
  fromRect: DOMRect | null;
}

export interface PageTransitionApi {
  transition: PageTransitionState | null;
  enter: (fieldId: string, fromRect: DOMRect) => void;
  exit: (fieldId: string) => void;
  clear: () => void;
  homeContentRef: RefObject<HTMLDivElement>;
  homeImageRef: RefObject<HTMLDivElement>;
  detailAnchorRef: RefObject<HTMLDivElement>;
}

/**
 * Coordinates the shared geometry transition between the homepage and detail
 * pages. For users who prefer reduced motion, entry and exit skip the timeline
 * and navigate directly.
 */
export function usePageTransition(navigate: (route: Route) => void): PageTransitionApi {
  const reducedMotion = useReducedMotion();
  const [transition, setTransition] = useState<PageTransitionState | null>(null);

  const homeContentRef = useRef<HTMLDivElement>(null);
  const homeImageRef = useRef<HTMLDivElement>(null);
  const detailAnchorRef = useRef<HTMLDivElement>(null);
  const fromRectRef = useRef<DOMRect | null>(null);

  const enter = useCallback(
    (fieldId: string, fromRect: DOMRect) => {
      fromRectRef.current = fromRect;
      if (reducedMotion) {
        navigate({ name: "field", fieldId });
        return;
      }
      setTransition({ direction: "enter", fieldId, fromRect });
    },
    [navigate, reducedMotion]
  );

  const exit = useCallback(
    (fieldId: string) => {
      if (reducedMotion) {
        navigate({ name: "home" });
        return;
      }
      setTransition({ direction: "exit", fieldId, fromRect: fromRectRef.current });
    },
    [navigate, reducedMotion]
  );

  const clear = useCallback(() => setTransition(null), []);

  return {
    transition,
    enter,
    exit,
    clear,
    homeContentRef,
    homeImageRef,
    detailAnchorRef,
  };
}

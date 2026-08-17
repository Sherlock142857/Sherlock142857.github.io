import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { isMobileViewport } from "../../config/breakpoints";
import { useFieldCarousel } from "../../hooks/useFieldCarousel";
import type { Field } from "../../types/content";
import { FieldImageColumn } from "./FieldImageColumn";
import { FieldMetadata } from "./FieldMetadata";
import { FieldTitleColumn } from "./FieldTitleColumn";
import s from "./FieldCarousel.module.css";

interface FieldCarouselProps {
  fields: Field[];
  frameRef: RefObject<HTMLDivElement>;
  initialIndex?: number;
  onActivate: (fieldId: string) => void;
}

export function FieldCarousel({ fields, frameRef, initialIndex = 0, onActivate }: FieldCarouselProps) {
  const carousel = useFieldCarousel(fields, initialIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const { activeField, advance } = carousel;

  const handleActivate = () => onActivate(activeField.id);

  // Mouse wheel advances the carousel (desktop-first; on small screens the page
  // scrolls normally). Attached non-passively so preventDefault works.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      // Skip wheel handling on mobile viewports - allow normal scroll
      if (isMobileViewport()) return;
      event.preventDefault();
      advance(event.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  return (
    <section
      ref={sectionRef}
      className={s.carousel}
      aria-label="Fields"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          advance(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          advance(-1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          handleActivate();
        }
      }}
    >
      <FieldTitleColumn
        fields={fields}
        slot={carousel.slot}
        viewportRef={carousel.titleViewportRef}
        trackRef={carousel.titleTrackRef}
        y={carousel.titleY}
        snap={carousel.snap}
        onTransitionEnd={carousel.onTrackTransitionEnd}
        onSelect={carousel.goTo}
        onActivate={handleActivate}
      />
      <FieldImageColumn
        fields={fields}
        slot={carousel.slot}
        viewportRef={carousel.imageViewportRef}
        trackRef={carousel.imageTrackRef}
        frameRef={frameRef}
        y={carousel.imageY}
        snap={carousel.snap}
        onTransitionEnd={carousel.onTrackTransitionEnd}
        onSelect={carousel.goTo}
        onActivate={handleActivate}
      />
      <FieldMetadata key={activeField.id} field={activeField} />
    </section>
  );
}

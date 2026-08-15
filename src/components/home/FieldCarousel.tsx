import type { RefObject } from "react";
import { useFieldCarousel } from "../../hooks/useFieldCarousel";
import type { Field } from "../../types/content";
import { FieldImageColumn } from "./FieldImageColumn";
import { FieldMetadata } from "./FieldMetadata";
import { FieldTitleColumn } from "./FieldTitleColumn";
import s from "./FieldCarousel.module.css";

interface FieldCarouselProps {
  fields: Field[];
  frameRef: RefObject<HTMLDivElement>;
  onActivate: (fieldId: string) => void;
}

export function FieldCarousel({ fields, frameRef, onActivate }: FieldCarouselProps) {
  const carousel = useFieldCarousel(fields);
  const { activeField } = carousel;

  const handleActivate = () => onActivate(activeField.id);

  return (
    <section
      className={s.carousel}
      aria-label="Fields"
      tabIndex={0}
      onMouseEnter={carousel.onHoverStart}
      onMouseLeave={carousel.onHoverEnd}
      onFocus={carousel.onHoverStart}
      onBlur={carousel.onHoverEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          carousel.advance(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          carousel.advance(-1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          handleActivate();
        }
      }}
    >
      <FieldTitleColumn
        fields={fields}
        slot={carousel.slot}
        viewportRef={carousel.viewportRef}
        trackRef={carousel.titleTrackRef}
        y={carousel.y}
        snap={carousel.snap}
        onTransitionEnd={carousel.onTrackTransitionEnd}
        onSelect={carousel.goTo}
        onActivate={handleActivate}
      />
      <FieldImageColumn
        fields={fields}
        slot={carousel.slot}
        trackRef={carousel.imageTrackRef}
        frameRef={frameRef}
        y={carousel.y}
        snap={carousel.snap}
        onTransitionEnd={carousel.onTrackTransitionEnd}
        onSelect={carousel.goTo}
        onActivate={handleActivate}
      />
      <FieldMetadata key={activeField.id} field={activeField} />
    </section>
  );
}

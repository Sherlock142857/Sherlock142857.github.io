import type { Field } from "../../types/content";
import s from "./FieldCarousel.module.css";

export function FieldMetadata({ field }: { field: Field }) {
  return (
    <div className={s.meta} aria-live="polite">
      {field.metadata?.lines.map((line, index) => (
        <span key={index} className={s.metaLine}>
          {line}
        </span>
      ))}
    </div>
  );
}

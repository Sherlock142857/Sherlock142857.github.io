import type { Field } from "../../types/content";
import s from "./FieldCarousel.module.css";

/**
 * Display metadata for the currently active field in the carousel.
 * Shows metadata as a vertical list of small uppercase labels.
 */
export function FieldMetadata({ field }: { field: Field }) {
  const metadata = field.metadata;

  if (!metadata || !metadata.lines) return null;

  return (
    <div className={s.meta} aria-live="polite">
      {metadata.lines.map((line: string, index: number) => (
        <span key={index} className={s.metaLine}>
          {line}
        </span>
      ))}
    </div>
  );
}

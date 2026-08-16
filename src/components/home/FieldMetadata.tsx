import type { Field } from "../../types/content";
import s from "./FieldCarousel.module.css";

/**
 * Display metadata for the currently active field in the carousel.
 * Supports both legacy string array format and structured key-value pairs.
 */
export function FieldMetadata({ field }: { field: Field }) {
  const metadata = field.metadata;

  if (!metadata) return null;

  // Support both legacy 'lines' format and new 'entries' format
  const lines = 'lines' in metadata
    ? metadata.lines
    : metadata.entries.flatMap(entry => [entry.key, entry.value]);

  return (
    <div className={s.meta} aria-live="polite">
      {lines.map((line, index) => (
        <span key={index} className={s.metaLine}>
          {line}
        </span>
      ))}
    </div>
  );
}

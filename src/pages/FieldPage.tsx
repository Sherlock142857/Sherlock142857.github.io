import type { RefObject } from "react";
import type { DiamondSpec } from "../animations/geometry";
import { DetailPage } from "../components/detail/DetailPage";
import type { Field } from "../types/content";

interface FieldPageProps {
  field: Field;
  diamond: DiamondSpec;
  detailAnchorRef: RefObject<HTMLDivElement>;
  onExit: (fieldId: string) => void;
}

/** Route-level wrapper for a field detail page. */
export function FieldPage({ field, diamond, detailAnchorRef, onExit }: FieldPageProps) {
  return (
    <DetailPage
      field={field}
      diamond={diamond}
      detailAnchorRef={detailAnchorRef}
      onExit={() => onExit(field.id)}
    />
  );
}

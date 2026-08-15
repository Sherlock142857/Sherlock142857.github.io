import type { RefObject } from "react";
import { DetailPage } from "../components/detail/DetailPage";
import type { Field } from "../types/content";

interface FieldPageProps {
  field: Field;
  detailAnchorRef: RefObject<HTMLDivElement>;
  onExit: (fieldId: string) => void;
}

/** Route-level wrapper for a field detail page. */
export function FieldPage({ field, detailAnchorRef, onExit }: FieldPageProps) {
  return <DetailPage field={field} detailAnchorRef={detailAnchorRef} onExit={() => onExit(field.id)} />;
}

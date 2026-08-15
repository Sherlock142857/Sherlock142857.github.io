import type { FieldDetail } from "../../types/content";
import { Body, Section } from "../common/Typography";
import s from "./Detail.module.css";

export function DetailSections({ detail }: { detail: FieldDetail }) {
  return (
    <>
      {detail.sections?.map((section, index) => (
        <section key={index} className={s.section}>
          {section.heading && <Section>{section.heading}</Section>}
          {section.paragraphs.map((paragraph, i) => (
            <Body key={i}>{paragraph}</Body>
          ))}
        </section>
      ))}
    </>
  );
}

/** Template A — text only. */
export function DetailText({ detail }: { detail: FieldDetail }) {
  return (
    <div className={s.textOnly}>
      <DetailSections detail={detail} />
    </div>
  );
}

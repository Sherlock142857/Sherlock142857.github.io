import type { RefObject } from "react";
import type { Field } from "../../types/content";
import { Title } from "../common/Typography";
import { BackButton } from "./BackButton";
import { DetailAnchor } from "./DetailAnchor";
import { DetailImageColumn } from "./DetailImageColumn";
import { DetailStaticImage } from "./DetailStaticImage";
import { DetailText } from "./DetailText";
import s from "./Detail.module.css";

interface DetailPageProps {
  field: Field;
  detailAnchorRef: RefObject<HTMLDivElement>;
  onExit: () => void;
}

export function DetailPage({ field, detailAnchorRef, onExit }: DetailPageProps) {
  const { detail } = field;

  return (
    <div className={s.page}>
      <div className={s.top}>
        <BackButton onClick={onExit} />
      </div>
      <header className={s.header}>
        <div className={s.titleRow}>
          <DetailAnchor anchorRef={detailAnchorRef} />
          <Title as="h1">{detail.title}</Title>
        </div>
        {detail.subtitle && <p className={`t-subtitle ${s.subtitle}`}>{detail.subtitle}</p>}
      </header>
      <main className={s.main}>
        {detail.template === "text" && <DetailText detail={detail} />}
        {detail.template === "text-image" && <DetailStaticImage detail={detail} />}
        {detail.template === "text-gallery" && <DetailImageColumn detail={detail} />}
      </main>
    </div>
  );
}

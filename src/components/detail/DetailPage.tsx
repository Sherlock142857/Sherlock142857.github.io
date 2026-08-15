import type { RefObject } from "react";
import type { DiamondSpec } from "../../animations/geometry";
import type { Field } from "../../types/content";
import { Title } from "../common/Typography";
import { BackButton } from "./BackButton";
import { DetailAnchor } from "./DetailAnchor";
import { DetailFraming } from "./DetailFraming";
import { DetailImageColumn } from "./DetailImageColumn";
import { DetailStaticImage } from "./DetailStaticImage";
import { DetailText } from "./DetailText";
import s from "./Detail.module.css";

interface DetailPageProps {
  field: Field;
  diamond: DiamondSpec;
  detailAnchorRef: RefObject<HTMLDivElement>;
  onExit: () => void;
}

export function DetailPage({ field, diamond, detailAnchorRef, onExit }: DetailPageProps) {
  const { detail } = field;

  return (
    <>
      <DetailFraming d={diamond.d} cy={diamond.cy} />
      <div className={s.page}>
        <div className={s.top}>
          <BackButton onClick={onExit} />
        </div>
        <header className={s.header}>
          <DetailAnchor anchorRef={detailAnchorRef} d={diamond.d} />
          <Title as="h1">{detail.title}</Title>
          {detail.subtitle && <p className={`t-subtitle ${s.subtitle}`}>{detail.subtitle}</p>}
        </header>
        <main className={s.main}>
          {detail.template === "text" && <DetailText detail={detail} />}
          {detail.template === "text-image" && <DetailStaticImage detail={detail} />}
          {detail.template === "text-gallery" && <DetailImageColumn detail={detail} />}
        </main>
      </div>
    </>
  );
}

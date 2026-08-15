import type { FieldDetail } from "../../types/content";
import { Image } from "../common/Image";
import { DetailSections } from "./DetailText";
import s from "./Detail.module.css";

/** Template B — text left, one static image right. */
export function DetailStaticImage({ detail }: { detail: FieldDetail }) {
  return (
    <div className={s.split}>
      <div className={s.text}>
        <DetailSections detail={detail} />
      </div>
      {detail.image && (
        <figure className={s.visual}>
          <Image src={detail.image.src} alt={detail.image.alt} className={s.staticImage} />
        </figure>
      )}
    </div>
  );
}

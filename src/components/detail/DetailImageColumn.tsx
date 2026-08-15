import type { FieldDetail } from "../../types/content";
import { Image } from "../common/Image";
import { DetailSections } from "./DetailText";
import s from "./Detail.module.css";

/** Template C — text left, a quietly auto-scrolling image column right. */
export function DetailImageColumn({ detail }: { detail: FieldDetail }) {
  const images = detail.images ?? [];
  // Render twice so the CSS translate loop wraps without a seam.
  const loop = [...images, ...images];

  return (
    <div className={s.split}>
      <div className={s.text}>
        <DetailSections detail={detail} />
      </div>
      <div className={s.gallery} aria-hidden="true">
        <div className={s.galleryTrack}>
          {loop.map((image, index) => (
            <Image key={index} src={image.src} alt={image.alt} className={s.galleryImage} />
          ))}
        </div>
      </div>
    </div>
  );
}

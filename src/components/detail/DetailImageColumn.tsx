import { useEffect, useRef, useState } from "react";
import type { FieldDetail } from "../../types/content";
import { Image } from "../common/Image";
import { DetailSections } from "./DetailText";
import s from "./Detail.module.css";

/** Template C — text left, a quietly auto-scrolling image column right. */
export function DetailImageColumn({ detail }: { detail: FieldDetail }) {
  const images = detail.images ?? [];
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [repetitions, setRepetitions] = useState(2);

  useEffect(() => {
    const measureAndAdjust = () => {
      if (!textRef.current || !galleryRef.current || images.length === 0) return;

      const textHeight = textRef.current.clientHeight;

      // Load first image to measure its height
      const firstImage = images[0];
      const img = new window.Image();

      img.onload = () => {
        const imageAspectRatio = img.naturalHeight / img.naturalWidth;
        const galleryWidth = galleryRef.current?.clientWidth ?? 360;
        const estimatedImageHeight = galleryWidth * imageAspectRatio;
        const spacingBetweenImages = 24; // var(--space-md) approximately 24px

        const singleLoopHeight = images.length * (estimatedImageHeight + spacingBetweenImages);

        // Calculate how many repetitions we need to cover the text height
        // We want at least enough to fill the visible gallery + have smooth looping
        const minRepetitions = Math.max(2, Math.ceil((textHeight * 1.5) / singleLoopHeight));

        setRepetitions(minRepetitions);
      };

      img.src = firstImage.src.startsWith('/') ? firstImage.src : `/${firstImage.src}`;
    };

    // Measure on mount and on window resize
    measureAndAdjust();
    window.addEventListener('resize', measureAndAdjust);

    // Also measure after a short delay to ensure content is rendered
    const timer = setTimeout(measureAndAdjust, 100);

    return () => {
      window.removeEventListener('resize', measureAndAdjust);
      clearTimeout(timer);
    };
  }, [images]);

  // Create the repeated image array
  const loop = Array(repetitions).fill(images).flat();

  return (
    <div className={s.split}>
      <div className={s.text} ref={textRef}>
        <DetailSections detail={detail} />
      </div>
      <div className={s.gallery} ref={galleryRef} aria-hidden="true">
        <div className={s.galleryTrack} style={{ animationDuration: `${repetitions * 13}s` }}>
          {loop.map((image, index) => (
            <Image key={index} src={image.src} alt={image.alt} className={s.galleryImage} />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { RefObject } from "react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { FieldCarousel } from "../components/home/FieldCarousel";
import { fields } from "../data/fields";
import s from "./HomePage.module.css";

interface HomePageProps {
  homeContentRef: RefObject<HTMLDivElement>;
  homeImageRef: RefObject<HTMLDivElement>;
  initialIndex?: number;
  onEnter: (fieldId: string, fromRect: DOMRect) => void;
}

export function HomePage({ homeContentRef, homeImageRef, initialIndex = 0, onEnter }: HomePageProps) {
  const handleActivate = (fieldId: string) => {
    const frame = homeImageRef.current;
    if (frame) onEnter(fieldId, frame.getBoundingClientRect());
  };

  return (
    <div className={s.home} ref={homeContentRef}>
      <SiteHeader />
      <main className={s.main}>
        <FieldCarousel
          fields={fields}
          frameRef={homeImageRef}
          initialIndex={initialIndex}
          onActivate={handleActivate}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

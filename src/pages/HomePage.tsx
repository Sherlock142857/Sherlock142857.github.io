import type { RefObject } from "react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { FieldCarousel } from "../components/home/FieldCarousel";
import { fields } from "../data/fields";
import s from "./HomePage.module.css";

interface HomePageProps {
  homeContentRef: RefObject<HTMLDivElement>;
  homeImageRef: RefObject<HTMLDivElement>;
  onEnter: (fieldId: string, fromRect: DOMRect) => void;
}

export function HomePage({ homeContentRef, homeImageRef, onEnter }: HomePageProps) {
  const handleActivate = (fieldId: string) => {
    const frame = homeImageRef.current;
    if (frame) onEnter(fieldId, frame.getBoundingClientRect());
  };

  return (
    <div className={s.home} ref={homeContentRef}>
      <SiteHeader />
      <main className={s.main}>
        <FieldCarousel fields={fields} frameRef={homeImageRef} onActivate={handleActivate} />
      </main>
      <SiteFooter />
    </div>
  );
}

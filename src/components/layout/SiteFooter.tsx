import s from "./SiteFooter.module.css";

/**
 * The bottom corners are intentionally empty — the whitespace is part of the
 * composition. This component exists so the four-corner grid has a home for any
 * future corner content.
 */
export function SiteFooter() {
  return (
    <footer className={s.footer} aria-hidden="true">
      <span className={s.corner} />
      <span className={s.corner} />
    </footer>
  );
}

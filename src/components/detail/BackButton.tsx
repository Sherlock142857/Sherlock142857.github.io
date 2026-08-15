import s from "./Detail.module.css";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={s.back} onClick={onClick} aria-label="Back to homepage">
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}

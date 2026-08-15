import { site } from "../../data/site";
import s from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={s.header}>
      <div className={s.name}>{site.name}</div>
      <div className={s.identity}>
        {site.identity.map((line) => (
          <span key={line} className={s.line}>
            {line}
          </span>
        ))}
        <a className={`${s.line} ${s.contact}`} href={site.contact.href}>
          {site.contact.label}
        </a>
      </div>
    </header>
  );
}

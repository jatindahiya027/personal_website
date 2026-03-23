"use client";
import { PERSONAL, SOCIALS } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-name">{PERSONAL.name}</div>
      <div className="footer-links">
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href}
            target="_blank" rel="noopener noreferrer"
            className="footer-link">
            <img src={s.icon} alt={s.label} width={18} height={18} />
            {s.label}
          </a>
        ))}
      </div>
      <div className="footer-copy">© {year} {PERSONAL.name}</div>
    </footer>
  );
}

"use client";
import { useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { FadeUp } from "./animations";
import { TypeOnce } from "./TypeWriter";
import { SKILLS } from "../data/portfolio";

function SkillCard({ src, label, delay = 0, size = 54 }) {
  const wrapRef  = useRef(null);
  const cardRef  = useRef(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-40px" });

  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    cardRef.current.style.transform = `perspective(480px) rotateX(${-y*13}deg) rotateY(${x*13}deg) scale(1.08)`;
    cardRef.current.style.boxShadow = "0 18px 40px rgba(0,0,0,0.13)";
  }, []);

  const onLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    cardRef.current.style.boxShadow = "";
  }, []);

  return (
    <div ref={wrapRef} style={{
      opacity:   isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
    }}>
      <div ref={cardRef} className="cont"
        style={{ transition: "transform 0.1s ease, box-shadow 0.22s" }}
        onMouseMove={onMove} onMouseLeave={onLeave}>
        <img src={src} alt={label} width={size} height={size}
          style={{ objectFit: "contain", pointerEvents: "none" }} />
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function SkillsSection({ sectionRef, isMobile }) {
  return (
    <div ref={sectionRef} className="Skills">
      <FadeUp>
        <div className="section-label">Expertise</div>
        <h1 className="h1heading"><TypeOnce text="Skills" speed={80} /></h1>
      </FadeUp>
      <div className="skillsimg">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.label} src={s.src} label={s.label}
            delay={i * 0.045} size={isMobile ? 30 : 52} />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { TypeCycle } from "./TypeWriter";
import { PERSONAL, HERO_ROLES, EXPERIENCE, SKILLS } from "../data/portfolio";

/** Counts from 0 to target when the element enters the viewport. */
function CountUp({ target, suffix = "" }) {
  const ref          = useRef(null);
  const isInView     = useInView(ref, { once: true, margin: "-10px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target == null) return;
    if (reduceMotion) { setCount(target); return; }
    const duration = 900;
    let startTime;
    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);  // ease-out-cubic
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, reduceMotion]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection({ isMobile, isTab, scrollTo }) {
  const canvasRef    = useRef(null);
  const mouseRef     = useRef({ x: -999, y: -999 });
  const rafRef       = useRef(null);
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Calculate years of experience client-side only (avoid SSR mismatch)
  const [yearsExp, setYearsExp] = useState(null);
  useEffect(() => {
    // Count from TCS (first entry) join date only
    const MONTH_MAP = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
    const [mon, yr] = EXPERIENCE[0].period.split('–')[0].trim().split(' ');
    const joined = new Date(parseInt(yr), MONTH_MAP[mon] ?? 0);
    const now = new Date();
    const yrs = now.getFullYear() - joined.getFullYear()
      - (now.getMonth() < joined.getMonth() ? 1 : 0);
    setYearsExp(Math.max(yrs, 1));
  }, []);

  const { scrollY } = useScroll();
  const heroImgY   = useTransform(scrollY, (v) =>
    typeof window === "undefined" || window.innerWidth <= 768 ? 0 : -v * 0.22
  );
  const heroRingsY = useTransform(scrollY, (v) =>
    typeof window === "undefined" || window.innerWidth <= 768 ? 0 : -v * 0.10
  );

  // Interactive dot-grid — brightens toward mouse position
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (reduceMotion) return;
    const ctx    = canvas.getContext("2d");
    const SP = isMobile ? 32 : 40;
    const DR = 1.3;
    const RC = isMobile ? 80 : 120;

    let dots = [];
    const build = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width  / SP) + 1;
      const rows = Math.ceil(canvas.height / SP) + 1;
      dots = Array.from({ length: rows * cols }, (_, i) => ({
        x: (i % cols) * SP,
        y: Math.floor(i / cols) * SP,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      for (const d of dots) {
        const dist = Math.sqrt((d.x - mx) ** 2 + (d.y - my) ** 2);
        const t    = Math.max(0, 1 - dist / RC);
        ctx.beginPath();
        ctx.arc(d.x, d.y, DR + t * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,25,22,${0.08 + t * 0.5})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    build();
    draw();

    const parent = canvas.parentElement;
    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    parent.addEventListener("mousemove",  onMove,  { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove",  onMove);
      parent.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, [isMobile]);

  const src = isMobile || isTab ? PERSONAL.heroImageMobile : PERSONAL.heroImageDesktop;
  const eyebrow = EXPERIENCE[0]
    ? `${EXPERIENCE[0].title} · ${EXPERIENCE[0].company}`
    : "Software Engineer";
  const [firstName, ...rest] = PERSONAL.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div ref={containerRef} id="main-content" className="landing">

      {/* ── Full-width dot-grid canvas ── */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* ── Left content column ── */}
      <div className="hero-left">
        <motion.div className="hero-eyebrow"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
          {eyebrow}
        </motion.div>

        <motion.h1 className="hero-name"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}>
          {firstName}<br /><em>{lastName}.</em>
        </motion.h1>

        <motion.div className="hero-tagline"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22,1,0.36,1] }}>
          <span style={{ display: "block" }}>{PERSONAL.tagline} Engineer</span>
          <strong>
            <TypeCycle phrases={HERO_ROLES} startDelay={0.8} />
          </strong>
        </motion.div>

        <motion.div className="hero-ctas"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22,1,0.36,1] }}>
          <button className="hero-cta-primary" onClick={() => scrollTo?.("projects")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,8 16,12 12,16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            View Work
          </button>
          <button className="hero-cta-secondary" onClick={() => scrollTo?.("contact")}>
            Get in touch
          </button>
        </motion.div>

        <motion.div className="hero-badge"
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.22,1,0.36,1] }}>
          <span className="hero-badge-dot" />
          Available for work
        </motion.div>

        {/* Stats strip — mobile only */}
        {isMobile && (
          <motion.div className="hero-stats"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.22,1,0.36,1] }}>
            <div className="hero-stat">
              <span className="hero-stat-num">
                {yearsExp !== null ? <CountUp target={yearsExp} suffix="+" /> : "—"}
              </span>
              <span className="hero-stat-label">Years Exp</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">
                <CountUp target={SKILLS.length} suffix="+" />
              </span>
              <span className="hero-stat-label">Technologies</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Decorative rings — mobile background ── */}
      {isMobile && (
        <div className="hero-mobile-rings" aria-hidden="true">
          <motion.svg viewBox="0 0 820 820" fill="none">
            <motion.circle cx="410" cy="410" r="390"
              stroke="rgba(26,25,22,0.06)" strokeWidth="1" strokeDasharray="12 18"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }} />
            <motion.circle cx="410" cy="410" r="300"
              stroke="rgba(26,25,22,0.08)" strokeWidth="1" strokeDasharray="6 20"
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }} />
            <circle cx="410" cy="410" r="210" stroke="rgba(26,25,22,0.06)" strokeWidth="1" />
            <motion.g
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }}>
              <circle cx="410" cy="20" r="6" fill="rgba(200,184,154,0.9)" />
            </motion.g>
          </motion.svg>
        </div>
      )}

      {/* ── Right photo column — desktop/tablet only ── */}
      {!isMobile && (
        <div className="hero-right">
          <motion.svg className="hero-rings" viewBox="0 0 820 820" fill="none" aria-hidden="true"
            style={{ y: heroRingsY }}>
            <motion.circle cx="410" cy="410" r="390"
              stroke="rgba(26,25,22,0.055)" strokeWidth="1" strokeDasharray="12 18"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }} />
            <motion.circle cx="410" cy="410" r="300"
              stroke="rgba(26,25,22,0.07)" strokeWidth="1" strokeDasharray="6 20"
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }} />
            <circle cx="410" cy="410" r="210" stroke="rgba(26,25,22,0.055)" strokeWidth="1" />
            <motion.g
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }}>
              <circle cx="410" cy="20" r="5" fill="rgba(200,184,154,0.9)" />
            </motion.g>
            <motion.g
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ originX: "410px", originY: "410px" }}>
              <circle cx="410" cy="110" r="4" fill="rgba(26,25,22,0.2)" />
            </motion.g>
          </motion.svg>

          <div className="landing-grain" />

          <motion.img src={src} alt={PERSONAL.name} className="hero-img"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            style={{ y: heroImgY }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }} />
        </div>
      )}
    </div>
  );
}

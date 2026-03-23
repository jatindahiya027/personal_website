"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import InfiniteTextRotation from "../scrolltrigger";
import { TypeCycle } from "./TypeWriter";
import { PERSONAL, HERO_ROLES } from "../data/portfolio";

export default function HeroSection({ isMobile, isTab }) {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const rafRef    = useRef(null);

  // Interactive dot-grid — brightens toward mouse position
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    const SP = isMobile ? 36 : 44; // spacing
    const DR = 1.4;                 // base dot radius
    const RC = isMobile ? 90 : 130; // reach radius

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
        ctx.fillStyle = `rgba(26,25,22,${0.1 + t * 0.55})`;
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

  return (
    <div className="landing">
      {/* Dot-grid canvas */}
      <canvas ref={canvasRef} className="hero-canvas" style={{ width: "100%", height: "100%" }} />

      {/* Decorative orbiting rings */}
      <svg className="hero-rings" viewBox="0 0 820 820" fill="none" aria-hidden="true">
        <motion.circle cx="410" cy="410" r="390"
          stroke="rgba(26,25,22,0.055)" strokeWidth="1" strokeDasharray="12 18"
          animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ originX: "410px", originY: "410px" }} />
        <motion.circle cx="410" cy="410" r="300"
          stroke="rgba(26,25,22,0.07)" strokeWidth="1" strokeDasharray="6 20"
          animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "410px", originY: "410px" }} />
        <circle cx="410" cy="410" r="210" stroke="rgba(26,25,22,0.055)" strokeWidth="1" />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ originX: "410px", originY: "410px" }}>
          <circle cx="410" cy="20" r="5" fill="rgba(200,184,154,0.9)" />
        </motion.g>
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "410px", originY: "410px" }}>
          <circle cx="410" cy="110" r="4" fill="rgba(26,25,22,0.2)" />
        </motion.g>
      </svg>

      <div className="landing-grain" />

      {/* Person photo */}
      <motion.img src={src} alt={PERSONAL.name} className="hero-img"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }} />

      <InfiniteTextRotation />

      {/* "Available for work" badge */}
      <motion.div className="hero-badge"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.22,1,0.36,1] }}>
        <span className="hero-badge-dot" />
        Available for work
      </motion.div>

      {/* Bottom bar — title + location */}
      <div className="hero-bottom-bar">
        <motion.div className="job"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22,1,0.36,1] }}>
          <span style={{ color: "var(--ink2)", fontStyle: "italic" }}>{PERSONAL.tagline}</span>
          <strong style={{ display: "block", fontStyle: "normal", color: "var(--ink)", minHeight: "1.25em" }}>
            <TypeCycle phrases={HERO_ROLES} startDelay={0.8} />
          </strong>
        </motion.div>

        <motion.div className="globe globepill"
          initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.22,1,0.36,1] }}>
          <motion.img src="/global.webp" alt="Globe"
            style={{ width: 26, height: 26 }}
            whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} />
          <p>Based in<br />{PERSONAL.location}</p>
        </motion.div>
      </div>

      {/* Scroll cue — desktop only */}
      {!isMobile && (
        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      )}
    </div>
  );
}

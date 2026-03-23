"use client";
import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Custom cursor — rendered only on pointer-fine (non-touch) devices.
 * Sharp dot tracks exactly; lagging ring follows with spring physics.
 * Ring enlarges + tints when hovering interactive elements.
 * Dot shrinks + pulses on click.
 */
export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX  = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.4 });
  const trailY  = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.4 });

  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden,   setHidden]   = useState(true);

  useEffect(() => {
    const INTERACTIVE = "a,button,[class*='navbar-button'],[class*='proj-card'],[class*='cont'],[class*='github-link'],[class*='techstack'] p";

    const onMove  = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); setHidden(false); };
    const onDown  = ()  => setClicked(true);
    const onUp    = ()  => setClicked(false);
    const onEnter = ()  => setHidden(false);
    const onLeave = ()  => setHidden(true);
    const onOver  = (e) => setHovering(!!e.target.closest(INTERACTIVE));

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover",  onOver,  { passive: true });

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover",  onOver);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const base = { position: "fixed", top: 0, left: 0, pointerEvents: "none" };

  return (
    <>
      {/* Lagging ring */}
      <motion.div style={{
        ...base, zIndex: 99998,
        x: trailX, y: trailY,
        translateX: "-50%", translateY: "-50%",
        width:  hovering ? 52 : 36,
        height: hovering ? 52 : 36,
        borderRadius: "50%",
        border:     `1.5px solid rgba(26,25,22,${hovering ? 0.5 : 0.28})`,
        background: hovering ? "rgba(200,184,154,0.18)" : "transparent",
        opacity:    hidden ? 0 : 1,
        transition: "width 0.25s ease, height 0.25s ease, border-color 0.2s, background 0.2s, opacity 0.2s",
        mixBlendMode: "multiply",
      }} />
      {/* Sharp dot */}
      <motion.div style={{
        ...base, zIndex: 99999,
        x: cursorX, y: cursorY,
        translateX: "-50%", translateY: "-50%",
        width:      clicked ? 5 : 7,
        height:     clicked ? 5 : 7,
        borderRadius: "50%",
        background: hovering ? "rgba(200,184,154,1)" : "rgba(26,25,22,0.9)",
        opacity:    hidden ? 0 : 1,
        boxShadow:  clicked ? "0 0 0 6px rgba(26,25,22,0.12)" : "none",
        transition: "width 0.12s ease, height 0.12s ease, background 0.18s, opacity 0.18s, box-shadow 0.15s",
      }} />
    </>
  );
}

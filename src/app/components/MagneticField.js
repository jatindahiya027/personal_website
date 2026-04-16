"use client";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * MagneticField — global magnetic cursor effect.
 *
 * Each registered element is attracted toward the cursor when
 * the cursor enters its radius. The attraction falls off linearly
 * with distance and decays exponentially (via RAF) on cursor exit —
 * no CSS transition conflicts with existing hover transforms.
 *
 * Uses the CSS `translate` property (separate from `transform`) so
 * the magnetic offset composes cleanly with hover CSS transforms.
 */

const TARGETS = [
  { sel: ".hero-cta-primary",   radius: 130, strength: 0.30 },
  { sel: ".hero-cta-secondary", radius: 120, strength: 0.26 },
  { sel: ".nav-resume-btn",     radius: 120, strength: 0.30 },
  { sel: ".proj-card",          radius: 140, strength: 0.16 },
  { sel: ".github-link",        radius: 100, strength: 0.26 },
  { sel: ".cf-submit",          radius: 120, strength: 0.30 },
  { sel: ".footer-link",        radius: 90,  strength: 0.24 },
];

// Exponential decay per frame when cursor leaves radius.
// 0.80 at 60fps ≈ 230ms to reach ~5% of original displacement.
const DECAY = 0.80;

export default function MagneticField() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip on touch devices and reduced-motion
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId;

    // Cached target objects — { el, radius, strength, x, y }
    let entries = [];

    const buildEntries = () => {
      entries = TARGETS.flatMap(({ sel, radius, strength }) =>
        Array.from(document.querySelectorAll(sel)).map((el) => ({
          el,
          radius,
          strength,
          x: 0,
          y: 0,
        }))
      );
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      for (const t of entries) {
        const rect = t.el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = mouseX - cx;
        const dy   = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < t.radius && mouseX !== -9999) {
          // Linear pull proportional to closeness
          const pull = (1 - dist / t.radius) * t.strength;
          t.x = dx * pull;
          t.y = dy * pull;
        } else {
          // Exponential snap-back — no CSS transition needed
          t.x *= DECAY;
          t.y *= DECAY;
          if (Math.abs(t.x) < 0.04) t.x = 0;
          if (Math.abs(t.y) < 0.04) t.y = 0;
        }

        t.el.style.setProperty("--mag-x", `${t.x}px`);
        t.el.style.setProperty("--mag-y", `${t.y}px`);
      }

      rafId = requestAnimationFrame(tick);
    };

    // Small delay to let React finish hydrating DOM
    const initId = setTimeout(() => {
      buildEntries();
      window.addEventListener("mousemove", onMove, { passive: true });
      rafId = requestAnimationFrame(tick);
    }, 350);

    return () => {
      clearTimeout(initId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      // Reset all elements to natural position
      for (const t of entries) {
        t.el.style.removeProperty("--mag-x");
        t.el.style.removeProperty("--mag-y");
      }
    };
  }, [reduceMotion]);

  return null;
}

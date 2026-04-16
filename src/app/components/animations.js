"use client";
import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Fades + slides up when scrolled into view. Respects prefers-reduced-motion. */
export function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const ref          = useRef(null);
  const isInView     = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  return (
    <div ref={ref} className={className} style={{
      opacity:    isInView ? 1 : 0,
      transform:  (isInView || reduceMotion) ? "translateY(0)" : "translateY(22px)",
      transition: reduceMotion
        ? `opacity 0.01ms ${delay}s`
        : `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s,
           transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/** Fades + slides in from the right when scrolled into view. Respects prefers-reduced-motion. */
export function FadeRight({ children, delay = 0 }) {
  const ref          = useRef(null);
  const isInView     = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  return (
    <div ref={ref} style={{
      opacity:    isInView ? 1 : 0,
      transform:  (isInView || reduceMotion) ? "translateX(0)" : "translateX(26px)",
      transition: reduceMotion
        ? `opacity 0.01ms ${delay}s`
        : `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s,
           transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

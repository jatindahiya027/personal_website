"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps children in a motion div that translates on scroll.
 * Uses window-scroll + live getBoundingClientRect so the offset
 * is always relative to the element's current viewport position —
 * no conflict with entrance animations on children.
 *
 * speed  – fraction of viewport-center distance to translate (0.1 = subtle, 0.3 = strong)
 * invert – when true the element moves opposite direction (appears to rise)
 */
export default function ParallaxEl({
  children,
  speed = 0.15,
  invert = false,
  className,
  style,
}) {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, (latest) => {
    if (typeof window === "undefined" || !ref.current) return 0;
    const vw = window.innerWidth;
    const effectiveSpeed =
      vw <= 768  ? 0 :
      vw <= 1024 ? speed * 0.35 :
      speed;
    if (effectiveSpeed === 0) return 0;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    return (invert ? center : -center) * effectiveSpeed;
  });

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

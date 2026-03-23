"use client";
import Leftflex from "./leftflex";
import { motion, useScroll, useSpring } from "framer-motion";
import { StrictMode } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01,
  });
  return (
    <StrictMode>
      <motion.div initial={false} className="progress-bar" style={{ scaleX }} />
      <Leftflex />
    </StrictMode>
  );
}

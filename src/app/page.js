"use client";
import Rightflex from "./rightflex.js";
import Leftflex from "./leftflex";
import { motion, useScroll, useSpring } from "framer-motion";
import { LoremIpsum } from "./loreipsum";
import { StrictMode } from "react";
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01
  });
  return (
    <StrictMode>
      <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
      <motion.div initial={false} className="progress-bar" style={{ scaleX }} />
        {/* <Rightflex /> */}

        <Leftflex />
        {/* <LoremIpsum/>
        <LoremIpsum/> */}
        </StrictMode>
      
    
  );
}

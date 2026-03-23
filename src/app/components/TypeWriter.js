"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CURSOR = (
  <span style={{
    display: "inline-block", width: "2px", height: "0.85em",
    background: "currentColor", marginLeft: "2px",
    verticalAlign: "text-bottom",
    animation: "blink-cursor 0.9s step-end infinite",
  }} />
);

/**
 * Types text once when it enters the viewport.
 * Pass immediate=true to start on mount (e.g. navbar).
 */
export function TypeOnce({ text, className = "", startDelay = 0, speed = 48, immediate = false }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [display, setDisplay] = useState("");
  const [done,    setDone]    = useState(false);
  const started   = useRef(false);

  const shouldStart = immediate || isInView;

  useEffect(() => {
    if (!shouldStart || started.current) return;
    started.current = true;
    let i = 0;
    const tick = () => {
      i++;
      setDisplay(text.slice(0, i));
      if (i < text.length) setTimeout(tick, speed);
      else setDone(true);
    };
    const id = setTimeout(tick, startDelay * 1000);
    return () => clearTimeout(id);
  }, [shouldStart, text, startDelay, speed]);

  return (
    <span ref={ref} className={className}>
      {display}
      {!done && CURSOR}
    </span>
  );
}

/**
 * Cycles through an array of phrases with type → pause → delete loop.
 */
export function TypeCycle({ phrases, startDelay = 0 }) {
  const [phase,   setPhase]   = useState("typing");
  const [display, setDisplay] = useState("");
  const [idx,     setIdx]     = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    const current = phrases[idx % phrases.length];

    if (phase === "typing") {
      if (display.length < current.length) {
        const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 55);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), 1800);
      return () => clearTimeout(t);
    }
    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 600);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
        return () => clearTimeout(t);
      }
      setIdx(i => i + 1);
      setPhase("typing");
    }
  }, [started, phase, display, idx, phrases]);

  return (
    <span>
      {display}
      <span style={{
        display: "inline-block", width: "2px", height: "1em",
        background: "currentColor", marginLeft: "2px",
        verticalAlign: "text-bottom",
        animation: "blink-cursor 0.9s step-end infinite",
      }} />
    </span>
  );
}

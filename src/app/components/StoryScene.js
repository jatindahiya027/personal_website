"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./MotionProvider";

/** Two actual sections share one viewport. Scroll opens a full-height mask. */
export default function StoryScene({
  children,
  next,
  className = "",
  nextLabel,
  desktopOnly = false,
}) {
  const ref = useRef(null);
  const { paused, reduced, introDone } = useMotionPreference();
  useEffect(() => {
    const section = ref.current;
    const face = section.querySelector(".story-face");
    const front = section.querySelector(".story-front");
    let frame = 0;
    let visible = true;
    let enhanced = false;
    const quiet =
      paused ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    function draw() {
      frame = 0;
      const supportsScrollMask = innerWidth >= 800 && innerHeight >= 700;
      let enabled =
        !quiet && supportsScrollMask && (!desktopOnly || supportsScrollMask);
      enhanced = enabled;
      section.dataset.enhanced = String(enabled);
      // Parametric biography copy must never be trapped in a fixed viewport.
      if (enabled && desktopOnly && face.scrollHeight > innerHeight + 2) {
        enabled = false;
        enhanced = false;
        section.dataset.enhanced = "false";
      }
      if (!enabled) {
        face.style.clipPath = "";
        front.style.transform = "";
        front.inert = false;
        face.inert = false;
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight)),
      );
      const reveal = Math.min(1, Math.max(0, (progress - 0.08) / 0.82));
      face.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0)`;
      front.style.transform = `translate3d(0,${-36 * reveal}px,0)`;
      front.inert = reveal > 0.96;
      face.inert = reveal < 0.96;
      section.dataset.progress = reveal.toFixed(3);
    }
    function schedule() {
      if (!frame && visible && enhanced) frame = requestAnimationFrame(draw);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "100px" },
    );
    observer.observe(section);
    const resize = () => {
      visible = true;
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", resize);
      delete section.dataset.enhanced;
      face.style.clipPath = "";
      front.style.transform = "";
      front.inert = false;
      face.inert = false;
    };
  }, [paused, reduced, introDone, desktopOnly]);
  return (
    <section
      ref={ref}
      className={`story-scene ${className}`}
      aria-label={nextLabel}
    >
      <div className="story-sticky">
        <div className="story-front">{children}</div>
        <div className="story-face">{next}</div>
      </div>
    </section>
  );
}

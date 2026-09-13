"use client";
import { useEffect, useRef } from "react";
import { SECTIONS } from "../data/portfolio";
import { useMotionPreference } from "./MotionProvider";

export default function ScrollChoreography({ sectionItems = SECTIONS }) {
  const { paused, reduced, activeSection, setActiveSection } =
    useMotionPreference();
  const progressRef = useRef(null);
  const indicator = useRef(null);
  useEffect(() => {
    const quiet =
      paused ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [...document.querySelectorAll("[data-image-reveal]")];
    const sections = [
      ...document.querySelectorAll("main section[id], main article[id]"),
    ];
    const visible = new Set();
    const focused = new Set();
    const frames = [...document.querySelectorAll("[data-project-frame]")];
    let hasScrolled = scrollY > 0;
    let frame = 0,
      current = "";
    function render() {
      frame = 0;
      const height = innerHeight;
      const scroll = scrollY;
      const total = document.documentElement.scrollHeight - height;
      const frameRects = frames.map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      const measured = [...visible].map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      let next = "top";
      for (const section of sections)
        if (section.getBoundingClientRect().top < height * 0.45)
          next = section.id;
      if (scroll + height >= document.documentElement.scrollHeight - 20)
        next = "contact";
      if (next !== current) {
        current = next;
        setActiveSection(next);
      }
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${total > 0 ? scroll / total : 0})`;
      if (indicator.current)
        indicator.current.dataset.visible = String(scroll > height * 0.7);
      // Scroll owns the reveal: start at viewport entry and finish when
      // the top of the image board reaches the middle of the screen.
      for (const { element, rect } of frameRects) {
        const entry = quiet
          ? 0
          : Math.max(
              0,
              Math.min(
                100,
                ((rect.top - height * 0.65) / (height * 0.35)) * 100,
              ),
            );
        const exit = quiet
          ? 0
          : Math.max(
              0,
              Math.min(100, ((80 - rect.top) / (height * 0.55)) * 100),
            );
        element.style.clipPath = `inset(${exit}% 0 ${entry}% 0)`;
      }
      for (const { element, rect } of measured) {
        const p =
          quiet || focused.has(element)
            ? 1
            : Math.min(
                1,
                Math.max(
                  0,
                  hasScrolled ? (height - rect.top) / (height * 0.5) : 0,
                ),
              );
        element.style.clipPath =
          p === 1 ? "none" : `inset(0 ${(1 - p) * 100}% 0 0)`;
        element.dataset.reveal = p.toFixed(3);
      }
    }
    const onScroll = () => {
      hasScrolled = true;
      schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onFocus = (event) => {
      const target = event.target.closest("[data-image-reveal]");
      if (target) {
        focused.add(target);
        schedule();
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? visible.add(entry.target)
            : visible.delete(entry.target),
        );
        schedule();
      },
      { rootMargin: "100px" },
    );
    targets.forEach((target) => observer.observe(target));
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", schedule);
    document.addEventListener("focusin", onFocus);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", schedule);
      document.removeEventListener("focusin", onFocus);
      frames.forEach((element) => {
        element.style.clipPath = "";
      });
      targets.forEach((target) => {
        target.style.clipPath = "";
      });
    };
  }, [paused, reduced, setActiveSection]);
  const currentProject = activeSection.startsWith("work-");
  const label =
    sectionItems.find((item) => item.id === activeSection)?.indicatorLabel ||
    sectionItems.find((item) => item.id === activeSection)?.label ||
    (currentProject
      ? "Selected work"
      : activeSection === "writing"
        ? "Writing"
        : "Introduction");
  return (
    <div ref={indicator} className="section-indicator" data-visible="false">
      <span>{label}</span>
      <div className="section-indicator-track">
        <i ref={progressRef} />
      </div>
      <a href="#top" aria-label="Back to top">
        ↑
      </a>
    </div>
  );
}

export function ScrollText({ text, as: Tag = "p", className = "" }) {
  return (
    <Tag className={className}>
      {text
        .split(/(\*\*.*?\*\*)/g)
        .map((part, index) =>
          part.startsWith("**") ? (
            <strong key={index}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
    </Tag>
  );
}

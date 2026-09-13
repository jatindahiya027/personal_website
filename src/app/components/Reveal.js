"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "./MotionProvider";

/** Native content stays visible by default; entrances enhance individual reading groups. */
export default function Reveal({
  children,
  className = "",
  kind = "rise",
  delay = 0,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const { paused, reduced, introDone } = useMotionPreference();
  useEffect(() => {
    if (
      paused ||
      reduced ||
      !introDone ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let animation;
    const element = ref.current;
    element.dataset.entrance = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.entrance = "visible";
        animation = element.animate(
          kind === "mask"
            ? [
                { clipPath: "inset(100% 0 0 0)" },
                { clipPath: "inset(0% 0 0 0)" },
              ]
            : [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
          {
            duration: kind === "mask" ? 1600 : 1100,
            delay,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            fill: "backwards",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      animation?.cancel();
      delete element.dataset.entrance;
    };
  }, [paused, reduced, introDone, kind, delay]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Whole lines are uncovered in place. Letters never roll, rotate, or change opacity individually. */
export function MaskText({
  children,
  as: Tag = "span",
  className = "",
  delay = 0,
}) {
  const { introDone } = useMotionPreference();
  return (
    <Tag className={`text-mask ${className}`} data-ready={introDone}>
      <span style={{ animationDelay: `${delay}ms` }}>{children}</span>
    </Tag>
  );
}

export function WordReveal({ text, as: Tag = "h2", className = "" }) {
  return (
    <Reveal as={Tag} kind="mask" className={`line-heading ${className}`}>
      {text.split("\n").map((line, index) => (
        <span className="heading-line" key={index}>
          {line}
        </span>
      ))}
    </Reveal>
  );
}

/** Short reading groups arrive word by word, without layout shifts or a typing cursor. */
export function TextReveal({ text, as: Tag = "p", className = "", delay = 0 }) {
  const ref = useRef(null);
  const { paused, reduced, introDone } = useMotionPreference();
  useEffect(() => {
    if (paused || reduced || !introDone) return;
    const animations = [];
    const element = ref.current;
    element.dataset.wordsPending = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
        element.dataset.wordsPending = "false";
        const words = [...ref.current.querySelectorAll(".animated-word")];
        const stagger = Math.min(65, 1400 / Math.max(1, words.length));
        words.forEach((word, index) =>
          animations.push(
            word.animate(
              [
                { opacity: 0, transform: "translateY(10px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 1100,
                delay: delay + index * stagger,
                easing: "cubic-bezier(0.23, 1, 0.32, 1)",
                fill: "backwards",
              },
            ),
          ),
        );
        ref.current.dataset.revealed = "true";
        observer.disconnect();
      },
      { threshold: 0.45, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      delete element.dataset.wordsPending;
    };
  }, [paused, reduced, introDone, delay]);
  return (
    <Tag ref={ref} className={`animated-copy ${className}`}>
      <span className="sr-only">{text.replace(/\*\*/g, "")}</span>
      <span aria-hidden="true">
        {text.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
          const strong = part.startsWith("**");
          const content = (strong ? part.slice(2, -2) : part)
            .split(/(\s+)/)
            .map((word, index) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span className="animated-word" key={index}>
                  {word}
                </span>
              ),
            );
          return strong ? (
            <strong key={partIndex}>{content}</strong>
          ) : (
            <span key={partIndex}>{content}</span>
          );
        })}
      </span>
    </Tag>
  );
}

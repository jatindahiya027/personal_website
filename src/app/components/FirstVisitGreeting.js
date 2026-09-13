"use client";
import { useEffect, useRef } from "react";
import { PERSONAL, COPY } from "../data/portfolio";
import { useMotionPreference } from "./MotionProvider";
import Icon from "./Icons";

export default function FirstVisitGreeting() {
  const dialog = useRef(null);
  const dismiss = useRef(() => {});
  const { setIntroDone } = useMotionPreference();
  useEffect(() => {
    const root = document.documentElement;
    const element = dialog.current;
    if (root.dataset.intro !== "pending") {
      setIntroDone(true);
      return;
    }
    let disposed = false,
      exiting = false,
      frame = 0,
      elapsed = 0,
      last = 0;
    let animation;
    const animations = [];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    element.dataset.phase = "reading";
    const finish = () => {
      if (disposed) return;
      element.close();
      root.dataset.intro = "done";
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem("portfolio-welcomed-v2", "yes");
      } catch {}
      // Start the hero only once the welcome has completely left the screen.
      setIntroDone(true);
    };
    const exit = (instant = false) => {
      if (exiting) return;
      exiting = true;
      cancelAnimationFrame(frame);
      if (instant || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }
      element.dataset.phase = "leaving";
      animation = element.animate(
        [{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)" }],
        {
          duration: 1400,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          fill: "forwards",
        },
      );
      animation.finished.then(finish).catch(() => {});
    };
    dismiss.current = exit;
    const tick = (now) => {
      frame = 0;
      if (disposed || exiting || document.hidden) {
        last = 0;
        return;
      }
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      if (elapsed >= 4600) {
        exit();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      last = 0;
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!exiting && !disposed && !frame)
        frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", visibility);
    Promise.resolve(document.fonts?.ready).then(() => {
      if (disposed || exiting) return;
      element.querySelectorAll(".greeting-line").forEach((line, index) =>
        animations.push(
          line.animate(
            [
              { opacity: 0.2, clipPath: "inset(100% 0 0 0)" },
              { opacity: 1, clipPath: "inset(0% 0 0 0)" },
            ],
            {
              duration: 1400,
              delay: index * 180,
              easing: "cubic-bezier(0.77, 0, 0.175, 1)",
              fill: "backwards",
            },
          ),
        ),
      );
      visibility();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      animation?.cancel();
      animations.forEach((item) => item.cancel());
      document.removeEventListener("visibilitychange", visibility);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [setIntroDone]);
  return (
    <dialog
      ref={dialog}
      className="greeting"
      aria-label={`Welcome to ${PERSONAL.name}’s portfolio`}
      onCancel={(event) => {
        event.preventDefault();
        dismiss.current(true);
      }}
    >
      <span className="greeting-name">{PERSONAL.name}</span>
      <div className="greeting-message">
        <span className="greeting-line">{COPY.greeting}</span>
        <span className="greeting-line">
          I’m {PERSONAL.name.split(" ")[0]}.
        </span>
        <p>{COPY.greetingNote}</p>
      </div>
      <button
        className="button button-light greeting-enter"
        onClick={(event) => dismiss.current(event.detail === 0)}
        autoFocus
      >
        Enter portfolio <Icon name="arrow-right" size={18} />
      </button>
    </dialog>
  );
}

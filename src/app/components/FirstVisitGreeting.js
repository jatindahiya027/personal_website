"use client";

import { useEffect, useRef } from "react";
import { PERSONAL, COPY } from "../data/portfolio";
import Icon from "./Icons";

/**
 * The matching data-intro attribute is set by an inline head script before the
 * first paint. That lets this server-rendered curtain start above the hero
 * instead of appearing late after hydration.
 */
export default function FirstVisitGreeting() {
  const curtain = useRef(null);
  const enter = useRef(null);
  const exit = useRef(() => {});

  useEffect(() => {
    const root = document.documentElement;
    const element = curtain.current;
    if (root.dataset.intro !== "pending") return;

    const page = document.getElementById("top");
    const previousOverflow = document.body.style.overflow;
    let finishTimer = 0;
    let exiting = false;

    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    enter.current?.focus({ preventScroll: true });

    const finish = () => {
      root.dataset.intro = "done";
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      try {
        sessionStorage.setItem("portfolio-welcomed-v3", "yes");
      } catch {}
    };

    const leave = (instant = false) => {
      if (exiting) return;
      exiting = true;
      clearTimeout(autoTimer);
      if (instant || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }
      element.dataset.phase = "leaving";
      finishTimer = window.setTimeout(finish, 680);
    };

    exit.current = leave;
    const autoTimer = window.setTimeout(leave, 1750);
    const onKeyDown = (event) => {
      if (event.key === "Escape") leave(true);
    };
    addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(autoTimer);
      clearTimeout(finishTimer);
      removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
    };
  }, []);

  return (
    <section
      ref={curtain}
      className="greeting"
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome to ${PERSONAL.name}’s portfolio`}
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
        ref={enter}
        className="button button-light greeting-enter"
        onClick={(event) => exit.current(event.detail === 0)}
      >
        Enter portfolio <Icon name="arrow-right" size={18} />
      </button>
    </section>
  );
}

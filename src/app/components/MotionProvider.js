"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
  navigate: () => {},
});
export const useMotionPreference = () => useContext(MotionContext);

export default function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const pathname = usePathname();
  const router = useRouter();
  const completion = useRef(null);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    try {
      setPaused(localStorage.getItem("portfolio-motion") === "paused");
    } catch {}
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion =
      paused || reduced ? "quiet" : "full";
  }, [paused, reduced]);

  useEffect(() => {
    completion.current?.();
    completion.current = null;
  }, [pathname]);

  useEffect(() => {
    if (!introDone || !location.hash) return;
    // Sticky chapters establish their height during mount. Resolve deep links
    // after that layout settles so the destination clears the floating header.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        try {
          document
            .getElementById(decodeURIComponent(location.hash.slice(1)))
            ?.scrollIntoView({ block: "start", behavior: "instant" });
        } catch {}
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, introDone]);

  function toggle() {
    setPaused((value) => {
      try {
        localStorage.setItem("portfolio-motion", value ? "full" : "paused");
      } catch {}
      return !value;
    });
  }

  function navigate(href) {
    if (
      !document.startViewTransition ||
      reduced ||
      paused ||
      completion.current
    ) {
      router.push(href);
      return;
    }
    const transition = document.startViewTransition(
      () =>
        new Promise((resolve) => {
          const timeout = setTimeout(resolve, 1800);
          completion.current = () => {
            clearTimeout(timeout);
            resolve();
          };
          router.push(href);
        }),
    );
    transition.finished.catch(() => {});
  }

  return (
    <MotionContext.Provider
      value={{
        paused,
        reduced,
        toggle,
        navigate,
        introDone,
        setIntroDone,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function TransitionLink({ href, onClick, children, ...props }) {
  const { navigate } = useMotionPreference();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.detail === 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank"
        )
          return;
        if (
          href.split("#")[0].replace(/\/$/, "") === pathname.replace(/\/$/, "")
        )
          return;
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, getProjectImages } from "../data/portfolio";
import { useMotionPreference } from "./MotionProvider";
import Icon from "./Icons";

const slides = PROJECTS.flatMap((project) =>
  getProjectImages(project).map((image) => ({
    ...image,
    project: project.name,
  })),
);
export default function HeroCarousel() {
  const [active, setActive] = useState(0),
    [stopped, setStopped] = useState(false),
    [interacting, setInteracting] = useState(false),
    [visible, setVisible] = useState(true),
    [instant, setInstant] = useState(false);
  const ref = useRef(null);
  const { paused, reduced, introDone } = useMotionPreference();
  useEffect(() => {
    const sync = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scene = ref.current.closest(".story-scene");
      setVisible(
        rect.bottom > 0 &&
          rect.top < innerHeight &&
          Number(scene?.dataset.progress || 0) < 0.9,
      );
    };
    const observer = new IntersectionObserver(sync, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", sync);
    };
  }, []);
  useEffect(() => {
    if (
      paused ||
      reduced ||
      !introDone ||
      stopped ||
      interacting ||
      !visible ||
      slides.length < 2
    )
      return;
    let timer;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden)
        timer = setTimeout(() => {
          setInstant(false);
          setActive((i) => (i + 1) % slides.length);
        }, 6000);
    };
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [active, paused, reduced, introDone, stopped, interacting, visible]);
  if (!slides.length) return null;
  function move(direction, event) {
    setInstant(event.detail === 0);
    setActive((i) => (i + direction + slides.length) % slides.length);
  }
  return (
    <div
      ref={ref}
      className="hero-carousel"
      data-instant={instant}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false);
      }}
    >
      <div className="carousel-orbit">
        {slides.map((slide, index) => {
          let offset = (index - active + slides.length) % slides.length;
          if (offset > slides.length / 2) offset -= slides.length;
          if (Math.abs(offset) > 2) return null;
          return (
            <div
              key={`${slide.src}-${index}`}
              className="carousel-card"
              data-slot={offset}
              aria-hidden={offset !== 0}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      <div className="carousel-controls">
        <span>
          {slides[active].project}
          <small>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </small>
        </span>
        <div>
          <button
            className="icon-button"
            onClick={(e) => move(-1, e)}
            disabled={slides.length < 2}
            aria-label="Previous preview"
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <button
            className="icon-button"
            onClick={() => setStopped((v) => !v)}
            disabled={paused || reduced}
            aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={stopped}
          >
            <Icon
              name={stopped || paused || reduced ? "play" : "pause"}
              size={15}
            />
          </button>
          <button
            className="icon-button"
            onClick={(e) => move(1, e)}
            disabled={slides.length < 2}
            aria-label="Next preview"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

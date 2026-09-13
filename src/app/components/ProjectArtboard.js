"use client";
import { useEffect, useId, useRef, useState } from "react";
import { getProjectImages } from "../data/portfolio";
import { useMotionPreference } from "./MotionProvider";
import Icon from "./Icons";

/** One artboard for every project. Images may be URLs or { src, alt, caption } objects. */
export default function ProjectArtboard({
  project,
  overview = false,
  priority = false,
}) {
  const images = getProjectImages(project);
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failed, setFailed] = useState({});
  const dialog = useRef(null);
  const stage = useRef(null);
  const thumbnails = useRef(null);
  const id = useId();
  const { paused, reduced } = useMotionPreference();
  const image = images[active] || images[0];

  useEffect(() => {
    if (!lightboxOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lightboxOpen]);

  function select(index, animate = true) {
    const next = (index + images.length) % images.length;
    if (next === active) return;
    setActive(next);
    if (animate && !paused && !reduced)
      stage.current?.animate(
        [
          { clipPath: "inset(0 100% 0 0)", opacity: 0.5 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1 },
        ],
        { duration: 850, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
      );
    const item = thumbnails.current?.children[next];
    if (item)
      thumbnails.current.scrollTo({
        left:
          item.offsetLeft -
          thumbnails.current.offsetLeft -
          thumbnails.current.clientWidth / 2 +
          item.clientWidth / 2,
        behavior: "instant",
      });
  }
  function open() {
    dialog.current?.showModal();
    setLightboxOpen(true);
  }
  function close() {
    dialog.current?.close();
  }
  function keys(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1, false);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1, false);
    }
  }
  function renderImage(item, extra = {}) {
    return failed[item.src] ? (
      <div className="image-unavailable">
        Image unavailable<span>{item.alt}</span>
      </div>
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        onError={() =>
          setFailed((current) => ({ ...current, [item.src]: true }))
        }
        {...extra}
      />
    );
  }
  if (!image)
    return (
      <div className="artboard artboard-empty">
        <Icon name="grid" size={32} />
        <p>Project images coming soon</p>
      </div>
    );
  return (
    <div className="artboard" onKeyDown={keys}>
      <div className="artboard-topline">
        <span>
          <span className="artboard-dot" />
          {project.name}
          <span className="artboard-divider">/</span>Interface studies
        </span>
        <button
          className="icon-button"
          onClick={open}
          aria-label={`Enlarge ${project.name} image`}
        >
          <Icon name="expand" size={17} />
        </button>
      </div>
      <button
        className="artboard-stage"
        onClick={open}
        aria-label={`Enlarge ${image.alt}`}
      >
        <div className="artboard-image" ref={stage}>
          {renderImage(image, {
            loading: priority ? "eager" : "lazy",
            fetchPriority: priority ? "high" : "auto",
            decoding: "async",
          })}
        </div>
        <span className="artboard-expand">
          <Icon name="expand" size={16} />
          Explore screen
        </span>
      </button>
      <div className="artboard-controls">
        <div
          className="artboard-thumbnails"
          ref={thumbnails}
          role="group"
          aria-label={`${project.name} screenshots`}
        >
          {images.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              aria-label={`Show ${item.alt}`}
              aria-pressed={index === active}
              onClick={(event) => select(index, event.detail !== 0)}
            >
              {renderImage(item, {
                loading: "lazy",
                decoding: "async",
                alt: "",
              })}
            </button>
          ))}
        </div>
        <div className="artboard-pagination">
          <span aria-live="polite">
            {String(active + 1).padStart(2, "0")}{" "}
            <span>/ {String(images.length).padStart(2, "0")}</span>
          </span>
          <button
            className="icon-button"
            onClick={(event) => select(active - 1, event.detail !== 0)}
            disabled={images.length < 2}
            aria-label={`Previous ${project.name} image`}
          >
            <Icon name="arrow-left" size={18} />
          </button>
          <button
            className="icon-button"
            onClick={(event) => select(active + 1, event.detail !== 0)}
            disabled={images.length < 2}
            aria-label={`Next ${project.name} image`}
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
      {image.caption && <p className="artboard-caption">{image.caption}</p>}
      {overview && (
        <>
          <button
            className="artboard-overview-toggle"
            aria-expanded={showAll}
            aria-controls={id}
            onClick={() => setShowAll(!showAll)}
          >
            <Icon name={showAll ? "close" : "grid"} size={16} />
            {showAll ? "Close overview" : `View all ${images.length} screens`}
          </button>
          <div id={id} className="artboard-overview" hidden={!showAll}>
            {images.map((item, index) => (
              <figure key={`${item.src}-${index}`}>
                <button
                  onClick={() => {
                    select(index, false);
                    open();
                  }}
                  aria-label={`Enlarge ${item.alt}`}
                >
                  {renderImage(item, { loading: "lazy", decoding: "async" })}
                </button>
                <figcaption>
                  {item.caption || `${project.name} · Screen ${index + 1}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      <dialog
        className="image-dialog"
        ref={dialog}
        onClose={() => setLightboxOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-label={`${project.name} image viewer`}
      >
        <div className="image-dialog-toolbar">
          <span>
            {project.name}{" "}
            <span>
              {active + 1} / {images.length}
            </span>
          </span>
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close image viewer"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="image-dialog-stage">
          {lightboxOpen && renderImage(image)}
        </div>
        <div className="image-dialog-controls">
          <button
            className="icon-button"
            onClick={(event) => select(active - 1, event.detail !== 0)}
            disabled={images.length < 2}
            aria-label="Previous image"
          >
            <Icon name="arrow-left" />
          </button>
          <p>{image.caption || image.alt}</p>
          <button
            className="icon-button"
            onClick={(event) => select(active + 1, event.detail !== 0)}
            disabled={images.length < 2}
            aria-label="Next image"
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </dialog>
    </div>
  );
}

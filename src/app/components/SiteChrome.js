"use client";
import { useRef, useEffect, useState } from "react";
import { PERSONAL, SECTIONS, SOCIALS, COPY } from "../data/portfolio";
import { TransitionLink, useMotionPreference } from "./MotionProvider";
import Icon from "./Icons";
import { WordReveal, TextReveal } from "./Reveal";

export function Header({ home = false }) {
  const { activeSection } = useMotionPreference();
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const resize = () => {
      if (innerWidth > 760) menu.current?.close();
    };
    addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      removeEventListener("resize", resize);
    };
  }, [open]);
  const links = (
    <>
      {SECTIONS.filter((section) => section.inNav !== false).map((section) => (
        <TransitionLink
          key={section.id}
          href={`${home ? "" : "/"}#${section.id}`}
          className="nav-link"
          onClick={() => menu.current?.close()}
          aria-current={
            home &&
            (activeSection === section.id ||
              (section.id === "work" && activeSection.startsWith("work-")))
              ? "location"
              : undefined
          }
        >
          {section.label}
        </TransitionLink>
      ))}
      <TransitionLink
        href="/blog/"
        className="nav-link"
        onClick={() => menu.current?.close()}
      >
        Writing
      </TransitionLink>
    </>
  );
  return (
    <>
      <header className="site-header">
        <TransitionLink
          href="/"
          className="identity"
          aria-label={`${PERSONAL.name}, home`}
        >
          {PERSONAL.name}
        </TransitionLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <a className="header-resume" href={PERSONAL.resume} download>
          Resume <Icon name="arrow-down" size={14} />
        </a>
        <button
          className="icon-button menu-toggle"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => {
            menu.current.showModal();
            setOpen(true);
          }}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={menu}
        className="navigation-dialog"
        aria-label="Navigation"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <span>{PERSONAL.name}</span>
          <button
            className="icon-button"
            onClick={() => menu.current.close()}
            aria-label="Close navigation"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">{links}</nav>
        <span className="mobile-menu-location">{PERSONAL.location}, India</span>
      </dialog>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {PERSONAL.name}
      </span>
      <span>{PERSONAL.location}, India</span>
      <a href="#top">
        Back to top <Icon name="arrow-up-right" size={14} />
      </a>
    </footer>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-top">
        <TextReveal as="span" text="Have something in mind?" />
      </div>
      <a className="contact-heading" href={`mailto:${PERSONAL.email}`}>
        <WordReveal text={COPY.contactHeading} as="span" />
        <Icon size={76} />
      </a>
      <div className="contact-bottom">
        <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
        <div>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export function ProjectLinks({ project }) {
  const links = [
    project.url && { href: project.url, label: "Visit project", icon: "globe" },
    project.github && {
      href: project.github,
      label: "View GitHub",
      icon: "github",
    },
    ...(project.links || []),
  ].filter(Boolean);
  return (
    <div className="project-links">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.iconSrc ? (
            <img
              className="project-link-icon"
              src={link.iconSrc}
              width={17}
              height={17}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <Icon name={link.icon || "arrow-up-right"} size={17} />
          )}
          {link.label}
          <Icon size={14} />
        </a>
      ))}
    </div>
  );
}

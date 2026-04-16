/**
 * leftflex.js — Page orchestrator
 *
 * This file only handles:
 *   • Responsive state (isMobile / isTab)
 *   • Section refs for smooth-scroll navigation
 *   • Medium-zoom initialization
 *   • Composing all sections in order
 *
 * To update content (name, projects, skills, links, etc.)
 * edit  →  src/app/data/portfolio.js
 *
 * To change a section's layout or behaviour
 * edit  →  src/app/components/<SectionName>.js
 */
"use client";

import { useRef, useEffect, useState } from "react";
import mediumZoom from "medium-zoom";

import CustomCursor                           from "./components/CustomCursor";
import MagneticField                          from "./components/MagneticField";
import Navbar                                 from "./components/Navbar";
import HeroSection                            from "./components/HeroSection";
import ProfileSection                         from "./components/ProfileSection";
import SkillsSection                          from "./components/SkillsSection";
import { ProjectsOverview, ProjectHeader, ProjectSummary } from "./components/ProjectsSection";
import ContactSection                         from "./components/ContactSection";
import Footer                                 from "./components/Footer";
import WaveDivider                            from "./components/WaveDivider";
import { PROJECTS }                           from "./data/portfolio";

const NAV_SECTION_KEYS = ["profile", "skills", "projects", "contact"];

export default function Leftflex() {
  const [isMobile,      setIsMobile]      = useState(false);
  const [isTab,         setIsTab]         = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // One ref per scrollable section.
  // Key names match NAV_ITEMS keys + project IDs from portfolio.js
  const refs = {
    profile:  useRef(null),
    skills:   useRef(null),
    projects: useRef(null),
    contact:  useRef(null),
    // project detail anchors — keyed by project id
    ...Object.fromEntries(PROJECTS.map(p => [p.id, useRef(null)])),
  };

  const scrollTo = (key) => refs[key]?.current?.scrollIntoView({ behavior: "smooth" });

  // Responsive breakpoints
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTab(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-spy — highlight the nav item for the section closest above mid-viewport
  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.5;
      let active = null;
      for (const key of NAV_SECTION_KEYS) {
        const el = refs[key]?.current;
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) active = key;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  // refs values are stable useRef() instances; eslint doesn't know that
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Medium-zoom on all .zoomable images
  useEffect(() => {
    const id = setTimeout(() => {
      const z = mediumZoom(".zoomable", { margin: 24, background: "rgba(240,237,232,0.96)" });
      return () => z.detach();
    }, 300);
    return () => clearTimeout(id);
  }, [isMobile, isTab]);

  return (
    <>
      <CustomCursor />
      <MagneticField />

      <Navbar isMobile={isMobile} scrollTo={scrollTo} activeSection={activeSection} />

      <HeroSection isMobile={isMobile} isTab={isTab} scrollTo={scrollTo} />

      <ProfileSection  sectionRef={refs.profile} />

      <WaveDivider topColor="var(--bg)" bottomColor="var(--bg2)" />
      <SkillsSection   sectionRef={refs.skills}   isMobile={isMobile} />

      <WaveDivider topColor="var(--bg2)" bottomColor="var(--bg)" flip />
      <ProjectsOverview sectionRef={refs.projects} scrollTo={scrollTo} />

      {/* Render each project header + summary from data, no manual repetition */}
      {PROJECTS.map(project => (
        <div key={project.id}>
          <ProjectHeader ref={refs[project.id]} project={project} />
          <ProjectSummary project={project} isMobile={isMobile} isTab={isTab} />
        </div>
      ))}

      <WaveDivider topColor="var(--bg)" bottomColor="var(--bg2)" flip />
      <ContactSection  sectionRef={refs.contact} />

      <Footer />
    </>
  );
}

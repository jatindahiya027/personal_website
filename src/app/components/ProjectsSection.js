"use client";
import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "./animations";
import { TypeOnce } from "./TypeWriter";
import { PROJECTS } from "../data/portfolio";

// ── Project overview grid ──────────────────────────────
export function ProjectsOverview({ sectionRef, scrollTo }) {
  return (
    <div ref={sectionRef} className="Projects">
      <FadeUp>
        <div className="section-label">Work</div>
        <h1 className="h1heading"><TypeOnce text="Projects" speed={80} /></h1>
      </FadeUp>
      <div className="projectsdiv">
        {PROJECTS.map(({ id, num, thumbnail, name, raised }, i) => (
          <FadeUp key={id} delay={i * 0.1}>
            <div className={`proj-card${raised ? " proj-card--raised" : ""}`}
              onClick={() => scrollTo(id)}>
              <span className="proj-num">{num}</span>
              <img src={thumbnail} alt={name} className="projimage" />
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

// ── Project header banner ──────────────────────────────
export const ProjectHeader = React.forwardRef(function ProjectHeader({ project }, ref) {
  const { num, name, icon } = project;
  return (
    <div ref={ref} className="Projectheading">
      <div className="projectheadingdiv">
        <motion.p className="number"
          initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}>
          {num}
        </motion.p>
        <motion.p className="name"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1], delay: 0.07 }}>
          {name}
        </motion.p>
      </div>
      <div className="projectheadingdiv2">
        <motion.img src={icon} alt={name} className="headimg"
          whileHover={{ scale: 1.06, rotate: 2 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }} />
      </div>
    </div>
  );
});

// ── Project summary ────────────────────────────────────
function ProjectImages({ images }) {
  return (
    <div className="summary-images">
      <div className="summary-col">
        {images.slice(0, 2).map((src, i) => (
          <img key={i} src={src} alt="" className="summaryimg zoomable" style={{ cursor: "zoom-in" }} />
        ))}
      </div>
      <div className="summary-col">
        {images.slice(2, 4).map((src, i) => (
          <img key={i} src={src} alt="" className="summaryimg zoomable" style={{ cursor: "zoom-in" }} />
        ))}
      </div>
    </div>
  );
}

export function ProjectSummary({ project, isMobile, isTab }) {
  const { github, stack, images, description, features } = project;
  const isNarrow = isMobile || isTab;

  return (
    <div className="aboutme proj-summary">
      <div className="section-label">Summary</div>
      <div className={isNarrow ? "summarydivmobil" : "summarydiv"}>
        {isNarrow && <ProjectImages images={images} />}

        <div>
          <div className="summary-text">
            {description}
            <h2>Features</h2>
            <ul>
              {features.map((f, i) => (
                <li key={i}><b>{f.title}</b> — {f.detail}</li>
              ))}
            </ul>
          </div>
          <div className="proj-meta">
            <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
              <img src="/github.webp" alt="GitHub" width={16} height={16} />
              View on GitHub
            </a>
            <div className="techstack">
              {stack.map(t => <p key={t}>{t}</p>)}
            </div>
          </div>
        </div>

        {!isNarrow && <ProjectImages images={images} />}
      </div>
    </div>
  );
}

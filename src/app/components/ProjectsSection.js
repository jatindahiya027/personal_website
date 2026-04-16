"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "./animations";
import ParallaxEl from "./ParallaxEl";
import { TypeOnce } from "./TypeWriter";
import { PROJECTS } from "../data/portfolio";

const featureListVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.07 } },
};
const featureItemVariants = {
  hidden:   { opacity: 0, x: -14 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

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
              <span className="proj-name">{name}</span>
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
        <ParallaxEl speed={0.22} style={{ display: "flex" }}>
          <motion.p className="number"
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}>
            {num}
          </motion.p>
        </ParallaxEl>
        <motion.p className="name"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1], delay: 0.07 }}>
          {name}
        </motion.p>
      </div>
      <div className="projectheadingdiv2">
        <ParallaxEl speed={0.14} invert>
          <motion.img src={icon} alt={name} className="headimg"
            whileHover={{ scale: 1.06, rotate: 2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} />
        </ParallaxEl>
      </div>
    </div>
  );
});

// ── Project summary ────────────────────────────────────
function ProjectImages({ images, name }) {
  return (
    <div className="summary-images">
      <div className="summary-col">
        {images.slice(0, 2).map((src, i) => (
          <img key={i} src={src} alt={`${name} screenshot ${i + 1}`} className="summaryimg zoomable" style={{ cursor: "zoom-in" }} />
        ))}
      </div>
      <div className="summary-col">
        {images.slice(2, 4).map((src, i) => (
          <img key={i} src={src} alt={`${name} screenshot ${i + 3}`} className="summaryimg zoomable" style={{ cursor: "zoom-in" }} />
        ))}
      </div>
    </div>
  );
}

export function ProjectSummary({ project, isMobile, isTab }) {
  const { name, github, stack, images, description, features } = project;
  const isNarrow     = isMobile || isTab;
  const reduceMotion = useReducedMotion();

  return (
    <div className="aboutme proj-summary">
      <div className="section-label">Summary</div>
      <div className={isNarrow ? "summarydivmobil" : "summarydiv"}>
        {isNarrow && <ProjectImages images={images} name={name} />}

        <div>
          <div className="summary-text">
            {description}
            <h2>Features</h2>
            <motion.ul
              variants={featureListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}>
              {features.map((f, i) => (
                <motion.li key={i}
                  variants={reduceMotion ? {} : featureItemVariants}>
                  <b>{f.title}</b> — {f.detail}
                </motion.li>
              ))}
            </motion.ul>
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

        {!isNarrow && <ProjectImages images={images} name={name} />}
      </div>
    </div>
  );
}

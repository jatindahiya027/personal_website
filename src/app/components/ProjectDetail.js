"use client";
import { Header, Contact, ProjectLinks } from "./SiteChrome";
import { TransitionLink } from "./MotionProvider";
import ProjectArtboard from "./ProjectArtboard";
import Reveal, { MaskText, WordReveal } from "./Reveal";
import ScrollChoreography from "./ScrollChoreography";
import Icon from "./Icons";

const DETAIL_SECTIONS = [
  { id: "project-gallery", label: "Artboard" },
  { id: "project-overview", label: "Behind the build" },
  { id: "project-features", label: "Features" },
  { id: "contact", label: "Contact" },
];

export default function ProjectDetail({ project, nextProject }) {
  return (
    <div id="top" className="project-page">
      <Header />
      <ScrollChoreography sectionItems={DETAIL_SECTIONS} />
      <main id="main-content">
        <section className="project-detail-hero section-wrap">
          <TransitionLink href="/#work" className="text-link back-link">
            <Icon name="arrow-left" size={17} />
            All projects
          </TransitionLink>
          <div className="project-detail-title">
            <div>
              <span className="project-discipline">{project.discipline}</span>
              <MaskText as="h1">{project.name}</MaskText>
            </div>
            <p>{project.statement}</p>
          </div>
          <ProjectLinks project={project} />
        </section>
        <section
          id="project-gallery"
          className="section-wrap project-detail-artboard"
          data-image-reveal
          aria-label={`${project.name} artboard`}
        >
          <ProjectArtboard project={project} overview priority />
        </section>
        <section
          id="project-overview"
          className="project-overview section-wrap split-section"
        >
          <WordReveal as="h2" text="Behind the build" />
          <div>
            <p className="project-description">{project.description}</p>
            <div className="project-stack" aria-label="Project technologies">
              {(project.stack || []).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
        {(project.features || []).length > 0 && (
          <section
            id="project-features"
            className="project-features section-wrap split-section"
          >
            <WordReveal as="h2" text="What it does" />
            <div>
              {project.features.map((feature) => (
                <Reveal className="feature-row" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.detail.trim()}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}
        {nextProject && nextProject.id !== project.id && (
          <TransitionLink
            href={`/work/${nextProject.id}/`}
            className="next-project section-wrap"
          >
            <div>
              <span>Up next</span>
              <h2>{nextProject.name}</h2>
            </div>
            <Icon size={60} />
          </TransitionLink>
        )}
        <Contact />
      </main>
    </div>
  );
}

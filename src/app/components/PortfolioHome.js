"use client";
import {
  PERSONAL,
  COPY,
  PROJECTS,
  EXPERIENCE,
  CAPABILITIES,
  EDUCATION,
  LANGUAGES,
} from "../data/portfolio";
import { getAllBlogs } from "../data/blogs";
import LandingShader from "./LandingShader";
import HeroCarousel from "./HeroCarousel";
import StoryScene from "./StoryScene";
import ProjectArtboard from "./ProjectArtboard";
import { Header, Contact, ProjectLinks } from "./SiteChrome";
import { TransitionLink } from "./MotionProvider";
import Reveal, { MaskText, WordReveal, TextReveal } from "./Reveal";
import ScrollChoreography from "./ScrollChoreography";

import Icon from "./Icons";

export default function PortfolioHome() {
  const posts = getAllBlogs().slice(0, 3);
  return (
    <div id="top">
      <Header home />
      <ScrollChoreography />
      <main id="main-content">
        <StoryScene
          className="hero-scene"
          nextLabel="Introduction to selected work"
          next={
            <div className="work-introduction tone-dark">
              <span className="eyebrow">Ideas, made real</span>
              <WordReveal as="h2" text={COPY.workHeading} />
              <TextReveal text={COPY.workIntro} />
              <div className="chapter-links">
                {PROJECTS.map((project, index) => (
                  <a key={project.id} href={`#work-${project.id}`}>
                    <span>0{index + 1}</span>
                    {project.name}
                    <Icon name="arrow-down" size={17} />
                  </a>
                ))}
              </div>
            </div>
          }
        >
          <section className="hero" aria-labelledby="hero-title">
            <LandingShader />
            <div className="hero-copy">
              <Reveal as="span" className="eyebrow" delay={150}>
                {PERSONAL.name} · {PERSONAL.role}
              </Reveal>
              <h1 id="hero-title">
                {PERSONAL.heroLines.map((line, index) => (
                  <MaskText key={line} delay={index * 260}>
                    {line}
                  </MaskText>
                ))}
              </h1>
              <Reveal delay={650}>
                <TextReveal
                  className="hero-description"
                  text={PERSONAL.heroDescription}
                  delay={350}
                />
                <div className="hero-actions">
                  <a className="button" href="#work">
                    Explore projects <Icon name="arrow-down" size={17} />
                  </a>
                  <a className="text-link" href="#about">
                    Meet me{" "}
                    <Icon name="arrow-right" size={17} />
                  </a>
                </div>
              </Reveal>
            </div>
            <HeroCarousel />
          </section>
        </StoryScene>

        <section id="work" className="work-section section-wrap">
          <div className="projects-list">
            {PROJECTS.map((project, index) => (
              <article
                id={`work-${project.id}`}
                key={project.id}
                className="work-project"
                data-project-frame
              >
                <div className="work-project-info">
                  <div>
                    <span className="project-discipline">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {project.discipline}
                    </span>
                    <WordReveal as="h3" text={project.name} />
                  </div>
                  <div className="project-summary">
                    <TextReveal text={project.statement} />
                    <div className="project-actions">
                      <TransitionLink
                        className="button"
                        href={`/work/${project.id}/`}
                      >
                        Explore {project.name}{" "}
                        <Icon name="arrow-right" size={17} />
                      </TransitionLink>
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </div>
                <div data-image-reveal>
                  <ProjectArtboard project={project} priority={index === 0} />
                </div>
              </article>
            ))}
          </div>
          {!PROJECTS.length && (
            <p className="empty-state">
              New projects are in the making. Come back soon.
            </p>
          )}
        </section>

        <section id="about" className="about-chapter">
          <StoryScene
            className="about-scene"
            desktopOnly
            nextLabel="About Jatin"
            next={
              <div className="about-section section-wrap">
                <div className="about-photo">
                  <Reveal kind="mask">
                    <div className="portrait-parallax">
                      <img
                        src={PERSONAL.heroImageDesktop || PERSONAL.photo}
                        alt={`${PERSONAL.name}, software engineer`}
                        loading="lazy"
                      />
                    </div>
                  </Reveal>
                </div>
                <div className="about-copy">
                  <span className="about-greeting">A little about me</span>
                  <WordReveal as="h2" text={COPY.aboutHeading} />
                  <TextReveal text={COPY.aboutBody} />
                  <TextReveal
                    className="secondary-copy"
                    text={`${PERSONAL.bio} ${COPY.aboutNote}`}
                    delay={250}
                  />
                  <a href={PERSONAL.resume} className="text-link" download>
                    Download resume <Icon name="arrow-down" size={18} />
                  </a>
                  <div className="about-details">
                    <span>{PERSONAL.location}, India</span>
                    <span>
                      {LANGUAGES.map((language) => language.name).join(" & ")}
                    </span>
                  </div>
                </div>
              </div>
            }
          >
            <div className="about-introduction tone-dark">
              <span className="eyebrow">Behind the work</span>
              <WordReveal as="h2" text={COPY.aboutHeading} />
              <p>{PERSONAL.location}, India</p>
            </div>
          </StoryScene>
        </section>

        <section
          id="experience"
          className="experience-section section-wrap split-section"
        >
          <WordReveal as="h2" text={COPY.experienceHeading} />
          <div className="experience-list">
            {EXPERIENCE.map((job) => (
              <Reveal
                as="article"
                kind="wipe"
                className="experience-row"
                key={`${job.company}-${job.title}`}
              >
                <div>
                  <WordReveal as="h3" text={job.company} />
                  <TextReveal text={job.title} />
                </div>
                <div>
                  <span>{job.period}</span>
                  <small>{job.location}</small>
                </div>
              </Reveal>
            ))}
            {EDUCATION.map((school) => (
              <article
                className="experience-row education-row"
                key={school.institution}
              >
                <div>
                  <span className="education-label">Education</span>
                  <WordReveal as="h3" text={school.institution} />
                  <TextReveal text={school.degree} />
                </div>
                <div>
                  <span>{school.period}</span>
                  <small>{school.location}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="capabilities"
          className="capabilities-section section-wrap split-section"
        >
          <WordReveal as="h2" text={COPY.capabilitiesHeading} />
          <div className="capability-list">
            {CAPABILITIES.map((group) => (
              <Reveal className="capability-row" kind="wipe" key={group.name}>
                <WordReveal as="h3" text={group.name} />
                <TextReveal text={group.items.join(" · ")} />
              </Reveal>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section id="writing" className="writing-section section-wrap">
            <div className="section-heading">
              <WordReveal as="h2" text={COPY.writingHeading} />
              <TransitionLink href="/blog/" className="text-link">
                All writing <Icon name="arrow-right" size={18} />
              </TransitionLink>
            </div>
            <div className="writing-list">
              {posts.map((post) => (
                <TransitionLink
                  className="writing-row"
                  href={`/blog/${post.slug}/`}
                  key={post.slug}
                >
                  <span className="writing-category">{post.tags[0]}</span>
                  <WordReveal as="h3" text={post.title} />
                  <span className="writing-read-time">{post.readTime}</span>
                  <Icon size={22} />
                </TransitionLink>
              ))}
            </div>
          </section>
        )}
        <Contact />
      </main>
    </div>
  );
}

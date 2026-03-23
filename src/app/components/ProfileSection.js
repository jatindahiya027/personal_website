"use client";
import { FadeUp, FadeRight } from "./animations";
import { TypeOnce } from "./TypeWriter";
import { PERSONAL, EDUCATION, LANGUAGES, EXPERIENCE } from "../data/portfolio";

export default function ProfileSection({ sectionRef }) {
  return (
    <div ref={sectionRef} className="aboutme">
      <FadeUp>
        <div className="section-label">About</div>
        <h1 className="h1heading"><TypeOnce text="Profile" speed={80} /></h1>
      </FadeUp>

      <div className="profile">
        {/* Photo + name + bio */}
        <FadeUp delay={0.08} className="profilediv">
          <div style={{ width: "100%" }}>
            <img src={PERSONAL.photo} alt={PERSONAL.name} className="meimage" />
            <p className="profilep2">{PERSONAL.name}</p>
            <FadeRight delay={0.18}>
              <p className="profilep">{PERSONAL.bio}</p>
            </FadeRight>
          </div>
        </FadeUp>

        {/* Info rows */}
        <div className="info">
          {/* Education */}
          <FadeRight delay={0.1}>
            <div className="info-row">
              <p className="italics">Education</p>
              <div className="info-content">
                {EDUCATION.map((e, i) => (
                  <div key={i}>
                    <div style={{ fontWeight: 500 }}>{e.institution}</div>
                    <div className="small">{e.location} · {e.period}</div>
                    <div className="small">{e.degree}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeRight>

          {/* Languages */}
          <FadeRight delay={0.17}>
            <div className="info-row">
              <p className="italics">Language</p>
              <div className="info-content">
                {LANGUAGES.map((l, i) => (
                  <span key={i}>
                    {i > 0 && <>&ensp;·&ensp;</>}
                    {l.name} <span className="small">— {l.level}</span>
                  </span>
                ))}
              </div>
            </div>
          </FadeRight>

          {/* Experience */}
          <FadeRight delay={0.24}>
            <div className="info-row">
              <p className="italics">Experience</p>
              <div className="info-content">
                {EXPERIENCE.map((e, i) => (
                  <div key={i} className="exp-entry">
                    <div className="exp-title">{e.title}</div>
                    <div className="exp-org">{e.company} · {e.location}</div>
                    <div className="exp-date">{e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeRight>
        </div>
      </div>
    </div>
  );
}

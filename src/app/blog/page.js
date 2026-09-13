"use client";
import { useState } from "react";
import { getAllBlogs } from "../data/blogs";
import { COPY } from "../data/portfolio";
import { Header, Contact } from "../components/SiteChrome";
import { TransitionLink } from "../components/MotionProvider";
import { MaskText } from "../components/Reveal";
import Icon from "../components/Icons";

export default function BlogListPage() {
  const posts = getAllBlogs();
  const [tag, setTag] = useState("All");
  const tags = ["All", ...new Set(posts.flatMap((post) => post.tags))];
  const filtered =
    tag === "All" ? posts : posts.filter((post) => post.tags.includes(tag));
  return (
    <div id="top">
      <Header />
      <main id="main-content">
        <section className="journal-hero section-wrap">
          <span className="journal-intro">Thoughts in progress</span>
          <MaskText as="h1">Writing</MaskText>
          <p>{COPY.writingIntro}</p>
        </section>
        <section className="journal-section section-wrap" aria-label="Articles">
          <div
            className="journal-filters"
            role="group"
            aria-label="Filter articles by topic"
          >
            {tags.map((item) => (
              <button
                key={item}
                onClick={() => setTag(item)}
                aria-pressed={tag === item}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="journal-count" aria-live="polite">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {tag !== "All" ? ` about ${tag}` : ""}
          </p>
          <div className="journal-list">
            {filtered.map((post) => (
              <TransitionLink
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="journal-row"
              >
                <div className="journal-date">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                  <span>{post.readTime}</span>
                </div>
                <div className="journal-row-content">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div>
                    {post.tags.slice(0, 3).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <span className="circle-arrow">
                  <Icon size={22} />
                </span>
              </TransitionLink>
            ))}
          </div>
          {!filtered.length && (
            <p className="empty-state">No articles in this topic yet.</p>
          )}
        </section>
        <Contact />
      </main>
    </div>
  );
}

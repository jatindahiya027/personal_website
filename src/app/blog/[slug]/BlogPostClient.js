"use client";
import { useEffect, useRef, useState } from "react";
import { getAllBlogs } from "../../data/blogs";
import { PERSONAL } from "../../data/portfolio";
import { Header, Contact } from "../../components/SiteChrome";
import { TransitionLink } from "../../components/MotionProvider";
import { MaskText } from "../../components/Reveal";
import Icon from "../../components/Icons";

function CopyButton({ text }) {
  const [status, setStatus] = useState("Copy");
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Could not copy");
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("Copy"), 2000);
  }
  return (
    <button className="code-copy" onClick={copy} aria-live="polite">
      <Icon name={status === "Copied" ? "check" : "copy"} size={14} />
      {status}
    </button>
  );
}
function ContentBlock({ block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.author && <cite>{block.author}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <div className="code-block">
          <div className="code-toolbar">
            <span>{block.lang || "Code"}</span>
            <CopyButton text={block.text} />
          </div>
          <pre tabIndex={0}>
            <code>{block.text}</code>
          </pre>
        </div>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      );
    case "divider":
      return <hr />;
    case "link": {
      const external = /^https?:\/\//.test(block.href);
      return (
        <p className="article-resource-link">
          <a
            href={block.href}
            download={block.download || undefined}
            target={external && !block.download ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {block.text}
            <Icon
              name={block.download ? "arrow-down" : "arrow-up-right"}
              size={16}
            />
          </a>
        </p>
      );
    }
    case "video":
      return (
        <figure className="article-video">
          <video
            controls
            playsInline
            preload="none"
            poster={block.poster}
            aria-label={block.title || block.caption || "Article video"}
          >
            <source src={block.src} type={block.mimeType || "video/mp4"} />
            {(block.captions || []).map((track, index) => (
              <track
                key={`${track.src}-${index}`}
                kind="captions"
                src={track.src}
                srcLang={track.srclang}
                label={track.label}
                default={track.default || false}
              />
            ))}
            Your browser cannot play this video.{" "}
            <a href={block.src}>Download the video</a>.
          </video>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "image":
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt || block.caption || ""}
            loading="lazy"
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}
export default function BlogPostClient({ post }) {
  const related = getAllBlogs()
    .filter((item) => item.slug !== post.slug)
    .filter((item) => item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);
  return (
    <div id="top">
      <Header />
      <main id="main-content">
        <article className="article-page">
          <header className="article-header">
            <TransitionLink href="/blog/" className="text-link back-link">
              <Icon name="arrow-left" size={17} />
              All writing
            </TransitionLink>
            <div className="article-meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
            <MaskText as="h1">{post.title}</MaskText>
            <p>{post.excerpt}</p>
            <div className="article-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>
          {post.coverImage && (
            <img
              className="article-cover"
              src={post.coverImage}
              alt={post.title}
            />
          )}
          <div className="article-content">
            {post.content.map((block, index) => (
              <ContentBlock block={block} key={index} />
            ))}
          </div>
          <footer className="article-author">
            <img src={PERSONAL.photo} alt={PERSONAL.name} loading="lazy" />
            <div>
              <strong>{PERSONAL.name}</strong>
              <span>{PERSONAL.role}</span>
            </div>
            <TransitionLink href="/blog/" className="text-link">
              All writing
              <Icon name="arrow-right" size={18} />
            </TransitionLink>
          </footer>
        </article>
        {related.length > 0 && (
          <section className="related-section section-wrap">
            <h2>Keep reading</h2>
            {related.map((item) => (
              <TransitionLink
                className="writing-row"
                href={`/blog/${item.slug}/`}
                key={item.slug}
              >
                <span className="writing-category">{item.tags[0]}</span>
                <h3>{item.title}</h3>
                <span className="writing-read-time">{item.readTime}</span>
                <Icon size={22} />
              </TransitionLink>
            ))}
          </section>
        )}
        <Contact />
      </main>
    </div>
  );
}

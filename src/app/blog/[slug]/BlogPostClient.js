"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { getAllBlogs } from "../../data/blogs";
import { PERSONAL } from "../../data/portfolio";
import CustomCursor from "../../components/CustomCursor";

/* ── Reading progress bar ───────────────────────── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "3px",
      background: "var(--ink)", scaleX, transformOrigin: "0%", zIndex: 9000,
    }} />
  );
}

/* ── Copy code button ───────────────────────────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="bcode-copy" onClick={copy} title="Copy code">
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ── Content block renderer ─────────────────────── */
function ContentBlock({ block }) {
  switch (block.type) {
    case "p":
      return <p className="bp">{block.text}</p>;
    case "h2":
      return <h2 className="bh2">{block.text}</h2>;
    case "h3":
      return <h3 className="bh3">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="bquote">
          <p>{block.text}</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <div className="bcode-wrap">
          <div className="bcode-header">
            {block.lang && <span className="bcode-lang">{block.lang}</span>}
            <CopyButton text={block.text} />
          </div>
          <pre className="bcode"><code>{block.text}</code></pre>
        </div>
      );
    case "ul":
      return (
        <ul className="blist">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="blist blist--ol">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case "divider":
      return <hr className="bdivider" />;
    case "image":
      return (
        <figure className="bfigure">
          <img src={block.src} alt={block.caption || ""} className="bimage" />
          {block.caption && <figcaption className="bcaption">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

/* ── Tag pill ───────────────────────────────────── */
function Tag({ label }) {
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "99px",
      background: "rgba(26,25,22,0.07)", fontSize: "0.74rem", fontWeight: 600,
      letterSpacing: "0.06em", color: "var(--ink2)", textTransform: "uppercase",
    }}>{label}</span>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

/* ── Related posts ──────────────────────────────── */
function RelatedPosts({ current }) {
  const all = getAllBlogs();
  const related = all
    .filter(p => p.slug !== current.slug)
    .filter(p => p.tags.some(t => current.tags.includes(t)))
    .slice(0, 2);
  if (related.length === 0) return null;
  return (
    <div className="brelated">
      <h3 className="brelated-title">More posts</h3>
      <div className="brelated-grid">
        {related.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="brelated-card">
            <div className="brelated-cover"
              style={{ background: p.coverColor || "linear-gradient(135deg,#e8e4de,#c8b89a)" }} />
            <div className="brelated-body">
              <p className="brelated-meta">{formatDate(p.date)} · {p.readTime}</p>
              <p className="brelated-name">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Main client component ──────────────────────── */
export default function BlogPostClient({ post }) {
  return (
    <div className="blog-post-page">
      <CustomCursor />
      <ReadingProgress />

      {/* Top bar */}
      <header className="blog-header">
        <Link href="/blog" className="blog-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
          All posts
        </Link>
        <span className="blog-header-title">{PERSONAL.name}</span>
        <div style={{ width: 80 }} />
      </header>

      {/* Cover */}
      <div className="bpost-cover"
        style={{ background: post.coverColor || "linear-gradient(135deg,#e8e4de,#c8b89a)" }}>
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        )}
        <div className="bpost-cover-fade" />
      </div>

      {/* Article */}
      <motion.article className="bpost-article"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

        <header className="bpost-header">
          <div className="bpost-meta">
            <span>{formatDate(post.date)}</span>
            <span className="blog-card-dot">·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="bpost-title">{post.title}</h1>
          <p className="bpost-excerpt">{post.excerpt}</p>
          <div className="bpost-tags">
            {post.tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <div className="bpost-divider" />
        </header>

        <div className="bpost-content">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        <div className="bpost-footer">
          <div className="bpost-author">
            <img src={PERSONAL.photo} alt={PERSONAL.name} className="bpost-author-img" />
            <div>
              <div className="bpost-author-name">{PERSONAL.name}</div>
              <div className="bpost-author-role">Systems Engineer · Software Developer</div>
            </div>
          </div>
          <Link href="/blog" className="bpost-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12,19 5,12 12,5"/>
            </svg>
            Back to all posts
          </Link>
        </div>

        <RelatedPosts current={post} />
      </motion.article>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAllBlogs } from "../data/blogs";
import { PERSONAL } from "../data/portfolio";
import CustomCursor from "../components/CustomCursor";

const PAGE_SIZE = 4;

/* ── Helpers ─────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function Tag({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`blog-tag-pill${active ? " blog-tag-pill--active" : ""}`}>
      {label}
    </button>
  );
}

/* ── Blog card ───────────────────────────────────── */
function BlogCard({ post, index, isFeature }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.06, 0.3) }}>
      <Link
        href={`/blog/${post.slug}`}
        style={{ textDecoration: "none", display: "block" }}
        className={`blog-card${isFeature ? " blog-card--feature" : ""}`}>

        <div className="blog-card-cover"
          style={{ background: post.coverColor || "linear-gradient(135deg,#e8e4de,#c8b89a)" }}>
          {post.coverImage && (
            <img src={post.coverImage} alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          <div className="blog-card-cover-fade" />
          {isFeature && <span className="blog-card-featured-badge">Featured</span>}
        </div>

        <div className="blog-card-body">
          <div className="blog-card-meta">
            <span>{formatDate(post.date)}</span>
            <span className="blog-card-dot">·</span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <div className="blog-card-tags">
            {post.tags.slice(0, 3).map(t => (
              <span key={t} className="blog-tag-static">{t}</span>
            ))}
          </div>
          <div className="blog-card-cta">
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ── Skeleton ────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="blog-card blog-card--skeleton" aria-hidden="true">
      <div className="blog-card-cover skeleton-block" />
      <div className="blog-card-body">
        <div className="skeleton-line" style={{ width: "40%", height: "12px", marginBottom: "14px" }} />
        <div className="skeleton-line" style={{ width: "92%", height: "22px", marginBottom: "8px" }} />
        <div className="skeleton-line" style={{ width: "70%", height: "22px", marginBottom: "18px" }} />
        <div className="skeleton-line" style={{ width: "100%", height: "13px", marginBottom: "7px" }} />
        <div className="skeleton-line" style={{ width: "80%", height: "13px" }} />
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────── */
export default function BlogListPage() {
  const allPosts = getAllBlogs();

  // Collect all unique tags
  const allTags = ["All", ...Array.from(new Set(allPosts.flatMap(p => p.tags)))];

  const [activeTag,  setActiveTag]  = useState("All");
  const [visible,    setVisible]    = useState(PAGE_SIZE);
  const [loading,    setLoading]    = useState(false);
  const sentinelRef = useRef(null);

  // Filter by tag
  const filtered = activeTag === "All"
    ? allPosts
    : allPosts.filter(p => p.tags.includes(activeTag));

  const shown   = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  // Reset visible count when tag changes
  useEffect(() => { setVisible(PAGE_SIZE); }, [activeTag]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setVisible(v => v + PAGE_SIZE);
      setLoading(false);
    }, 500);
  }, [loading, hasMore]);

  // Infinite scroll sentinel
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <div className="blog-page">
      <CustomCursor />

      {/* Top bar */}
      <header className="blog-header">
        <Link href="/" className="blog-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
          {PERSONAL.name}
        </Link>
        <div className="blog-header-title">Writing</div>
        <div style={{ width: 80 }} />
      </header>

      {/* Hero */}
      <motion.div className="blog-hero"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}>
        <p className="blog-hero-eyebrow">Essays &amp; Thoughts</p>
        <h1 className="blog-hero-title">Writing</h1>
        <p className="blog-hero-sub">
          Code, craft, and lessons learned the hard way.
        </p>
      </motion.div>

      {/* Tag filter */}
      <div className="blog-tag-bar">
        {allTags.map(tag => (
          <Tag key={tag} label={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(tag)} />
        ))}
      </div>

      {/* Grid */}
      <main className="blog-grid">
        <AnimatePresence mode="wait">
          {shown.length === 0 ? (
            <motion.p key="empty"
              className="blog-empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              No posts tagged "{activeTag}" yet.
            </motion.p>
          ) : (
            shown.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} isFeature={i === 0 && activeTag === "All"} />
            ))
          )}
        </AnimatePresence>
        {loading && [0, 1].map(i => <SkeletonCard key={`sk-${i}`} />)}
      </main>

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {!hasMore && shown.length > 0 && (
        <motion.p className="blog-end-note"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          You've reached the end · {filtered.length} post{filtered.length !== 1 ? "s" : ""}
        </motion.p>
      )}

      <footer className="blog-footer">
        <Link href="/" className="blog-back-link" style={{ justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
          Back to portfolio
        </Link>
        <span>© {new Date().getFullYear()} {PERSONAL.name}</span>
      </footer>
    </div>
  );
}

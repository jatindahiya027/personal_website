# Apple UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the portfolio's visual quality to Apple-level polish — floating pill navbar, split-layout hero, refined section spacing, improved card depth — while preserving all existing functionality, data, and animations.

**Architecture:** CSS-first approach. `globals.css` receives the largest change (all visual tokens and section styles). `HeroSection.js` is restructured from a centered-photo layout to a two-column split. `Navbar.js` gains a sticky wrapper div. `ProjectsSection.js` adds a one-line project name label. Blog files get CSS class alignment only.

**Tech Stack:** Next.js 14, React, Framer Motion, Tailwind (utility layer only), DM Sans + DM Serif Display (Google Fonts), CSS custom properties

---

## File Map

| File | Change type | Summary |
|---|---|---|
| `src/app/globals.css` | Major rewrite | All tokens, section styles, responsive rules |
| `src/app/components/Navbar.js` | Wrap in outer div | Floating pill effect |
| `src/app/components/HeroSection.js` | JSX restructure | Split layout, eyebrow, CTAs |
| `src/app/leftflex.js` | 1 line | Pass `scrollTo` prop to HeroSection |
| `src/app/components/ProjectsSection.js` | 1 line | Add project name label below pill |
| `src/app/blog/page.js` | No change | Blog header gets CSS class updates only |
| `src/app/blog/[slug]/BlogPostClient.js` | No change | Same |

---

## Task 1: Design Tokens + Shared Section Styles

**Files:**
- Modify: `src/app/globals.css` — `:root`, reset, `.section-label`, `.h1heading`, `.progress-bar`

- [ ] **Step 1: Replace `:root` tokens block in globals.css**

Find the existing `:root { ... }` block (lines ~10–29) and replace it with:

```css
:root {
  --bg:          #F2EDE6;
  --bg2:         #EAE4DB;
  --surface:     #FAFAF8;
  --border:      rgba(0,0,0,0.07);
  --ink:         #1A1916;
  --ink2:        #6B6860;
  --ink3:        #A8A59F;
  --accent:      #C8B89A;
  --white:       #FFFFFF;
  --r-sm:        10px;
  --r-md:        20px;
  --r-lg:        32px;
  --r-xl:        48px;
  --s1:  0 1px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
  --s2:  0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
  --s3:  0 16px 48px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.05);
  --eout:   cubic-bezier(0.22, 1, 0.36, 1);
  --espring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 2: Update `.section-label` — add gold accent line**

Find the existing `.section-label` block and replace it with:

```css
.section-label {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink3); margin-bottom: 10px;
}
.section-label::before {
  content: ''; display: block;
  width: 24px; height: 1px; background: var(--accent);
}
```

- [ ] **Step 3: Update `.h1heading` — tighter letter-spacing, larger clamp**

Find existing `.h1heading` and replace:

```css
.h1heading {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 400; letter-spacing: -0.03em;
  line-height: 1.02; color: var(--ink);
  margin-bottom: 52px;
}
```

- [ ] **Step 4: Update `.progress-bar` — accent color stripe**

```css
.progress-bar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--ink));
  transform-origin: 0%; z-index: 9999;
}
```

- [ ] **Step 5: Start dev server and verify**

```bash
cd "D:/Projects/portfolio-enhanced - Copy"
npm run dev
```

Open http://localhost:3000. Section headings should look slightly larger with tighter letter-spacing. Progress bar should show the gold→ink gradient on scroll.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update design tokens and shared section styles"
```

---

## Task 2: Navbar — Floating Pill

**Files:**
- Modify: `src/app/globals.css` — navbar section
- Modify: `src/app/components/Navbar.js` — wrap nav in outer div

- [ ] **Step 1: Replace navbar CSS block in globals.css**

Find the `/* NAVBAR */` section (lines ~61–127) and replace the entire block with:

```css
/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
.navbar-outer {
  position: sticky; top: 0; z-index: 500;
  padding: 12px 56px 0;
  pointer-events: none;
}

.navbar {
  height: 52px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px;
  background: rgba(242,237,230,0.88);
  backdrop-filter: blur(28px) saturate(1.8);
  -webkit-backdrop-filter: blur(28px) saturate(1.8);
  border: 1px solid rgba(255,255,255,0.55);
  border-radius: 99px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
  pointer-events: auto;
}

.nav-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 1.05rem; letter-spacing: -0.01em;
  color: var(--ink); user-select: none;
}

.nav-links { display: flex; align-items: center; gap: 2px; }

.navbar-button {
  padding: 6px 14px; border-radius: 99px;
  font-size: 0.8rem; font-weight: 500;
  color: var(--ink2); cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.navbar-button:hover { background: rgba(0,0,0,0.06); color: var(--ink); }

.nav-resume-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 18px;
  background: var(--ink); color: var(--white);
  border-radius: 99px; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem; font-weight: 500; letter-spacing: 0.01em;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.22);
  transition: transform 0.2s var(--espring), box-shadow 0.2s;
}
.nav-resume-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.24); }
.nav-resume-btn:active { transform: translateY(0); box-shadow: 0 2px 10px rgba(0,0,0,0.22); }
.nav-resume-btn svg { transition: transform 0.2s var(--espring); }
.nav-resume-btn:hover svg { transform: translateY(2px); }

.hamburger {
  display: none; background: none; border: none;
  cursor: pointer; padding: 6px; border-radius: 8px;
  transition: background 0.15s;
}
.hamburger:hover { background: rgba(0,0,0,0.06); }

.mobileham {
  position: fixed; top: 76px; right: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 8px; min-width: 180px;
  box-shadow: var(--s3); z-index: 600;
}
.menu-item {
  padding: 10px 16px; border-radius: var(--r-sm);
  cursor: pointer; font-weight: 500; font-size: 0.9rem;
  color: var(--ink2);
  transition: background 0.12s, color 0.12s;
}
.menu-item:hover { background: rgba(0,0,0,0.05); color: var(--ink); }
```

- [ ] **Step 2: Update Navbar.js — wrap nav in outer div**

Open `src/app/components/Navbar.js`. The component currently returns `<nav className="navbar">...</nav>`.

Wrap it so the return becomes:

```jsx
return (
  <div className="navbar-outer">
    <nav className="navbar">
      <div className="nav-logo">{PERSONAL.name}</div>

      {/* Desktop */}
      {!isMobile && (
        <div className="nav-links">
          {NAV_ITEMS.map((item, i) => (
            <motion.div key={item.key}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}>
              <div className="navbar-button" onClick={() => scrollTo(item.key)}>
                {item.label}
              </div>
            </motion.div>
          ))}
          {/* Blog — opens /blog page */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_ITEMS.length * 0.07, duration: 0.35 }}>
            <Link href="/blog" className="navbar-button" style={{ textDecoration: "none" }}>
              Blog
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}>
            <ResumeBtn />
          </motion.div>
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ResumeBtn />
          <button className="hamburger" aria-label="Menu"
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#1A1916" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div className="mobileham"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                onClick={e => e.stopPropagation()}>
                {NAV_ITEMS.map(item => (
                  <div key={item.key} className="menu-item"
                    onClick={() => { scrollTo(item.key); setMenuOpen(false); }}>
                    {item.label}
                  </div>
                ))}
                <Link href="/blog" className="menu-item"
                  style={{ display: "block", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}>
                  Blog
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  </div>
);
```

- [ ] **Step 3: Update mobile navbar CSS in the `@media (max-width: 768px)` block**

Find `.navbar { padding: 0 20px; }` inside the mobile media query and replace with:

```css
.navbar-outer { padding: 10px 16px 0; }
.navbar { padding: 0 18px; }
```

- [ ] **Step 4: Update tablet navbar CSS in the `@media (min-width: 769px) and (max-width: 1024px)` block**

Find `.navbar { padding: 0 36px; }` in the tablet media query and replace with:

```css
.navbar-outer { padding: 12px 36px 0; }
.navbar { padding: 0 24px; }
```

- [ ] **Step 5: Verify in browser**

Navbar should now appear as a floating pill, slightly inset from viewport edges, with frosted glass background. Mobile hamburger menu should still work.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/components/Navbar.js
git commit -m "style: floating pill navbar with frosted glass"
```

---

## Task 3: Hero — Split Layout

**Files:**
- Modify: `src/app/globals.css` — hero section
- Modify: `src/app/components/HeroSection.js` — full restructure
- Modify: `src/app/leftflex.js` — pass scrollTo prop

- [ ] **Step 1: Replace the hero CSS block in globals.css**

Find the `/* HERO */` section (lines ~130–300) and replace the entire block with:

```css
/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
.landing {
  position: relative;
  min-height: calc(100vh - 52px - 12px);
  display: grid;
  grid-template-columns: 1fr min(44vw, 520px);
  overflow: hidden;
  background: var(--bg);
}

/* ── Left content column ── */
.hero-left {
  padding: 72px 64px;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 2;
}

.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink3); margin-bottom: 24px;
}
.hero-eyebrow::before {
  content: ''; display: block;
  width: 28px; height: 1px; background: var(--accent);
}

.hero-name {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(3.2rem, 6vw, 5.8rem);
  font-weight: 400; letter-spacing: -0.03em;
  line-height: 0.92; color: var(--ink);
  margin-bottom: 20px;
}
.hero-name em { font-style: italic; color: var(--ink2); }

.hero-tagline {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  color: var(--ink2); margin-bottom: 36px;
  line-height: 1.5; max-width: 340px;
}
.hero-tagline strong {
  font-style: normal; color: var(--ink);
  display: block; min-height: 1.4em;
}

.hero-ctas {
  display: flex; gap: 12px; align-items: center;
  margin-bottom: 44px; flex-wrap: wrap;
}

.hero-cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px;
  background: var(--ink); color: var(--white);
  border: none; border-radius: 99px; cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem; font-weight: 500; letter-spacing: 0.01em;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: transform 0.2s var(--espring), box-shadow 0.2s;
}
.hero-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.22); }
.hero-cta-primary:active { transform: translateY(0); }

.hero-cta-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px;
  background: transparent; color: var(--ink);
  border: 1.5px solid rgba(0,0,0,0.14); border-radius: 99px; cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem; font-weight: 500;
  transition: background 0.15s, border-color 0.15s, transform 0.2s var(--espring);
}
.hero-cta-secondary:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.22); transform: translateY(-1px); }

/* ── Availability badge ── */
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 99px;
  padding: 8px 16px 8px 10px;
  font-size: 0.75rem; font-weight: 500;
  color: var(--ink2);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  cursor: default; width: fit-content;
}
.hero-badge-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  60%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}

/* ── Right photo column ── */
.hero-right {
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, var(--bg2) 0%, #DDD7CD 100%);
}

/* Dot-grid canvas fills right panel */
.hero-canvas {
  position: absolute; inset: 0; z-index: 0;
  width: 100%; height: 100%;
  pointer-events: none;
}

/* Decorative rings — centered in right panel */
.hero-rings {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(90%, 500px);
  aspect-ratio: 1; z-index: 1;
  pointer-events: none;
}

/* Grain overlay */
.landing-grain {
  position: absolute; inset: 0; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Bottom gradient fade on right panel */
.hero-right::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 200px; z-index: 3;
  background: linear-gradient(to top, rgba(234,228,219,0.6) 0%, transparent 100%);
  pointer-events: none;
}

/* Person photo */
.hero-img {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  margin: 0 auto;
  height: 95%; width: auto; max-width: 100%;
  object-fit: contain; object-position: bottom center;
  pointer-events: none; user-select: none;
  display: block; z-index: 4;
}

/* Marquee — behind right panel content */
.movediv {
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: clamp(3rem, 7vw, 8rem);
  font-weight: 400; color: var(--ink);
  opacity: 0.05;
  position: absolute; bottom: 60px; left: 0; right: 0;
  overflow: hidden; white-space: nowrap;
  pointer-events: none; z-index: 3; line-height: 1;
}
.move { display: inline-block; }

/* ── Scroll indicator ── */
.hero-scroll {
  position: absolute;
  bottom: 32px; left: 64px;
  z-index: 10;
  display: flex; flex-direction: column;
  align-items: center; gap: 6px;
  pointer-events: none;
}
.hero-scroll-label {
  font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink3);
}
.hero-scroll-line {
  width: 1px; height: 32px;
  background: linear-gradient(to bottom, var(--ink3), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}
@keyframes scroll-line {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
  50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
  51%  { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

/* ── Mobile hero ── */
@media (max-width: 768px) {
  .landing {
    grid-template-columns: 1fr;
    grid-template-rows: 56vw auto;
    min-height: auto;
  }
  .hero-right { order: 1; min-height: 56vw; }
  .hero-left  { order: 2; padding: 36px 24px 44px; }
  .hero-name  { font-size: clamp(2.6rem, 10vw, 4rem); }
  .hero-tagline { font-size: 1rem; margin-bottom: 28px; }
  .hero-ctas  { margin-bottom: 28px; }
  .hero-scroll { display: none; }
}

/* ── Tablet hero ── */
@media (min-width: 769px) and (max-width: 1024px) {
  .landing { grid-template-columns: 1fr 38vw; }
  .hero-left { padding: 56px 44px; }
  .hero-name { font-size: clamp(2.8rem, 5.5vw, 4.5rem); }
}
```

- [ ] **Step 2: Update leftflex.js — pass scrollTo to HeroSection**

Open `src/app/leftflex.js`. Find:

```jsx
<HeroSection isMobile={isMobile} isTab={isTab} />
```

Replace with:

```jsx
<HeroSection isMobile={isMobile} isTab={isTab} scrollTo={scrollTo} />
```

- [ ] **Step 3: Rewrite HeroSection.js**

Replace the entire content of `src/app/components/HeroSection.js` with:

```jsx
"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import InfiniteTextRotation from "../scrolltrigger";
import { TypeCycle } from "./TypeWriter";
import { PERSONAL, HERO_ROLES, EXPERIENCE } from "../data/portfolio";

export default function HeroSection({ isMobile, isTab, scrollTo }) {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const rafRef    = useRef(null);

  // Interactive dot-grid — brightens toward mouse position
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    const SP = isMobile ? 32 : 40;
    const DR = 1.3;
    const RC = isMobile ? 80 : 120;

    let dots = [];
    const build = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width  / SP) + 1;
      const rows = Math.ceil(canvas.height / SP) + 1;
      dots = Array.from({ length: rows * cols }, (_, i) => ({
        x: (i % cols) * SP,
        y: Math.floor(i / cols) * SP,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      for (const d of dots) {
        const dist = Math.sqrt((d.x - mx) ** 2 + (d.y - my) ** 2);
        const t    = Math.max(0, 1 - dist / RC);
        ctx.beginPath();
        ctx.arc(d.x, d.y, DR + t * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,25,22,${0.08 + t * 0.5})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    build();
    draw();

    const parent = canvas.parentElement;
    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    parent.addEventListener("mousemove",  onMove,  { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove",  onMove);
      parent.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, [isMobile]);

  const src = isMobile || isTab ? PERSONAL.heroImageMobile : PERSONAL.heroImageDesktop;
  const eyebrow = EXPERIENCE[0]
    ? `${EXPERIENCE[0].title} · ${EXPERIENCE[0].company}`
    : "Software Engineer";
  const [firstName, ...rest] = PERSONAL.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="landing">

      {/* ── Left content column ── */}
      <div className="hero-left">
        <motion.div className="hero-eyebrow"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
          {eyebrow}
        </motion.div>

        <motion.h1 className="hero-name"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}>
          {firstName}<br /><em>{lastName}.</em>
        </motion.h1>

        <motion.div className="hero-tagline"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22,1,0.36,1] }}>
          <span style={{ display: "block" }}>{PERSONAL.tagline} Engineer</span>
          <strong>
            <TypeCycle phrases={HERO_ROLES} startDelay={0.8} />
          </strong>
        </motion.div>

        <motion.div className="hero-ctas"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22,1,0.36,1] }}>
          <button className="hero-cta-primary" onClick={() => scrollTo?.("projects")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,8 16,12 12,16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            View Work
          </button>
          <button className="hero-cta-secondary" onClick={() => scrollTo?.("contact")}>
            Get in touch
          </button>
        </motion.div>

        <motion.div className="hero-badge"
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.22,1,0.36,1] }}>
          <span className="hero-badge-dot" />
          Available for work
        </motion.div>
      </div>

      {/* ── Right photo column ── */}
      <div className="hero-right">
        <canvas ref={canvasRef} className="hero-canvas" />

        <svg className="hero-rings" viewBox="0 0 820 820" fill="none" aria-hidden="true">
          <motion.circle cx="410" cy="410" r="390"
            stroke="rgba(26,25,22,0.055)" strokeWidth="1" strokeDasharray="12 18"
            animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ originX: "410px", originY: "410px" }} />
          <motion.circle cx="410" cy="410" r="300"
            stroke="rgba(26,25,22,0.07)" strokeWidth="1" strokeDasharray="6 20"
            animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: "410px", originY: "410px" }} />
          <circle cx="410" cy="410" r="210" stroke="rgba(26,25,22,0.055)" strokeWidth="1" />
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ originX: "410px", originY: "410px" }}>
            <circle cx="410" cy="20" r="5" fill="rgba(200,184,154,0.9)" />
          </motion.g>
          <motion.g animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ originX: "410px", originY: "410px" }}>
            <circle cx="410" cy="110" r="4" fill="rgba(26,25,22,0.2)" />
          </motion.g>
        </svg>

        <div className="landing-grain" />

        <motion.img src={src} alt={PERSONAL.name} className="hero-img"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }} />

        <InfiniteTextRotation />
      </div>

      {/* Scroll cue — desktop only */}
      {!isMobile && (
        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Remove old hero CSS from the mobile + tablet media queries**

In the mobile `@media (max-width: 768px)` block, remove these lines (they're now inside the hero CSS block added in Step 1):

```css
/* Hero */
.landing { height: 88vh; min-height: 480px; }
.hero-img { ... }
.hero-bottom-bar { padding: 0 20px 28px; }
.job { font-size: clamp(0.88rem, 3.5vw, 1.1rem); }
.movediv { font-size: clamp(2.2rem, 9vw, 4.5rem); bottom: 60px; }
```

Also remove `.hero-scroll { display: none; }` from the mobile block (it's already in the hero CSS block above).

- [ ] **Step 5: Verify in browser**

Hero should show: left column with eyebrow "Systems Engineer · TCS", large "Jatin / *Dahiya.*" name, italic role text with TypeCycle, two CTA buttons, green available badge. Right column: warm gradient bg, dot-grid canvas, orbiting rings, photo, faint marquee.

On mobile (resize to <768px): photo panel on top, content below, stacked vertically.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/components/HeroSection.js src/app/leftflex.js
git commit -m "feat: split-layout hero — text left, photo right"
```

---

## Task 4: Profile + Skills CSS

**Files:**
- Modify: `src/app/globals.css` — profile and skills sections

- [ ] **Step 1: Replace profile CSS block in globals.css**

Find `/* PROFILE */` section (after `/* SHARED SECTION */`) and replace from `.aboutme` to end of profile styles:

```css
/* ══════════════════════════════════════
   PROFILE
══════════════════════════════════════ */
.aboutme {
  background: var(--bg);
  padding: 96px 80px;
}

.profile {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 72px; align-items: start;
}

.profilediv { display: flex; flex-direction: column; align-items: center; }

.meimage {
  width: 100%; aspect-ratio: 3/4;
  object-fit: cover; object-position: top center;
  border-radius: 40px 40px var(--r-xl) var(--r-xl);
  display: block;
  transition:
    border-radius 0.5s var(--espring),
    transform 0.4s var(--eout),
    box-shadow 0.4s;
  box-shadow: var(--s2);
}
.meimage:hover {
  border-radius: var(--r-lg);
  transform: scale(1.02) translateY(-6px);
  box-shadow: var(--s3);
}

.profilep2 {
  font-family: 'DM Serif Display', serif;
  font-size: 1.4rem; margin-top: 16px;
  text-align: center; color: var(--ink);
  letter-spacing: -0.01em;
}
.profilep {
  font-size: 0.88rem; color: var(--ink2);
  text-align: center; margin-top: 8px;
  font-weight: 300; line-height: 1.65;
}

.info { display: flex; flex-direction: column; }

.info-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 28px; padding: 26px 0;
  border-bottom: 1px solid var(--border);
  align-items: start;
}
.info-row:first-child { padding-top: 0; border-top: 1px solid var(--border); }

.italics {
  font-family: 'DM Serif Display', serif;
  font-style: italic; font-size: 0.95rem;
  color: var(--ink); padding-top: 2px;
}

.info-content { font-size: 0.9rem; line-height: 1.75; }
.small { color: var(--ink2); font-weight: 300; }

.exp-entry { margin-bottom: 14px; }
.exp-entry:last-child { margin-bottom: 0; }
.exp-title { font-weight: 600; color: var(--ink); }
.exp-org { color: var(--ink2); font-weight: 300; font-size: 0.85rem; }
.exp-date { color: var(--ink3); font-size: 0.76rem; margin-top: 2px; letter-spacing: 0.02em; }
```

- [ ] **Step 2: Replace skills CSS block in globals.css**

Find `/* SKILLS */` section and replace:

```css
/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
.Skills { background: var(--bg2); padding: 96px 80px; }

.skillsimg {
  display: flex; flex-wrap: wrap;
  gap: 12px; justify-content: center;
}

.cont {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; width: 136px; height: 144px;
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--s1); cursor: pointer;
  transition: transform 0.2s var(--eout), box-shadow 0.2s;
  /* JS tilt overrides transform on hover */
}
.cont:hover { box-shadow: var(--s2); }
.cont p {
  font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink2); text-align: center;
  line-height: 1.3;
}
```

- [ ] **Step 3: Update mobile profile + skills in `@media (max-width: 768px)`**

Find the profile and skills mobile rules and replace them:

```css
/* Profile */
.aboutme { padding: 64px 24px 80px; }
.profile { grid-template-columns: 1fr; gap: 32px; }
.meimage { aspect-ratio: 4/3; border-radius: var(--r-lg) var(--r-lg) var(--r-xl) var(--r-xl); }
.profilep2 { font-size: 1.3rem; }
.info-row { grid-template-columns: 1fr; gap: 6px; }
.info-row:first-child { border-top: none; padding-top: 20px; }

/* Skills */
.Skills { padding: 64px 20px 80px; }
.skillsimg { gap: 9px; }
.cont { width: 86px; height: 96px; gap: 8px; }
.cont img { width: 30px !important; height: 30px !important; }
.cont p { font-size: 0.56rem; }
```

- [ ] **Step 4: Update tablet profile + skills in `@media (min-width: 769px) and (max-width: 1024px)`**

Find and replace:

```css
.aboutme, .Skills, .Projects,
.aboutme.proj-summary { padding-left: 48px; padding-right: 48px; }
.profile { grid-template-columns: 240px 1fr; gap: 52px; }
```

- [ ] **Step 5: Verify in browser**

Profile section: photo has sharper top corners, heavier name weight on exp titles. Skills section: cards slightly larger, cleaner hover.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: refined profile and skills section"
```

---

## Task 5: Projects CSS + Name Label

**Files:**
- Modify: `src/app/globals.css` — projects sections
- Modify: `src/app/components/ProjectsSection.js` — add name label

- [ ] **Step 1: Replace projects overview CSS block**

Find `/* PROJECTS OVERVIEW */` and replace through end of `.proj-card:hover .projimage`:

```css
/* ══════════════════════════════════════
   PROJECTS OVERVIEW
══════════════════════════════════════ */
.Projects { background: var(--bg); padding: 96px 80px 140px; }

.projectsdiv {
  display: flex; flex-direction: row;
  justify-content: center; align-items: flex-end;
  gap: 56px; margin-top: 48px;
}

.proj-card {
  display: flex; flex-direction: column;
  align-items: center; gap: 14px;
  cursor: pointer;
}
.proj-card--raised { transform: translateY(-56px); }

.proj-num {
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.16em; color: var(--ink3);
  text-transform: uppercase; line-height: 1;
  transition: color 0.2s;
}
.proj-card:hover .proj-num { color: var(--ink); }

.proj-name {
  font-family: 'DM Serif Display', serif;
  font-size: 0.92rem; color: var(--ink2);
  letter-spacing: -0.01em;
  transition: color 0.2s;
}
.proj-card:hover .proj-name { color: var(--ink); }

.projimage {
  width: clamp(140px, 12vw, 210px);
  height: clamp(215px, 19vw, 320px);
  border-radius: 200px;
  object-fit: cover; object-position: center;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--s2);
  transition:
    border-radius 0.55s var(--espring),
    transform 0.4s var(--eout),
    box-shadow 0.4s;
}
.proj-card:hover .projimage {
  border-radius: var(--r-md);
  transform: scale(1.04) translateY(-10px);
  box-shadow: var(--s3);
}
```

- [ ] **Step 2: Replace project header banner CSS**

Find `/* PROJECT HEADER BANNER */` section and replace:

```css
/* ══════════════════════════════════════
   PROJECT HEADER BANNER
══════════════════════════════════════ */
.Projectheading {
  display: flex; flex-direction: row;
  align-items: center; justify-content: space-between;
  background: var(--bg2);
  border-radius: var(--r-xl);
  padding: 48px 80px; gap: 32px; overflow: hidden;
  position: relative;
  border: 1px solid var(--border);
  margin: 6px 0;
}

.projectheadingdiv {
  display: flex; align-items: baseline;
  gap: 20px; flex: 1; min-width: 0;
}

.number {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(4.5rem, 10vw, 9rem);
  font-weight: 400;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(26,25,22,0.18);
  line-height: 1; flex-shrink: 0;
  user-select: none;
  transition: -webkit-text-stroke 0.3s;
}
.Projectheading:hover .number {
  -webkit-text-stroke: 1.5px rgba(26,25,22,0.32);
}

.name {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.6rem, 5.5vw, 6.5rem);
  font-weight: 400; letter-spacing: -0.03em;
  color: var(--ink); line-height: 0.95;
  word-break: break-word;
}

.projectheadingdiv2 {
  display: flex; align-items: center;
  justify-content: flex-end; flex-shrink: 0;
}

.headimg {
  width: clamp(120px, 14vw, 220px);
  height: auto; border-radius: var(--r-lg);
  object-fit: contain;
  transition: transform 0.4s var(--espring);
  box-shadow: var(--s2);
}
.headimg:hover { transform: scale(1.05) rotate(2deg); }
```

- [ ] **Step 3: Replace project summary CSS**

Find `/* PROJECT SUMMARY */` and replace:

```css
/* ══════════════════════════════════════
   PROJECT SUMMARY
══════════════════════════════════════ */
.aboutme.proj-summary {
  background: var(--bg); padding: 72px 80px 104px;
}

.summarydiv {
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 72px; align-items: start;
}
.summarydivmobil { display: flex; flex-direction: column; gap: 40px; }

.summary-text {
  font-size: 0.95rem; line-height: 1.85;
  color: var(--ink2); font-weight: 300;
}
.summary-text h2 {
  font-family: 'DM Serif Display', serif;
  font-size: 1.25rem; font-weight: 400;
  color: var(--ink); margin: 28px 0 10px;
}
.summary-text ul { margin-left: 18px; }
.summary-text li { margin-bottom: 8px; }
.summary-text b { font-weight: 600; color: var(--ink); }

.summary-images {
  display: flex; flex-direction: column;
  gap: 10px; width: 100%;
}
.summary-col {
  display: flex; flex-direction: row; gap: 10px;
}
.summary-col:last-child { padding-left: 24px; }

.summaryimg {
  flex: 1; width: 0; height: auto;
  aspect-ratio: 16/9;
  border-radius: var(--r-md);
  object-fit: cover; object-position: top left;
  cursor: zoom-in;
  box-shadow: var(--s1);
  transition: transform 0.3s var(--eout), box-shadow 0.3s;
}
.summaryimg:hover { transform: translateY(-4px) scale(1.02); box-shadow: var(--s3); }

.proj-meta { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }

.techstack { display: flex; flex-wrap: wrap; gap: 7px; }
.techstack p {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 99px; padding: 5px 14px;
  font-size: 0.74rem; font-weight: 500; letter-spacing: 0.03em;
  color: var(--ink2); cursor: default;
  transition: transform 0.18s var(--espring), background 0.18s, color 0.18s, border-color 0.18s;
}
.techstack p:hover {
  transform: translateY(-2px);
  background: var(--ink); color: var(--white); border-color: var(--ink);
}

.github-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 20px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 99px; font-size: 0.875rem;
  font-weight: 500; color: var(--ink2);
  text-decoration: none; width: fit-content;
  transition: background 0.18s, color 0.18s, transform 0.2s var(--espring), box-shadow 0.18s;
}
.github-link:hover {
  background: var(--ink); color: var(--white);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.14);
}
```

- [ ] **Step 4: Add `.proj-name` to ProjectsSection.js**

Open `src/app/components/ProjectsSection.js`. Find the `ProjectsOverview` function. Inside the `.proj-card` div, after the `<img>` element, add:

```jsx
<span className="proj-name">{name}</span>
```

The full mapping block should look like:

```jsx
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
```

- [ ] **Step 5: Update mobile projects in `@media (max-width: 768px)`**

Find and replace mobile projects rules:

```css
/* Projects overview */
.Projects { padding: 64px 20px 100px; }
.projectsdiv { gap: 12px; margin-top: 36px; }
.proj-card--raised { transform: translateY(-22px); }
.projimage { width: 26vw; height: 39vw; border-radius: 80px; }

/* Project header */
.Projectheading {
  padding: 36px 24px; flex-direction: column;
  align-items: center; text-align: center; gap: 16px;
  border-radius: var(--r-lg); margin: 4px 0;
}
.projectheadingdiv {
  flex-direction: column; gap: 0;
  align-items: center; width: 100%;
}
.number {
  font-size: clamp(3.5rem, 17vw, 7rem);
  -webkit-text-stroke: 1.5px rgba(26,25,22,0.18);
}
.name { font-size: clamp(2.2rem, 10vw, 4.5rem); }
.projectheadingdiv2 { justify-content: center; width: 100%; }
.headimg { width: clamp(90px, 32vw, 160px); }

/* Project summary */
.aboutme.proj-summary { padding: 48px 24px 72px; }
.summarydiv { grid-template-columns: 1fr; gap: 36px; }
.summary-images { flex-direction: column; gap: 8px; }
.summary-col { flex-direction: row; gap: 8px; }
.summary-col:last-child { padding-left: 0; }
```

- [ ] **Step 6: Verify in browser**

Projects overview: each pill card now shows "01 / [pill image] / Stag" vertically. Project banners have rounded corners. Summary images have a subtle shadow.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/app/components/ProjectsSection.js
git commit -m "style: refined projects section with name labels on cards"
```

---

## Task 6: Contact + Footer CSS

**Files:**
- Modify: `src/app/globals.css` — contact and footer sections

- [ ] **Step 1: Replace contact CSS block in globals.css**

Find `/* CONTACT */` section and replace from `.contacts` to end of `.contact-success`:

```css
/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
.contacts {
  padding: 96px 0 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex; flex-direction: column;
  align-items: stretch;
}

.contacts-header { padding: 0 80px; margin-bottom: 4px; }

.contact-form-wrap {
  padding: 0 80px 96px;
  max-width: 780px;
}

.contact-form {
  display: flex; flex-direction: column; gap: 20px;
}

.cf-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}

.cf-field {
  display: flex; flex-direction: column; gap: 6px;
}

.cf-field label {
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink3);
}

.cf-field input,
.cf-field textarea {
  width: 100%; padding: 13px 16px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: var(--r-md);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem; color: var(--ink);
  outline: none; resize: vertical;
  transition: border-color 0.18s, box-shadow 0.18s;
  -webkit-appearance: none;
}
.cf-field input::placeholder,
.cf-field textarea::placeholder { color: var(--ink3); }

.cf-field input:focus,
.cf-field textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(200,184,154,0.18);
}

.cf-error input,
.cf-error textarea {
  border-color: #e05252;
  box-shadow: 0 0 0 3px rgba(224,82,82,0.08);
}

.cf-err-msg {
  font-size: 0.76rem; color: #e05252; font-weight: 500;
}

.cf-footer {
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
}

.cf-submit {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 13px 30px;
  background: var(--ink); color: var(--white);
  border: none; border-radius: 99px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem; font-weight: 500; letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: transform 0.2s var(--espring), box-shadow 0.2s, opacity 0.2s;
}
.cf-submit:hover:not(:disabled) {
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.22);
}
.cf-submit:active:not(:disabled) { transform: translateY(0); }
.cf-submit:disabled { opacity: 0.65; }

.cf-note {
  font-size: 0.75rem; color: var(--ink3);
  line-height: 1.5; font-style: italic;
}
.cf-note a { color: var(--ink2); text-decoration: underline; }

.contact-success {
  display: flex; align-items: center; gap: 16px;
  padding: 24px; background: var(--bg);
  border: 1.5px solid rgba(74,222,128,0.35);
  border-radius: var(--r-lg);
  color: var(--ink2); font-size: 0.95rem;
}
.contact-success svg { flex-shrink: 0; color: #4ade80; }
```

- [ ] **Step 2: Replace footer CSS block in globals.css**

Find `/* FOOTER */` section and replace:

```css
/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
.footer {
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 40px 80px;
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 20px;
}

.footer-name {
  font-family: 'DM Serif Display', serif;
  font-style: italic; font-size: 1.35rem;
  color: var(--ink); letter-spacing: -0.01em;
}

.footer-links {
  display: flex; align-items: center; gap: 20px;
}

.footer-link {
  display: flex; align-items: center; gap: 8px;
  color: var(--ink2); text-decoration: none;
  font-size: 0.82rem; font-weight: 500; letter-spacing: 0.02em;
  transition: color 0.18s, transform 0.18s var(--espring);
}
.footer-link:hover { color: var(--ink); transform: translateY(-2px); }
.footer-link img { opacity: 0.5; transition: opacity 0.18s; }
.footer-link:hover img { opacity: 0.9; }

.footer-copy {
  font-size: 0.76rem; color: var(--ink3);
  letter-spacing: 0.03em;
}
```

- [ ] **Step 3: Update mobile contact + footer in `@media (max-width: 768px)`**

Find and replace:

```css
/* Contact */
.contacts { padding: 64px 0 0; }
.contacts-header { padding: 0 24px; }
.contact-form-wrap { padding: 0 24px 64px; max-width: 100%; }
.cf-row { grid-template-columns: 1fr; }

/* Footer */
.footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; gap: 24px; }
```

- [ ] **Step 4: Update tablet contact in `@media (min-width: 769px) and (max-width: 1024px)`**

Find and replace:

```css
.contacts-header { padding: 0 48px; }
.contact-form-wrap { padding: 0 48px 80px; }
.footer { padding: 36px 48px; }
```

- [ ] **Step 5: Verify in browser**

Contact: field labels more prominent (uppercase, gold focus ring on inputs). Footer: warm bg instead of dark ink, social links show image icons without white inversion filter.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: refined contact form and warm footer"
```

---

## Task 7: Blog CSS Alignment

**Files:**
- Modify: `src/app/globals.css` — blog section

- [ ] **Step 1: Update blog header CSS**

Find `.blog-header` and replace:

```css
.blog-header {
  position: sticky; top: 0; z-index: 200;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
  background: rgba(242,237,230,0.9);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border-bottom: 1px solid var(--border);
}
```

- [ ] **Step 2: Update blog page background**

Find `.blog-page` and replace:

```css
.blog-page {
  min-height: 100vh;
  background: var(--bg);
  font-family: 'DM Sans', sans-serif;
}
```

- [ ] **Step 3: Update blog card CSS**

Find `.blog-card {` and replace through `.blog-card:hover`:

```css
.blog-card {
  display: flex; flex-direction: column;
  background: var(--surface); border-radius: var(--r-lg);
  border: 1px solid var(--border);
  overflow: hidden; text-decoration: none;
  box-shadow: var(--s1);
  transition: transform 0.35s var(--espring), box-shadow 0.35s;
}
.blog-card:hover { transform: translateY(-6px); box-shadow: var(--s3); }
```

- [ ] **Step 4: Verify blog page in browser**

Navigate to http://localhost:3000/blog. Header background should match main site warm tone. Blog cards should have subtle shadow.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "style: align blog pages with updated design tokens"
```

---

## Success Checklist

Before calling this complete, verify each item:

- [ ] Navbar floats as pill with frosted glass — visible gap between nav and viewport edge
- [ ] Hero shows split layout (text left, photo right) on desktop
- [ ] Hero collapses to single column on mobile with photo on top
- [ ] "View Work" CTA scrolls to Projects section
- [ ] "Get in touch" CTA scrolls to Contact section
- [ ] Medium-zoom still fires on `.zoomable` project screenshot images
- [ ] Contact form opens Gmail compose / mail app as before
- [ ] Scroll progress bar visible on scroll (gold→ink gradient)
- [ ] Blog page renders with correct warm background
- [ ] Mobile hamburger menu opens and nav items scroll correctly
- [ ] No console errors in browser dev tools

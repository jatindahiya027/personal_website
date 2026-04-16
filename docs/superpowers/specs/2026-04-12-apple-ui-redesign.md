# Apple-Style UI Redesign — Design Spec
Date: 2026-04-12

## Summary

Elevate the portfolio's visual quality to Apple-level polish while preserving all existing functionality and data. No changes to `portfolio.js`, blog data, routing, animations logic, or component behaviour. Pure visual upgrade across ~6 files.

---

## Design Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Color palette | Elevated Warm (#F2EDE6 / #EAE4DB) | Keep identity, refine tokens |
| Typography | DM Serif Display + DM Sans (keep) | Editorial feel, already distinctive |
| Accent | Warm Gold (#C8B89A) | Organic, matches warm palette |
| Hero layout | Split — text left, photo right | Apple product page pattern |

---

## Architecture

No new components. No new dependencies. Touches:

1. `src/app/globals.css` — primary target, all visual tokens + section styles
2. `src/app/components/HeroSection.js` — split layout restructure
3. `src/app/components/Navbar.js` — floating pill shape
4. `src/app/components/SkillsSection.js` — card sizing / grid tweaks
5. `src/app/components/ProjectsSection.js` — name labels on pill cards
6. `src/app/blog/page.js` + `src/app/blog/[slug]/BlogPostClient.js` — match new design tokens

`portfolio.js`, `leftflex.js`, animation logic, routing — **untouched**.

---

## Section-by-Section Spec

### Navbar
- Shape: floating pill (border-radius: 9999px), not full-width bar
- Position: sticky, top: 12px, horizontal padding 28px from viewport edge via wrapper
- Background: `rgba(242,237,230,0.88)`, `backdrop-filter: blur(28px) saturate(1.8)`
- Border: `1px solid rgba(255,255,255,0.55)`
- Shadow: `0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)`
- Height: 52px (down from 64px)
- Logo: DM Serif Display, 1.05rem, unchanged
- Nav buttons: 6px/14px padding, 99px radius, same hover
- Resume button: unchanged style

### Hero
**Layout change** — `HeroSection.js` restructured:
- Container: `display: grid; grid-template-columns: 1fr auto` (left text, right photo)
- Min-height: `calc(100vh - 52px)`
- Left side (`.hero-left`): padding 72px 64px, flex-column justify-center
  - Eyebrow: `SYSTEMS ENGINEER · TCS` — uppercase, letter-spacing 0.18em, `var(--ink3)`, with 28px gold line before it
  - Name: DM Serif Display, `clamp(3.5rem, 6.5vw, 6rem)`, weight 400, letter-spacing -0.03em, line-height 0.92
    - First line normal, second line italic (`<em>` tag) in `var(--ink2)`
  - Tagline: DM Serif Display italic, 1.15rem, `var(--ink2)`, cycles via existing TypeCycle — keep as-is
  - CTAs: primary (ink bg, 12px/28px, 99px radius, shadow) + secondary (border only)
  - Availability badge: bottom of left column, glass pill — keep existing markup/animation
- Right side (`.hero-right`): photo fills height, `object-fit: cover, object-position: top center`
  - Width: `min(42vw, 520px)`
  - Dot-grid canvas stays, rings stay — positioned behind photo
  - Bottom gradient fade on right panel (blends into page)
- Desktop scroll cue: keep, centered under left column
- Mobile (`≤768px`): collapse to single column, photo on top (current mobile layout preserved)

### Profile
- CSS-only changes
- Section padding: `96px 80px`
- `.h1heading` / `.section-label` — increase weight of label line (gold `::before`)
- `.meimage` border-radius: `var(--r-xl)` → `40px` top-left/right, sharper feel
- Info rows: increase row gap to 28px, border color slightly lighter

### Skills
- CSS-only changes
- `.Skills` background: keep `var(--bg2)`
- `.cont` (skill card): width/height → `136px / 144px`, border-radius `var(--r-md)`
- Add `transition: transform 0.2s, box-shadow 0.2s` for CSS-based lift (JS tilt retained on top)
- Card shadow on hover: `var(--s2)`

### Projects Overview
- CSS-only changes for existing pill cards
- Add project name label below each pill (`.proj-name` class, DM Serif Display 0.9rem)
  - Requires 1-line JSX change in `ProjectsSection.js` to render `{project.name}` under `.projimage`
- `.projimage` hover transition: keep existing spring border-radius morph

### Project Header Banner
- CSS-only
- Number font-size: slightly reduced `clamp(5rem, 10vw, 9rem)` → cleaner proportion
- Stroke weight: `2px` → `1.5px` rgba(26,25,22,0.18) — subtler
- Banner `border-radius: var(--r-xl)` added (currently no radius)

### Project Summary
- CSS-only
- `.proj-summary` padding increase to `64px 80px`
- Summary images: border-radius `var(--r-md)`, shadow `var(--s2)` on hover

### Contact
- CSS-only
- `.cf-field label` → uppercase, letter-spacing 0.08em, `var(--ink3)`, 0.72rem — matching section-label style
- Input focus ring: `border-color: var(--accent); box-shadow: 0 0 0 3px rgba(200,184,154,0.18)`
- Submit button: same primary CTA style as hero (99px radius, ink bg, shadow)

### Footer
- CSS-only
- Add `border-radius: var(--r-xl)` and `border: 1px solid var(--border)` — matches card style
- Background: `var(--bg2)`
- Layout: 3-col flex space-between (name | social links | copyright)

### Blog Pages
- CSS token alignment only — match `--bg`, `--ink`, `--accent` usage
- Blog header: same floating-pill style as main navbar
- Blog cards: border-radius → `var(--r-lg)`, shadow → `var(--s2)`
- No layout restructuring

---

## What Does NOT Change

- All animation logic (Framer Motion, TypeCycle, TypeOnce, dot-grid canvas, rings)
- Custom cursor
- Medium-zoom
- Scroll progress bar
- All data (`portfolio.js`, `blogs.js`, blog post files)
- Routing (`/blog`, `/blog/[slug]`, privacy page)
- Responsive breakpoints (768px / 1024px thresholds kept)
- Mobile layouts (collapsed hero, mobile menu, hamburger)
- Contact form logic (mailto / Gmail compose)

---

## Files Changed

| File | Change type |
|---|---|
| `src/app/globals.css` | Major CSS rewrite |
| `src/app/components/HeroSection.js` | JSX restructure (split layout) |
| `src/app/components/Navbar.js` | CSS class update (pill shape) |
| `src/app/components/ProjectsSection.js` | 1-line JSX: add name label |
| `src/app/blog/page.js` | CSS class alignment |
| `src/app/blog/[slug]/BlogPostClient.js` | CSS class alignment |

---

## Success Criteria

1. Hero shows split layout on desktop, collapses correctly on mobile
2. Navbar floats as pill, glass effect visible
3. All existing scroll-to navigation works
4. Medium-zoom still fires on project images
5. Contact form opens Gmail / mail app as before
6. Blog pages render with matching visual tokens
7. No console errors introduced

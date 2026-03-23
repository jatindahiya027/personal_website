# Portfolio Enhancements

## 🚀 Performance
- **Self-hosted font**: Removed `<link href='https://fonts.googleapis.com/...'/>` from `page.js` 
  and the `cdnjs` animate.css link from `layout.js`. 
  `next/font/google` now downloads Inter at **build time** and serves it from your own domain — 
  zero external font request at runtime → faster first paint.
- **Static export**: `next.config.mjs` sets `output: "export"` so `npm run build` produces 
  a fully static `/out` folder ready for GitHub Pages.

## ✨ Micro-interactions & Animations
- **Navbar**: Sticky with frosted-glass blur + animated underline sweep on hover for each item.
  Items fade-in with staggered delay on load.
- **Hero image**: Subtle scale-up entry animation.
- **Globe pill**: Slides in from right, globe rotates 180° on hover, pill scales gently.
- **Skill cards**: 3D perspective tilt tracking mouse position on hover (neumorphic inset shadow).
- **Project images**: Border-radius morphs from pill to rectangle on hover + lift + shadow.
- **Tech stack tags**: Individual hover — float up + invert colors (bg becomes dark).
- **Profile photo**: Border-radius morphs + lifts + casts shadow on hover.
- **Mobile menu**: AnimatePresence fade-slide-down open/close animation.
- **Section headings**: Short accent underline via CSS `::after`.
- **Progress bar**: Already present, kept and polished.

## 📄 PDF Download
- A "Download Resume" button is placed in the **Profile section**.
- It links to `/public/resume.pdf` — **add your resume PDF there** with the filename `resume.pdf`.
- Styled as a pill button with download-arrow icon, hover lift + shadow animation, active press state.

## 🌐 Deployment to GitHub Pages
1. `npm run build` → generates `/out` folder
2. Push `/out` contents (or configure GitHub Actions to run build + deploy)
3. Set GitHub Pages source to the `gh-pages` branch or `/out` folder

## Files changed
- `src/app/layout.js` — removed external CDN links
- `src/app/page.js` — removed inline Google Fonts `<link>` tag
- `src/app/globals.css` — enhanced with CSS variables, new animations, PDF button styles
- `src/app/leftflex.js` — new SkillCard 3D tilt, DownloadResumeBtn, AnimatePresence menu, cleaned up structure
- `next.config.mjs` — static export config

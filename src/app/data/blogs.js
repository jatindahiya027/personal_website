/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  BLOG INDEX — register new posts here                        ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * HOW TO ADD A NEW POST:
 *   1. Create a new file in  src/app/data/blog-posts/<your-slug>.js
 *      (copy any existing post file as a template)
 *   2. Import it below and add it to the BLOGS array (newest first)
 *   3. Run  npm run build  — done!
 *
 * The slug in the filename must match the slug field in the post object.
 */

import electronPost     from "./blog-posts/building-electron-apps-that-dont-suck";
import scrapingPost     from "./blog-posts/nextjs-web-scraping-price-tracker";
import cssPost          from "./blog-posts/css-tricks-i-wish-i-knew-earlier";
import sqlitePost       from "./blog-posts/sqlite-for-side-projects";
import careerPost       from "./blog-posts/from-intern-to-engineer-first-year";
import reactPost        from "./blog-posts/react-patterns-i-use-daily";

/** All posts — newest first */
export const BLOGS = [
  electronPost,
  scrapingPost,
  cssPost,
  sqlitePost,
  careerPost,
  reactPost,
];

/** Sorted newest-first (BLOGS array should already be ordered, but belt-and-suspenders) */
export const getAllBlogs = () =>
  [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date));

/** Get a single post by slug */
export const getBlogBySlug = (slug) =>
  BLOGS.find(b => b.slug === slug) ?? null;

/** All slugs — used by Next.js generateStaticParams for static export */
export const getAllSlugs = () =>
  BLOGS.map(b => ({ slug: b.slug }));

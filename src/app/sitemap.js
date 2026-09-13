import { getAllBlogs } from "./data/blogs";
import { PROJECTS, PERSONAL } from "./data/portfolio";

export default function sitemap() {
  const base = PERSONAL.website.replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog/`, changeFrequency: "monthly", priority: 0.7 },
    ...PROJECTS.map((project) => ({
      url: `${base}/work/${project.id}/`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...getAllBlogs().map((post) => ({
      url: `${base}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}

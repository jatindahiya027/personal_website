/**
 * Server component — handles generateStaticParams and metadata.
 * Renders the client component which handles interactivity.
 */
import { getBlogBySlug, getAllSlugs } from "../../data/blogs";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

/* Tells Next.js which slugs to pre-render at build time (required for static export) */
export function generateStaticParams() {
  return getAllSlugs();
}

export function generateMetadata({ params }) {
  const post = getBlogBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    alternates: { canonical: `/blog/${post.slug}/` },
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  // Pass post data + all posts (for related) down to the client component
  return <BlogPostClient post={post} />;
}

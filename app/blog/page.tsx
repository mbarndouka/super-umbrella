import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./blog.css";

// Sample blog post data - in a real application, you would fetch this from an API
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt:
      "Learn the basics of Next.js and how to create a modern React application with server-side rendering.",
    date: "May 2, 2025",
    author: "Mbarndouka",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    readTime: "5 min read",
    imageUrl: "/blog-placeholder-1.jpg",
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layouts",
    excerpt:
      "Discover how to create complex and responsive layouts using CSS Grid without any frameworks.",
    date: "April 15, 2025",
    author: "Mbarndouka",
    category: "CSS",
    tags: ["CSS", "Web Design", "Responsive"],
    readTime: "7 min read",
    imageUrl: "/blog-placeholder-2.jpg",
  },
  {
    id: 3,
    title: "TypeScript Best Practices for React",
    excerpt:
      "Improve your React code quality with these TypeScript tips and patterns recommended by experts.",
    date: "March 28, 2025",
    author: "Mbarndouka",
    category: "TypeScript",
    tags: ["TypeScript", "React", "Best Practices"],
    readTime: "9 min read",
    imageUrl: "/blog-placeholder-3.jpg",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt:
      "Learn why accessibility matters and how to implement it in your web projects from the ground up.",
    date: "February 14, 2025",
    author: "Mbarndouka",
    category: "Accessibility",
    tags: ["a11y", "Web", "UX"],
    readTime: "6 min read",
    imageUrl: "/blog-placeholder-4.jpg",
  },
];

export default function Blog() {
  return (
    <section className="blog section">
      <h2 className="section__title">Blog</h2>
      <span className="section__subtitle">Recent Articles</span>

      <div className="blog__container container">
        <div className="blog__filters">
          <span className="blog__filter active">All</span>
          <span className="blog__filter">Web Development</span>
          <span className="blog__filter">CSS</span>
          <span className="blog__filter">TypeScript</span>
          <span className="blog__filter">Accessibility</span>
        </div>

        <div className="blog__posts">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog__post">
              <div className="blog__post-img">
                <span className="blog__category">{post.category}</span>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400}
                  height={200}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="blog__post-content">
                <div className="blog__post-meta">
                  <span className="blog__post-date">{post.date}</span>
                  <span className="blog__post-read-time">{post.readTime}</span>
                </div>

                <h3 className="blog__post-title">{post.title}</h3>
                <p className="blog__post-excerpt">{post.excerpt}</p>

                <div className="blog__post-footer">
                  <Link href={`/blog/${post.id}`} className="blog__post-link">
                    Read More{" "}
                    <ArrowRight size={18} className="blog__post-icon" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog-data';
import './blog.css';

/**
 * Blog listing page with ISR (Incremental Static Regeneration)
 * Revalidates every 60 seconds to pick up new content
 */
export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Blog() {
  const blogPosts = await getBlogPosts();
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
                  priority={post.id <= 2} // Priority for first 2 posts
                  loading={post.id > 2 ? 'lazy' : undefined}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
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
                    Read More{' '}
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

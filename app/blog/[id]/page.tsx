import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Twitter,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { getBlogPost, getBlogPostIds } from '@/lib/blog-data';
import '../blog.css';
import './blogpost.css';

/**
 * Generate static params for all blog posts at build time
 * This enables Static Site Generation (SSG) with ISR
 */
export async function generateStaticParams() {
  const ids = getBlogPostIds();
  return ids.map((id) => ({
    id: id.toString(),
  }));
}

/**
 * Enable ISR - revalidate every 60 seconds
 */
export const revalidate = 60;

/**
 * Generate metadata for each blog post (SEO optimization)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(parseInt(id));

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Mbarndouka Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          alt: post.title,
        },
      ],
    },
  };
}

/**
 * Blog post page - Server Component with SSG + ISR
 */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <article className="blog-post section">
      <div className="blog-post__container container">
        <Link href="/blog" className="back-to-blog">
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        <div className="blog-post__header">
          <span className="blog-post__category">{post.category}</span>
          <h1 className="blog-post__title">{post.title}</h1>

          <div className="blog-post__meta">
            <div className="blog-post__author-date">
              <span className="blog-post__author">By {post.author}</span>
              <span className="blog-post__date">{post.date}</span>
              <span className="blog-post__read-time">{post.readTime}</span>
            </div>

            <div className="blog-post__tags">
              {post.tags.map((tag: string) => (
                <span key={tag} className="blog-post__tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="blog-post__featured-image">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            priority
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '1rem',
            }}
          />
        </div>

        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="blog-post__footer">
          <div className="blog-post__share">
            <span>Share this article:</span>
            <div className="blog-post__social">
              <a href="#" aria-label="Share on Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Share on Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Share on LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="blog-post__navigation">
            {post.id > 1 && (
              <Link href={`/blog/${post.id - 1}`} className="blog-post__prev">
                <ArrowLeft size={20} /> Previous Article
              </Link>
            )}

            {post.id < 4 && (
              <Link href={`/blog/${post.id + 1}`} className="blog-post__next">
                Next Article <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

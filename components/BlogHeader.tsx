import React from "react";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <div className="blog-nav">
      <div className="blog-nav-container">
        <div className="blog-logo">
          <Link href="/blog" className="blog-home-link">
            My<span>Blog</span>
          </Link>
        </div>

        <div className="blog-categories">
          <Link href="/blog?category=all" className="category-link active">
            All
          </Link>
          <Link href="/blog?category=development" className="category-link">
            Development
          </Link>
          <Link href="/blog?category=react" className="category-link">
            React
          </Link>
          <Link href="/blog?category=design" className="category-link">
            Design
          </Link>
        </div>

        <div className="blog-search">
          <input type="text" placeholder="Search articles..." />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .blog-nav {
          background: white;
          padding: 1.25rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .blog-nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .blog-logo {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .blog-home-link {
          text-decoration: none;
          color: #111827;
        }

        .blog-home-link span {
          color: #3b82f6;
        }

        .blog-categories {
          display: flex;
          gap: 1.5rem;
        }

        .category-link {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          padding-bottom: 0.25rem;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .category-link:hover,
        .category-link.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .blog-search {
          position: relative;
          width: 250px;
        }

        .blog-search input {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 50px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .blog-search input:focus {
          border-color: #3b82f6;
        }

        .blog-search button {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 2.5rem;
          background: transparent;
          border: none;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-search button:hover {
          color: #3b82f6;
        }

        @media (max-width: 800px) {
          .blog-nav-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .blog-search {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

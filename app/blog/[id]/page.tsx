"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import "../blog.css";
import "./blogpost.css";

// Define BlogPost interface to properly type the blog post data
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
  content: string;
}

// This would come from a database or API in a real application
const blogPosts: BlogPost[] = [
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
    content: `
      <p>Next.js has emerged as one of the most popular React frameworks for building modern web applications. With its intuitive approach to routing, server-side rendering, and static site generation, it provides developers with a powerful toolset to create fast, SEO-friendly websites.</p>
      
      <h3>Why Choose Next.js?</h3>
      
      <p>There are several reasons why developers are increasingly turning to Next.js for their web development projects:</p>
      
      <ul>
        <li><strong>Server-side Rendering (SSR)</strong>: Next.js can render React components on the server before sending them to the client, which improves loading performance and SEO.</li>
        <li><strong>Static Site Generation (SSG)</strong>: Pages can be generated at build time, resulting in extremely fast page loads.</li>
        <li><strong>Incremental Static Regeneration (ISR)</strong>: This allows you to update static content after deployment without rebuilding the entire site.</li>
        <li><strong>File-based Routing</strong>: Next.js uses a file-system based router, which makes creating new routes as simple as adding files to your project.</li>
        <li><strong>API Routes</strong>: You can create API endpoints as part of your Next.js application without setting up a separate server.</li>
      </ul>
      
      <h3>Getting Started with Next.js</h3>
      
      <p>To create a new Next.js project, you can use the following command:</p>
      
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This will set up a new Next.js project with everything you need to get started. Once the installation is complete, you can navigate to your project directory and start the development server:</p>
      
      <pre><code>cd my-next-app
npm run dev</code></pre>
      
      <p>Your application will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>
      
      <h3>Creating Your First Page</h3>
      
      <p>In Next.js, creating a new page is as simple as adding a file to the <code>pages</code> directory (or <code>app</code> directory if you're using the newer App Router). For example, to create an about page, you can create a file at <code>pages/about.js</code> with the following content:</p>
      
      <pre><code>export default function About() {
  return (
    &lt;div&gt;
      &lt;h1&gt;About Us&lt;/h1&gt;
      &lt;p&gt;This is the about page of our website.&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <p>This page will be accessible at <a href="http://localhost:3000/about">http://localhost:3000/about</a>.</p>
      
      <h3>Conclusion</h3>
      
      <p>Next.js provides an excellent development experience for building React applications. Its feature set is designed to help you create production-ready applications with minimal configuration. Whether you're building a simple blog or a complex web application, Next.js provides the tools you need to succeed.</p>
    `,
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
    content: `
      <p>CSS Grid Layout is a powerful tool for creating two-dimensional layouts on the web. If you're still relying heavily on flexbox or older techniques like floats, it's time to explore the capabilities of CSS Grid.</p>
      
      <h3>The Basics of CSS Grid</h3>
      
      <p>To create a grid layout, you first need to set the display property of a container element to "grid":</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
      
      <p>This creates a three-column grid where each column takes up an equal fraction of the available space, with 20px gaps between grid items.</p>
      
      <h3>Creating Complex Layouts</h3>
      
      <p>One of the most powerful features of CSS Grid is the ability to create complex layouts with minimal HTML. For example, you can create a layout where some items span multiple columns or rows:</p>
      
      <pre><code>.item1 {
  grid-column: 1 / 3; /* Spans columns 1 and 2 */
  grid-row: 1; /* In the first row */
}

.item2 {
  grid-column: 3; /* In column 3 */
  grid-row: 1 / 3; /* Spans rows 1 and 2 */
}</code></pre>
      
      <h3>Responsive Grid Layouts</h3>
      
      <p>CSS Grid makes it easy to create responsive layouts without media queries using the minmax() function:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}</code></pre>
      
      <p>This creates a grid with as many columns as can fit in the container, where each column is at least 300px wide and expands to fill the available space.</p>
      
      <h3>Grid Areas for Named Template Areas</h3>
      
      <p>Another powerful feature of CSS Grid is the ability to name areas of your grid and place items accordingly:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 200px 1fr 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>
      
      <p>This creates a layout with a header and footer that span the full width, and a sidebar next to a main content area.</p>
      
      <h3>Conclusion</h3>
      
      <p>CSS Grid Layout is a game-changer for web developers. It provides a level of control and flexibility that was previously difficult to achieve without complex CSS or JavaScript. By incorporating CSS Grid into your workflow, you can create sophisticated layouts with cleaner, more semantic HTML.</p>
    `,
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
    content: `
      <p>TypeScript has become the standard for many React developers, offering type safety that helps catch errors at compile time rather than runtime. Here are some best practices for using TypeScript with React effectively.</p>
      
      <h3>Proper Component Typing</h3>
      
      <p>When creating React components with TypeScript, you should properly type your props. Here's an example of a typed functional component:</p>
      
      <pre><code>interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={\`button button--\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};</code></pre>
      
      <h3>Use Discriminated Unions for Complex State</h3>
      
      <p>For components with complex state management, discriminated unions can provide type safety for different states:</p>
      
      <pre><code>type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: User[] };
type ErrorState = { status: 'error'; error: string };

type State = LoadingState | SuccessState | ErrorState;

function UserList() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    fetchUsers()
      .then(users => setState({ status: 'success', data: users }))
      .catch(error => setState({ status: 'error', error: error.message }));
  }, []);

  if (state.status === 'loading') {
    return <Spinner />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error} />;
  }

  return (
    <ul>
      {state.data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}</code></pre>
      
      <h3>Use Utility Types</h3>
      
      <p>TypeScript provides several utility types that can make your code more DRY and expressive:</p>
      
      <pre><code>// Make all properties optional
type PartialUser = Partial<User>;

// Pick only certain properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit certain properties
type PublicUser = Omit<User, 'password' | 'token'>;

// Extract types from a property
type UserId = User['id'];</code></pre>
      
      <h3>Type Custom Hooks</h3>
      
      <p>Custom hooks should be typed properly to ensure that they're used correctly:</p>
      
      <pre><code>function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}</code></pre>
      
      <h3>Conclusion</h3>
      
      <p>Using TypeScript with React can greatly improve the developer experience and code quality of your applications. By following these best practices, you can leverage TypeScript's type system to catch errors early, improve code readability, and make refactoring easier.</p>
    `,
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
    content: `
      <p>Web accessibility is about ensuring that websites and web applications are usable by everyone, including people with disabilities. This isn't just a nice-to-have feature—it's essential for creating inclusive digital experiences and is often a legal requirement.</p>
      
      <h3>Why Accessibility Matters</h3>
      
      <p>There are several reasons why accessibility should be a priority in web development:</p>
      
      <ul>
        <li><strong>Inclusivity</strong>: Accessible websites allow everyone to access information and services, regardless of their abilities.</li>
        <li><strong>Legal Compliance</strong>: Many countries have laws requiring digital accessibility, such as the ADA in the United States or the EAA in Europe.</li>
        <li><strong>Better UX for Everyone</strong>: Many accessibility features improve the user experience for all users, not just those with disabilities.</li>
        <li><strong>SEO Benefits</strong>: Accessible sites often rank better in search engines because they're more easily parsed by crawlers.</li>
      </ul>
      
      <h3>Key Accessibility Principles</h3>
      
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content accessible. They're organized around four principles:</p>
      
      <ol>
        <li><strong>Perceivable</strong>: Information and user interface components must be presentable to users in ways they can perceive.</li>
        <li><strong>Operable</strong>: User interface components and navigation must be operable.</li>
        <li><strong>Understandable</strong>: Information and the operation of the user interface must be understandable.</li>
        <li><strong>Robust</strong>: Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.</li>
      </ol>
      
      <h3>Practical Accessibility Tips</h3>
      
      <h4>Semantic HTML</h4>
      
      <p>Use semantic HTML elements that accurately describe the content they contain:</p>
      
      <pre><code><!-- Bad -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Good -->
<header>
  <nav>...</nav>
</header></code></pre>
      
      <h4>Keyboard Navigation</h4>
      
      <p>Ensure that all interactive elements are keyboard accessible and that focus states are visible:</p>
      
      <pre><code>/* Ensure focus states are visible */
:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}</code></pre>
      
      <h4>ARIA When Necessary</h4>
      
      <p>Use ARIA (Accessible Rich Internet Applications) attributes to enhance accessibility when native HTML can't provide enough semantic information:</p>
      
      <pre><code><button aria-expanded="false" aria-controls="dropdown-menu">
  Menu
</button>
<ul id="dropdown-menu" aria-hidden="true">
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
</ul></code></pre>
      
      <h4>Color Contrast</h4>
      
      <p>Ensure sufficient color contrast between text and background colors. For normal text, the WCAG 2.1 AA standard requires a contrast ratio of at least 4.5:1.</p>
      
      <h3>Conclusion</h3>
      
      <p>Building accessible web applications is not just about compliance—it's about creating an inclusive web that works for everyone. By incorporating accessibility considerations from the beginning of your project, you can create experiences that are better for all users while avoiding costly retrofitting down the line.</p>
    `,
  },
];

export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    const foundPost = blogPosts.find((p) => p.id === parseInt(params.id)) ?? null;
    setPost(foundPost);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="blog-post-loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-error">
        <h2>Article Not Found</h2>
        <p>Sorry, we couldn't find the article you're looking for.</p>
        <Link href="/blog" className="back-to-blog">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem",
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

            {post.id < blogPosts.length && (
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

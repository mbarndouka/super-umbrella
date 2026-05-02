import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { blogPostSchema } from '@/lib/validation';

// ---------------------------------------------------------------------------
// Extended schema — base blogPostSchema only has title, content, excerpt?, tags?
// We add the remaining DB-required fields here so the base file stays generic.
// ---------------------------------------------------------------------------
const createBlogPostSchema = blogPostSchema.extend({
  // Make excerpt required at the API level (DB column is non-nullable)
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  date: z.string().min(1, 'Date is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  readTime: z.string().min(1, 'Read time is required'),
  imageUrl: z.string().url('Invalid image URL'),
  tags: z.array(z.string()).optional().default([]),
});

// ---------------------------------------------------------------------------
// GET /api/blog  — fetch all posts with tags, newest first
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: posts });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/blog  — create a new blog post  (protected)
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate body
    const body = await request.json();
    const parsed = createBlogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const {
      title,
      excerpt,
      content,
      date,
      author,
      category,
      readTime,
      imageUrl,
      tags,
    } = parsed.data;

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        date,
        author,
        category,
        readTime,
        imageUrl,
        tags: {
          // Re-use existing tag rows by name; create them if they don't exist yet
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

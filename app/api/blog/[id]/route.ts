import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { blogPostSchema } from '@/lib/validation';

// ---------------------------------------------------------------------------
// Extended + partial schema for updates.
// All fields are optional so callers can send only what changed (PUT/PATCH).
// ---------------------------------------------------------------------------
const updateBlogPostSchema = blogPostSchema
  .extend({
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
    date: z.string().min(1, 'Date is required'),
    author: z.string().min(1, 'Author is required'),
    category: z.string().min(1, 'Category is required'),
    readTime: z.string().min(1, 'Read time is required'),
    imageUrl: z.string().url('Invalid image URL'),
    tags: z.array(z.string()).optional().default([]),
  })
  .partial(); // every field becomes optional for a non-destructive update

// ---------------------------------------------------------------------------
// GET /api/blog/[id]  — fetch one post with tags
// ---------------------------------------------------------------------------
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id: parseInt(id, 10) },
      include: { tags: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PUT /api/blog/[id]  — update a blog post  (protected)
// Tags are fully replaced: clear existing with `set: []` then reconnect.
// ---------------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Validate body
    const body = await request.json();
    const parsed = updateBlogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Separate tags from the rest of the scalar fields
    const { tags, ...scalarFields } = parsed.data;

    const updated = await prisma.blogPost.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...scalarFields,
        tags: {
          // Wipe the current tag list, then re-apply the incoming one
          set: [],
          connectOrCreate: (tags ?? []).map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/blog/[id]  — delete a blog post  (protected)
// ---------------------------------------------------------------------------
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  detailedDescription: z.string().optional(),
  image: z.string().min(1, 'Image is required'),
  category: z.string().min(1, 'Category is required'),
  demoUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
});

// ---------------------------------------------------------------------------
// GET /api/projects — fetch all projects with their tags
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: projects });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[GET /api/projects]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/projects — create a new project (protected)
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse & validate body
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      title,
      description,
      detailedDescription,
      image,
      category,
      demoUrl,
      codeUrl,
      featured,
      tags,
    } = parsed.data;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        detailedDescription,
        image,
        category,
        demoUrl,
        codeUrl,
        featured,
        tags: {
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[POST /api/projects]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

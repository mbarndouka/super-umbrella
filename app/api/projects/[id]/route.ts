import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  detailedDescription: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  demoUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// ---------------------------------------------------------------------------
// Route context type (Next.js 15+ async params)
// ---------------------------------------------------------------------------
type RouteContext = { params: Promise<{ id: string }> };

// ---------------------------------------------------------------------------
// GET /api/projects/[id] — fetch one project with tags
// ---------------------------------------------------------------------------
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { tags: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ data: project });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[GET /api/projects/[id]]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PUT /api/projects/[id] — update a project (protected)
// ---------------------------------------------------------------------------
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });
    }

    // Parse & validate body
    const body = await request.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tags, ...rest } = parsed.data;

    // Build the tag update payload only when tags are provided
    const tagsUpdate =
      tags !== undefined
        ? {
            // Disconnect all existing tags then re-connect/create supplied ones
            set: [],
            connectOrCreate: tags.map((name) => ({
              where: { name },
              create: { name },
            })),
          }
        : undefined;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...rest,
        ...(tagsUpdate !== undefined ? { tags: tagsUpdate } : {}),
      },
      include: { tags: true },
    });

    return NextResponse.json({ data: project });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[PUT /api/projects/[id]]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/projects/[id] — delete a project (protected)
// ---------------------------------------------------------------------------
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });
    }

    await prisma.project.delete({ where: { id: projectId } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[DELETE /api/projects/[id]]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

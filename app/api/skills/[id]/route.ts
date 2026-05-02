import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/skills/[id] — fetch one skill category with its nested skills
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const skillCategory = await prisma.skillCategory.findUnique({
      where: { id },
      include: { skills: true },
    });

    if (!skillCategory) {
      return NextResponse.json(
        { error: 'Skill category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: skillCategory });
  } catch (error) {
    console.error('GET /api/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill category' },
      { status: 500 }
    );
  }
}

// PUT /api/skills/[id] — replace title and/or skills for a skill category (protected)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      skills,
    }: { title?: string; skills?: { name: string; level: string }[] } = body;

    // Build the update payload; only include fields that were provided
    const updateData: {
      title?: string;
      skills?: { deleteMany: object; createMany: { data: { name: string; level: string }[] } };
    } = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (skills !== undefined) {
      // Wipe all existing skills for this category then re-create them
      updateData.skills = {
        deleteMany: {},
        createMany: { data: skills },
      };
    }

    const updated = await prisma.skillCategory.update({
      where: { id },
      data: updateData,
      include: { skills: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT /api/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill category' },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] — delete a skill category (cascades to skills via schema) (protected)
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.skillCategory.delete({ where: { id } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('DELETE /api/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill category' },
      { status: 500 }
    );
  }
}

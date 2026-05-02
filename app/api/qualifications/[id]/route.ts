import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/qualifications/[id] — fetch one qualification by id
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    const qualification = await prisma.qualification.findUnique({
      where: { id: numericId },
    });

    if (!qualification) {
      return NextResponse.json(
        { error: 'Qualification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: qualification });
  } catch (error) {
    console.error('GET /api/qualifications/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch qualification' },
      { status: 500 }
    );
  }
}

// PUT /api/qualifications/[id] — update a qualification (protected)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const numericId = parseInt(id, 10);
    const body = await request.json();

    const {
      type,
      title,
      subtitle,
      date,
      isLeft,
    }: {
      type?: 'education' | 'experience';
      title?: string;
      subtitle?: string;
      date?: string;
      isLeft?: boolean;
    } = body;

    // Build the update payload from only the fields that were supplied
    const updateData: {
      type?: string;
      title?: string;
      subtitle?: string;
      date?: string;
      isLeft?: boolean;
    } = {};

    if (type !== undefined) updateData.type = type;
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (date !== undefined) updateData.date = date;
    if (isLeft !== undefined) updateData.isLeft = isLeft;

    const updated = await prisma.qualification.update({
      where: { id: numericId },
      data: updateData,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT /api/qualifications/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update qualification' },
      { status: 500 }
    );
  }
}

// DELETE /api/qualifications/[id] — delete a qualification (protected)
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const numericId = parseInt(id, 10);

    await prisma.qualification.delete({ where: { id: numericId } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('DELETE /api/qualifications/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete qualification' },
      { status: 500 }
    );
  }
}

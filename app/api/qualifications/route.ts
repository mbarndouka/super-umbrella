import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/qualifications — fetch all qualifications ordered by type then id
export async function GET() {
  try {
    const qualifications = await prisma.qualification.findMany({
      orderBy: [{ type: 'asc' }, { id: 'asc' }],
    });

    return NextResponse.json({ data: qualifications });
  } catch (error) {
    console.error('GET /api/qualifications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch qualifications' },
      { status: 500 }
    );
  }
}

// POST /api/qualifications — create a new qualification (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      type,
      title,
      subtitle,
      date,
      isLeft,
    }: {
      type: 'education' | 'experience';
      title: string;
      subtitle: string;
      date: string;
      isLeft?: boolean;
    } = body;

    const qualification = await prisma.qualification.create({
      data: {
        type,
        title,
        subtitle,
        date,
        // Prisma schema defaults isLeft to true; only override when explicitly provided
        ...(isLeft !== undefined && { isLeft }),
      },
    });

    return NextResponse.json({ data: qualification }, { status: 201 });
  } catch (error) {
    console.error('POST /api/qualifications error:', error);
    return NextResponse.json(
      { error: 'Failed to create qualification' },
      { status: 500 }
    );
  }
}

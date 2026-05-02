import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/skills — fetch all skill categories with their nested skills
export async function GET() {
  try {
    const skillCategories = await prisma.skillCategory.findMany({
      include: { skills: true },
    });

    return NextResponse.json({ data: skillCategories });
  } catch (error) {
    console.error('GET /api/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill categories' },
      { status: 500 }
    );
  }
}

// POST /api/skills — create a new skill category with nested skills (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      title,
      skills,
    }: { id: string; title: string; skills: { name: string; level: string }[] } =
      body;

    const skillCategory = await prisma.skillCategory.create({
      data: {
        id,
        title,
        skills: {
          create: skills ?? [],
        },
      },
      include: { skills: true },
    });

    return NextResponse.json({ data: skillCategory }, { status: 201 });
  } catch (error) {
    console.error('POST /api/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to create skill category' },
      { status: 500 }
    );
  }
}

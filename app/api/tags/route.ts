import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ---------------------------------------------------------------------------
// GET /api/tags — return all tags sorted alphabetically by name
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ data: tags });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('[GET /api/tags]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

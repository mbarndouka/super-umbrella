import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { contactSchema } from '@/lib/validation';
import { withRateLimit } from '@/lib/rateLimit';

// ---------------------------------------------------------------------------
// Extended schema — base contactSchema has name, email, message.
// We add the optional subject field that exists in the ContactMessage model.
// ---------------------------------------------------------------------------
const createContactSchema = contactSchema.extend({
  subject: z.string().max(200, 'Subject too long').optional(),
});

// ---------------------------------------------------------------------------
// POST /api/contact  — save a contact message  (PUBLIC, rate-limited)
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  return withRateLimit(
    request,
    async () => {
      try {
        const body = await request.json();
        const parsed = createContactSchema.safeParse(body);
        if (!parsed.success) {
          return NextResponse.json(
            { error: parsed.error.flatten().fieldErrors },
            { status: 400 },
          );
        }

        const { name, email, subject, message } = parsed.data;

        await prisma.contactMessage.create({
          data: { name, email, subject, message },
        });

        return NextResponse.json(
          { message: 'Message sent successfully' },
          { status: 201 },
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
      }
    },
    { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  );
}

// ---------------------------------------------------------------------------
// GET /api/contact  — fetch all messages for admin  (protected)
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: messages });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

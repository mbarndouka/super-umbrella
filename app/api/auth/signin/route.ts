import { NextRequest, NextResponse } from 'next/server';
import { signInSchema } from '@/lib/validation';
import { createClient } from '@/lib/supabase';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ZodIssue } from 'zod';
import { withRateLimit } from '@/lib/rateLimit';
import { env } from '@/lib/env';

async function handler(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = signInSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues.map((issue: ZodIssue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Initialize Supabase client
    const supabase = createClient();

    // Attempt sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token for additional security layer
    const token = jwt.sign(
      {
        userId: data.user.id,
        email: data.user.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      },
      env.jwt.secret
    );

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sign in successful',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/auth/signin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, () => handler(request), {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  });
}

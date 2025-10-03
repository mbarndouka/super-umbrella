import { NextRequest, NextResponse } from 'next/server';
import { signUpSchema } from '@/lib/validation';
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
    const validationResult = signUpSchema.safeParse(body);
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

    // Attempt sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    // Check if user was created but needs email confirmation
    if (!data.user || !data.session) {
      return NextResponse.json(
        {
          success: true,
          message: 'Account created. Please check your email for confirmation.',
          requiresConfirmation: true,
        },
        { status: 201 }
      );
    }

    // Create JWT token for immediate session
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
        message: 'Account created successfully',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/auth/signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, () => handler(request), {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour for signup (more restrictive)
  });
}

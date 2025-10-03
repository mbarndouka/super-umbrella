'use client';
import React from 'react';
import Link from 'next/link';
import { AuthCard, SignUpForm } from '@/components/auth';

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/signin" className="terms-link">
            Sign in instead
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}

import React from 'react';
import { Metadata } from 'next';
import './auth-layout.css';

export const metadata: Metadata = {
  title: 'Authentication | Portfolio',
  description: 'Sign in to your account',
  robots: 'noindex, nofollow', // This prevents search engines from indexing this page
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="auth-container">{children}</div>
    </div>
  );
}

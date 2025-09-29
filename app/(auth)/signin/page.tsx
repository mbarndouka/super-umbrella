"use client";
import React from "react";
import Link from "next/link";
import { AuthCard, SignInForm } from "@/components/auth";

export default function SignInPage() {
  return (
    <AuthCard
      title="Sign in to your account"
      subtitle={
        <>
          Or{" "}
          <Link href="/signup" className="terms-link">
            create a new account
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthCard>
  );
}

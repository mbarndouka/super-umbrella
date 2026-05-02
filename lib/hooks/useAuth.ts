'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const { data: session, isPending: loading, error } = authClient.useSession();

  const logout = async () => {
    await authClient.signOut();
    router.push('/signin');
    router.refresh();
  };

  const redirectToSignIn = () => {
    router.push('/signin');
  };

  return {
    user: session?.user ?? null,
    session,
    loading,
    isAuthenticated: !!session,
    error,
    logout,
    redirectToSignIn,
  };
}

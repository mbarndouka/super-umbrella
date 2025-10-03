'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

/**
 * Custom hook for authentication with SSR safety
 * Handles localStorage access safely and provides loading states
 */
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Load user data from localStorage
      const userData = localStorage.getItem('user');
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/signin');
  };

  const redirectToSignIn = () => {
    router.push('/signin');
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    redirectToSignIn,
  };
}

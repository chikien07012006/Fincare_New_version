"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Check for authentication token only on the client side
    const isAuthenticated = localStorage.getItem('authToken');
    console.log('Authentication Token:', isAuthenticated);

    if (!isAuthenticated) {
      // If no token, redirect to the login page
      router.push('/login');
    }
  }, [router]); // router is a dependency for useEffect

  // Render children only if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;

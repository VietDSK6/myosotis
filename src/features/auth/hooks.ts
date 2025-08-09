// features/auth/hooks.ts
import { useEffect } from 'react';
import { useAuthStore } from './store';

/**
 * Hook to check and restore auth state on app initialization
 * For now, just checks if we have persisted auth state (no token validation)
 */
export function useAuthInitialization() {
  const { user, isAuthenticated, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      // Since we don't have tokens yet, just check if user is persisted
      if (user && isAuthenticated) {
        setLoading(false);
      } else {
        // Clear any invalid auth state
        useAuthStore.setState({
          user: null,
          loginData: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, [user, isAuthenticated, setLoading]);
}

/**
 * Hook for authentication-related operations
 */
export function useAuth() {
  const auth = useAuthStore();

  return {
    ...auth,
    isLoggedIn: auth.isAuthenticated && !!auth.user,
  };
}

/**
 * Hook to require authentication for protected routes
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading && (isAuthenticated ? !!user : true),
  };
}

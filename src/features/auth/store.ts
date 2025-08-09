// features/auth/store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthActions, LoginPayload, RegisterPayload, User } from './types';
import { loginUser, registerUser, logoutUser } from './api';

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      loginData: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (payload: LoginPayload) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await loginUser(payload);
          
          // For now, create a simplified user object from login response
          const user: User = {
            id: response.user_id,
            email: response.email,
            created_at: new Date().toISOString(),
            profile: {
              id: response.user_id,
              user_id: response.user_id,
              full_name: response.full_name,
              created_at: new Date().toISOString(),
            }
          };
          
          set({
            user,
            loginData: response,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Đăng nhập thất bại';
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      register: async (payload: RegisterPayload) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await registerUser(payload);
          
          // Create user object from register response
          const user: User = {
            id: response.id,
            email: response.email,
            phone: response.phone,
            created_at: response.created_at,
            updated_at: response.updated_at,
            profile: response.profile,
            emergency_contacts: response.emergency_contacts,
          };
          
          set({
            user,
            loginData: null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Đăng ký thất bại';
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await logoutUser();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear state
          set({
            user: null,
            loginData: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        loginData: state.loginData,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

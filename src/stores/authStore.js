import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../lib/api/client';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, role) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post('/auth/login', { email, role });
          const { user, token } = response.data;
          
          // Legacy support (temporarily keep localStorage for older components)
          localStorage.setItem('ant_user', JSON.stringify(user));
          localStorage.setItem('ant_auth_token', token);

          set({ user, token, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          console.error("Login failed", error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('ant_user');
        localStorage.removeItem('ant_auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      // Dev-only feature to switch roles instantly
      switchRole: (newRole) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, role: newRole };
          localStorage.setItem('ant_user', JSON.stringify(updatedUser));
          return { user: updatedUser };
        });
      }
    }),
    {
      name: 'ant-auth-storage', // key in local storage
    }
  )
);

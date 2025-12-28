import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          // Will be called from API service
          set({ loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
        localStorage.removeItem('token');
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          // Will be called from API service
          set({ loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateProfile: (profile) => {
        set((state) => ({
          user: { ...state.user, profile }
        }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
);

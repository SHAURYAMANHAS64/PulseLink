import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore.js';
import { authService } from '../services/authService.js';

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, setToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (token && !user) {
        try {
          setLoading(true);
          const profile = await authService.getProfile();
          setUser(profile);
        } catch (error) {
          console.error('Failed to load user:', error);
          logout();
        } finally {
          setLoading(false);
        }
      }
    };
    loadUser();
  }, [token, user, setUser, logout]);

  return { user, token, isAuthenticated: !!token, loading };
};

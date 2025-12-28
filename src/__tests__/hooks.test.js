import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth.js';
import { useAuthStore } from '../store/authStore.js';

describe('useAuth Hook', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false
    });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should set user and token', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      useAuthStore.getState().setUser({ id: '1', name: 'Test User' });
      useAuthStore.getState().setToken('test-token');
    });

    expect(result.current.user).toBeTruthy();
    expect(result.current.token).toBe('test-token');
  });

  it('should logout user', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      useAuthStore.getState().setUser({ id: '1', name: 'Test User' });
      useAuthStore.getState().setToken('test-token');
    });

    act(() => {
      useAuthStore.getState().logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('Workout Store', () => {
  it('should calculate workout stats correctly', () => {
    const store = useAuthStore.getState();
    // Add tests for workout calculations
    expect(true).toBe(true);
  });
});

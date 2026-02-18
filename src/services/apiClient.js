// Mock API client for frontend-only mode.
// Returns sample data for GraphQL queries and mock responses for REST endpoints.

import { useAuthStore } from '../store/authStore.js';
const API_OFFLINE = true;

const sampleExercises = [
  {
    id: 'ex_1',
    name: 'Push Ups',
    description: 'Standard push ups',
    category: 'strength',
    difficulty: 'beginner',
    duration: 60,
    videoUrl: '',
    rating: 4.5
  },
  {
    id: 'ex_2',
    name: 'Squats',
    description: 'Bodyweight squats',
    category: 'strength',
    difficulty: 'beginner',
    duration: 45,
    videoUrl: '',
    rating: 4.7
  }
];

const mockGraphQL = async (query, variables) => {
  // naive pattern matching to return expected shapes
  if (query.includes('getExercises')) {
    return { data: { getExercises: sampleExercises } };
  }
  if (query.includes('getExerciseById')) {
    const id = variables?.id;
    return { data: { getExerciseById: sampleExercises.find((e) => e.id === id) || sampleExercises[0] } };
  }
  if (query.includes('searchExercises')) {
    const q = variables?.query?.toLowerCase() || '';
    const items = sampleExercises.filter((e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    return { data: { searchExercises: items } };
  }
  if (query.includes('getWorkoutPlans')) {
    return { data: { getWorkoutPlans: [] } };
  }
  if (query.includes('me')) {
    try {
      const token = useAuthStore.getState().token;
      if (!token) return { data: { me: null } };
      const payload = JSON.parse(atob(token));
      const user = useAuthStore.getState().user;
      return { data: { me: user || { id: payload.id, email: payload.email, name: payload.name || '' } } };
    } catch (e) {
      return { data: { me: null } };
    }
  }
  // default fallback
  return { data: {} };
};

const mockREST = async (url, data) => {
  if (url.includes('/api/payments/create-intent')) {
    return { data: { clientSecret: 'pi_mock_secret' } };
  }
  if (url.includes('/api/payments/subscribe')) {
    return { data: { success: true, subscriptionId: 'sub_mock_123' } };
  }
  if (url.includes('/api/payments/subscription')) {
    return { data: { status: 'free' } };
  }
  if (url.includes('/api/payments/cancel')) {
    return { data: { success: true } };
  }
  return { data: {} };
};

const apiClient = {
  post: async (url, body) => {
    if (API_OFFLINE) {
      if (url === '/graphql') {
        const result = await mockGraphQL(body.query, body.variables);
        return { data: { data: result.data } };
      }
      // REST endpoints
      const result = await mockREST(url, body);
      return { data: result };
    }
    // In online mode this could be wired to axios/fetch, but offline-first for now.
    throw new Error('Online mode not implemented in mock client');
  },
  get: async (url) => {
    if (API_OFFLINE) {
      const result = await mockREST(url, null);
      return { data: result };
    }
    throw new Error('Online mode not implemented in mock client');
  }
};

export default apiClient;

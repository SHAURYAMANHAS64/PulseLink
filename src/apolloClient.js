// Mock Apollo client - no backend connection required
// This file exists for compatibility but the app uses mock services instead

const mockClient = {
  query: async () => ({ data: {} }),
  mutate: async () => ({ data: {} }),
  watchQuery: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
};

export default mockClient;

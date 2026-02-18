// Mock monitoring service - Sentry removed for React 19 compatibility
// Add your own monitoring solution here if needed

const mockSentry = {
  init: () => {},
  captureException: (error) => console.error('Error captured:', error),
  captureMessage: (message) => console.log('Message captured:', message),
  setUser: () => {},
  setTag: () => {},
  withScope: (callback) => callback({ setTag: () => {}, setExtra: () => {} }),
};

export default mockSentry;

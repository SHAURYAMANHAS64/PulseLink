import apiClient from './apiClient.js';

export const workoutService = {
  getWorkoutPlans: async (userId) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query getWorkoutPlans($userId: ID!) {
            getWorkoutPlans(userId: $userId) {
              id
              name
              description
              difficulty
              goal
              duration
              isPublic
              followers
            }
          }
        `,
        variables: { userId }
      });
      return response.data.data.getWorkoutPlans;
    } catch (error) {
      throw new Error('Failed to fetch workout plans');
    }
  },

  createWorkoutPlan: async (planData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation createWorkoutPlan(
            $name: String!
            $description: String
            $exercises: [ID]
            $difficulty: String
            $goal: String
          ) {
            createWorkoutPlan(
              name: $name
              description: $description
              exercises: $exercises
              difficulty: $difficulty
              goal: $goal
            ) {
              id
              name
              description
              difficulty
              goal
            }
          }
        `,
        variables: planData
      });
      return response.data.data.createWorkoutPlan;
    } catch (error) {
      throw new Error('Failed to create workout plan');
    }
  }
};

import apiClient from './apiClient.js';

export const exerciseService = {
  getExercises: async (category, difficulty, limit = 20) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query getExercises($category: String, $difficulty: String, $limit: Int) {
            getExercises(category: $category, difficulty: $difficulty, limit: $limit) {
              id
              name
              description
              category
              difficulty
              duration
              videoUrl
              rating
            }
          }
        `,
        variables: { category, difficulty, limit }
      });
      return response.data.data.getExercises;
    } catch (error) {
      throw new Error('Failed to fetch exercises');
    }
  },

  getExerciseById: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query getExerciseById($id: ID!) {
            getExerciseById(id: $id) {
              id
              name
              description
              category
              difficulty
              duration
              videoUrl
              instructions
              rating
            }
          }
        `,
        variables: { id }
      });
      return response.data.data.getExerciseById;
    } catch (error) {
      throw new Error('Failed to fetch exercise');
    }
  },

  searchExercises: async (query) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query searchExercises($query: String!) {
            searchExercises(query: $query) {
              id
              name
              description
              category
              difficulty
              duration
              rating
            }
          }
        `,
        variables: { query }
      });
      return response.data.data.searchExercises;
    } catch (error) {
      throw new Error('Search failed');
    }
  },

  rateExercise: async (exerciseId, rating) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation rateExercise($exerciseId: ID!, $rating: Int!) {
            rateExercise(exerciseId: $exerciseId, rating: $rating) {
              id
              rating
            }
          }
        `,
        variables: { exerciseId, rating }
      });
      return response.data.data.rateExercise;
    } catch (error) {
      throw new Error('Failed to rate exercise');
    }
  }
};

import apiClient from './apiClient.js';

export const authService = {
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation register($name: String!, $email: String!, $password: String!) {
            register(name: $name, email: $email, password: $password) {
              success
              token
              user {
                id
                name
                email
                role
              }
              message
            }
          }
        `,
        variables: { name, email, password }
      });
      return response.data.data.register;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              success
              token
              user {
                id
                name
                email
                role
              }
              message
            }
          }
        `,
        variables: { email, password }
      });
      return response.data.data.login;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  getProfile: async () => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query {
            me {
              id
              name
              email
              role
              profile {
                age
                height
                weight
                fitnessLevel
                goals
                bio
              }
            }
          }
        `
      });
      return response.data.data.me;
    } catch (error) {
      throw new Error('Failed to fetch profile');
    }
  },

  updateProfile: async (profile) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation updateProfile($age: Int, $height: Int, $weight: Int, $fitnessLevel: String) {
            updateProfile(age: $age, height: $height, weight: $weight, fitnessLevel: $fitnessLevel) {
              id
              profile {
                age
                height
                weight
                fitnessLevel
              }
            }
          }
        `,
        variables: profile
      });
      return response.data.data.updateProfile;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }
};

// Local mock auth service to allow frontend usage without a running backend.
// Stores users in localStorage under 'mock_users' and session token under 'mock_token'.

const USERS_KEY = 'mock_users';
const TOKEN_KEY = 'mock_token';

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const makeToken = (user) => {
  // Very small, non-secure token for local development only
  return btoa(JSON.stringify({ id: user.id, email: user.email, ts: Date.now() }));
};

export const authService = {
  register: async (name, email, password) => {
    const users = readUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }

    const user = {
      id: `u_${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      password, // stored in plain text for the mock (dev only)
      role: 'user',
      profile: null
    };
    users.push(user);
    writeUsers(users);

    const token = makeToken(user);
    localStorage.setItem(TOKEN_KEY, token);

    return {
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      message: 'Registered (mock)'
    };
  },

  login: async (email, password) => {
    const users = readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = makeToken(user);
    localStorage.setItem(TOKEN_KEY, token);

    return {
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      message: 'Logged in (mock)'
    };
  },

  getProfile: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error('Not authenticated');
    try {
      const payload = JSON.parse(atob(token));
      const users = readUsers();
      const user = users.find((u) => u.id === payload.id || u.email === payload.email);
      if (!user) throw new Error('User not found');
      return { id: user.id, name: user.name, email: user.email, role: user.role, profile: user.profile };
    } catch (e) {
      throw new Error('Failed to fetch profile');
    }
  },

  updateProfile: async (profile) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error('Not authenticated');
    try {
      const payload = JSON.parse(atob(token));
      const users = readUsers();
      const idx = users.findIndex((u) => u.id === payload.id || u.email === payload.email);
      if (idx === -1) throw new Error('User not found');
      users[idx].profile = { ...users[idx].profile, ...profile };
      writeUsers(users);
      return users[idx];
    } catch (e) {
      throw new Error('Failed to update profile');
    }
  }
};

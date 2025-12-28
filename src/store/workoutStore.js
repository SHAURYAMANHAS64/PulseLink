import { create } from 'zustand';

export const useWorkoutStore = create((set, get) => ({
  exercises: [],
  workoutPlans: [],
  currentWorkout: null,
  history: [],
  loading: false,
  error: null,

  setExercises: (exercises) => set({ exercises }),
  setWorkoutPlans: (plans) => set({ workoutPlans: plans }),
  setCurrentWorkout: (workout) => set({ currentWorkout: workout }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addToHistory: (workout) => set((state) => ({
    history: [workout, ...state.history]
  })),

  searchExercises: (query) => {
    const { exercises } = get();
    return exercises.filter(ex =>
      ex.name.toLowerCase().includes(query.toLowerCase()) ||
      ex.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  filterExercises: (category, difficulty) => {
    const { exercises } = get();
    return exercises.filter(ex => {
      if (category && ex.category !== category) return false;
      if (difficulty && ex.difficulty !== difficulty) return false;
      return true;
    });
  },

  getWorkoutStats: () => {
    const { history } = get();
    return {
      totalWorkouts: history.length,
      totalDuration: history.reduce((sum, w) => sum + (w.duration || 0), 0),
      totalCalories: history.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
      averageRating: history.length > 0 
        ? history.reduce((sum, w) => sum + (w.rating || 0), 0) / history.length 
        : 0
    };
  }
}));

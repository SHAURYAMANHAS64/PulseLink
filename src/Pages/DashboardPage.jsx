import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:5000/graphql';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({
    totalWorkouts: 42,
    totalMinutes: 1890,
    caloriesBurned: 18900,
    streak: 12
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setLoading(false);
    generateMockData();
  }, [navigate]);

  const generateMockData = () => {
    setWorkouts([
      { id: 1, name: 'Chest & Triceps', duration: 45, caloriesBurned: 320, createdAt: '2025-12-28' },
      { id: 2, name: 'Legs Day', duration: 60, caloriesBurned: 420, createdAt: '2025-12-27' },
      { id: 3, name: 'Back & Biceps', duration: 50, caloriesBurned: 380, createdAt: '2025-12-26' }
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-green-500/20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-500">💪 PulseLink</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-300">Welcome, {user?.name || 'User'}!</span>
            <Link to="/" className="text-gray-300 hover:text-green-500 transition">Home</Link>
            <Link to="/exercises" className="text-gray-300 hover:text-green-500 transition">Exercises</Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Welcome Back! 💪</h2>
          <p className="text-gray-400 text-lg">Keep crushing your fitness goals • {user?.email}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🏋️', label: 'Total Workouts', value: stats.totalWorkouts },
            { icon: '⏱️', label: 'Total Minutes', value: stats.totalMinutes },
            { icon: '🔥', label: 'Calories Burned', value: stats.caloriesBurned },
            { icon: '🔥', label: 'Current Streak', value: `${stats.streak} days` }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 border border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-green-500">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Workouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 border border-green-500/30 rounded-lg p-6 mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Recent Workouts</h3>
          {workouts.length > 0 ? (
            <div className="space-y-4">
              {workouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                  <div>
                    <h4 className="font-bold text-lg">{workout.name}</h4>
                    <p className="text-gray-400 text-sm">{workout.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-bold">{workout.duration} min</p>
                    <p className="text-gray-400">{workout.caloriesBurned} cal burned</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No workouts yet. Start your first workout!</p>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6">✨ Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">🤖 AI Workouts</h4>
              <p className="text-gray-300 text-sm">Personalized plans based on your fitness level</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/30 to-teal-600/30 border border-green-500/50 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">📊 Analytics</h4>
              <p className="text-gray-300 text-sm">Track progress with detailed metrics</p>
            </div>
            <div className="bg-gradient-to-br from-red-600/30 to-orange-600/30 border border-red-500/50 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">💪 Exercises</h4>
              <p className="text-gray-300 text-sm">Browse 100+ exercises with tutorials</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-12 justify-center flex-wrap">
          <Link
            to="/exercises"
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-lg transition"
          >
            Browse Exercises
          </Link>
          <Link
            to="/program"
            className="border-2 border-green-500 text-green-500 hover:bg-green-500/20 font-bold py-3 px-8 rounded-lg transition"
          >
            View Programs
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-500/20 mt-20 py-8 text-center text-gray-400">
        <p>PulseLink © 2025 - Your Fitness Journey Starts Here</p>
        <p className="text-sm mt-2">Backend: Express.js + GraphQL | Frontend: React + Zustand</p>
      </footer>
    </div>
  );
}

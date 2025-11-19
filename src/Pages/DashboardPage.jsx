import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../components/common/AppNavbar';
import WeeklyTracker from '../components/dashboard/WeeklyTracker';
import { motion } from 'framer-motion';

// Category item component
const CategoryItem = ({ name, icon }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
      <i className={`${icon} text-green-500`}></i>
    </div>
    <span className="text-lg capitalize">{name}</span>
  </div>
);

export default function DashboardPage() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const categories = [
        { name: "cardio", icon: "fas fa-running" },
        { name: "weightlifting", icon: "fas fa-dumbbell" },
        { name: "yoga", icon: "fas fa-pray" },
        { name: "pilates", icon: "fas fa-balance-scale" },
        { name: "crossfit", icon: "fas fa-fire" },
        { name: "hiit", icon: "fas fa-bolt" }
    ];

    useEffect(() => {
      try {
        const raw = localStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
      } catch (err) {
        console.error('Failed to read user from localStorage', err);
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    };

    return (
        <div className="bg-[#111827] text-white font-sans min-h-screen">
            <AppNavbar/>

            {/* small user bar */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300">Welcome, <span className="font-semibold text-green-400">{user.name}</span></span>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-transparent border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-700/40 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm text-gray-300 hover:text-white">Sign in</Link>
              )}
            </div>

            {/* Hero Section with Gradient Overlay */}
            <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
                <img 
                    src="/hero-gym.jpg" 
                    alt="Modern gym interior" 
                    className="absolute w-full h-full object-cover transform scale-105 filter brightness-75" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#111827]/90"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative text-center text-white max-w-4xl px-6 z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-800">
                        Elevate Your Fitness Journey
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Transform your life with personalized workouts designed for your success
                    </p>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">Workout Categories</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                </motion.div>

                {error && (
                    <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                            <h3 className="text-2xl font-semibold text-green-400">
                                Choose Your Training Style
                            </h3>
                            <Link 
                                to="/exercises" 
                                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center space-x-3"
                            >
                                <span>Explore Workouts</span>
                                <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map(category => (
                                <motion.div
                                    key={category.name}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link to={`/exercises?category=${category.name}`}>
                                        <CategoryItem name={category.name} icon={category.icon} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700/50 bg-gray-800/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400">
                            Customized programs for every fitness level
                        </p>
                        <span className="text-green-400 font-medium">
                            {categories.length} Specialized Categories Available
                        </span>
                    </div>
                </div>
            </section>

            <WeeklyTracker />
        </div>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#111827]/90 backdrop-blur-lg fixed top-0 left-0 w-full z-50 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="text-2xl font-bold hover:text-green-400 transition-colors">
            PulseLink
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/exercises" className="hover:text-green-400 transition-colors">Exercises</Link>
            <Link to="/programs" className="hover:text-green-400 transition-colors">Programs</Link>
            <Link to="/nutrition" className="hover:text-green-400 transition-colors">Nutrition</Link>
            <Link to="/community" className="hover:text-green-400 transition-colors">Community</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-green-400/10 hover:text-green-400 transition-all"
            aria-label="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <Link 
            to="/login"
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-green-400/10 hover:text-green-400 transition-all"
            aria-label="Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-green-400/10 hover:text-green-400 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-6 py-4 bg-[#1a2234] border-t border-gray-700">
          <div className="flex flex-col space-y-4">
            <Link to="/exercises" className="hover:text-green-400 transition-colors">Exercises</Link>
            <Link to="/programs" className="hover:text-green-400 transition-colors">Programs</Link>
            <Link to="/nutrition" className="hover:text-green-400 transition-colors">Nutrition</Link>
            <Link to="/community" className="hover:text-green-400 transition-colors">Community</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AppNavbar;

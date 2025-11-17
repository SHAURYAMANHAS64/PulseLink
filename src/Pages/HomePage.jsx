import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Icon = ({ className }) => <i className={className}></i>;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#111] text-gray-100 font-['Poppins']">
      {/* --- Header / Navbar --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111111]/90 backdrop-blur-lg shadow-lg py-4'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#hero" className="text-2xl font-bold">
            PulseLink
          </a>
          <nav>
            <ul className="flex items-center space-x-6">
              <li className="hidden md:block">
                <a href="#features" className="text-base font-semibold hover:text-[#00ff85] transition-colors">Features</a>
              </li>
              <li className="hidden md:block">
                <a href="#how-it-works" className="text-base font-semibold hover:text-[#00ff85] transition-colors">How It Works</a>
              </li>
              <li>
             <a href="/contact">Contact</a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-[#00ff85] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#00ff85] hover:text-black transition-all"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/gym.png')" }}
      >
        <motion.div 
          className="max-w-3xl px-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold leading-tight"
            variants={fadeIn}
          >
            ELEVATE YOUR <br />
            <span className="text-[#00ff85]">FITNESS JOURNEY</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Discover a wide range of workouts tailored to your fitness level and goals.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link
              to="/dashboard"
              className="mt-8 inline-block bg-[#00ff85] text-black font-bold py-3 px-8 rounded-md text-lg hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00ff85]/30 transition-all"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold"
              variants={fadeIn}
            >
              All The Tools You Need To Succeed
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              PulseLink is more than just workouts. It's your complete fitness companion.
            </motion.p>
            <motion.div 
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              <motion.div
                className="feature-card bg-[#222] p-8 rounded-xl border border-gray-700/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="fas fa-bullseye text-4xl text-[#00ff85] mb-4" />
                <h3 className="text-xl font-bold mb-2">Track Everything</h3>
                <p className="text-gray-400">Monitor your habits, workouts, weight, water intake, and streaks all in one place.</p>
              </motion.div>
              <motion.div
                className="feature-card bg-[#222] p-8 rounded-xl border border-gray-700/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="fas fa-utensils text-4xl text-[#00ff85] mb-4" />
                <h3 className="text-xl font-bold mb-2">Diet & Meal Planner</h3>
                <p className="text-gray-400">Get personalized diet plans based on your goals, whether you want to bulk, cut, or maintain.</p>
              </motion.div>
              <motion.div
                className="feature-card bg-[#222] p-8 rounded-xl border border-gray-700/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="fas fa-dumbbell text-4xl text-[#00ff85] mb-4" />
                <h3 className="text-xl font-bold mb-2">Vast Exercise Library</h3>
                <p className="text-gray-400">Filter exercises by muscle group, equipment, and difficulty for both gym and home workouts.</p>
              </motion.div>
              <motion.div
                className="feature-card bg-[#222] p-8 rounded-xl border border-gray-700/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="fas fa-trophy text-4xl text-[#00ff85] mb-4" />
                <h3 className="text-xl font-bold mb-2">Custom Challenges</h3>
                <p className="text-gray-400">Create and join challenges to stay motivated and push your limits with the community.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold"
              variants={fadeIn}
            >
              Get Started in 3 Simple Steps
            </motion.h2>
            <motion.div 
              className="mt-16 bg-[#222] p-10 rounded-xl flex flex-col md:flex-row justify-between gap-10"
              variants={staggerContainer}
            >
              <motion.div 
                className="flex-1"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 border-4 border-[#00ff85] rounded-full flex justify-center items-center mx-auto mb-6 text-2xl font-bold text-[#00ff85]">1</div>
                <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
                <p className="text-gray-400">Tell us if you're working out at the gym or at home to get exercises tailored to your environment.</p>
              </motion.div>
              <motion.div 
                className="flex-1"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 border-4 border-[#00ff85] rounded-full flex justify-center items-center mx-auto mb-6 text-2xl font-bold text-[#00ff85]">2</div>
                <h3 className="text-xl font-bold mb-2">Select Your Workout</h3>
                <p className="text-gray-400">Use our advanced filters to find the perfect exercise targeting specific muscles and goals.</p>
              </motion.div>
              <motion.div 
                className="flex-1"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 border-4 border-[#00ff85] rounded-full flex justify-center items-center mx-auto mb-6 text-2xl font-bold text-[#00ff85]">3</div>
                <h3 className="text-xl font-bold mb-2">Track & Conquer</h3>
                <p className="text-gray-400">Start the exercise timer, log your progress, and watch your stats grow on your personal dashboard.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* --- Personalization Section --- */}
      <section className="py-24 bg-[#222] text-center">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-4xl font-bold"
            variants={fadeIn}
          >
            Your Goal, Your Plan.
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-300"
            variants={fadeIn}
          >
            Input your height, weight, and fitness goal (bulk, cut, or maintain), and PulseLink will generate a tailored workout and diet suggestion. Our upcoming AI agent will provide instant, expert-level advice on demand.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link to="/login" className="mt-8 inline-block bg-[#00ff85] text-black font-bold py-3 px-8 rounded-md text-lg hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00ff85]/30 transition-all">
              Customize Your Plan
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-10 bg-[#0c0c0c] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center">
          <p className="text-gray-400 mb-4 sm:mb-0">&copy; 2025 PulseLink. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#00ff85] transition-colors"><Icon className="fab fa-twitter text-xl" /></a>
            <a href="#" className="text-gray-400 hover:text-[#00ff85] transition-colors"><Icon className="fab fa-instagram text-xl" /></a>
            <a href="#" className="text-gray-400 hover:text-[#00ff85] transition-colors"><Icon className="fab fa-facebook-f text-xl" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- AppNavbar Component (Included directly to ensure it works) ---
const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#111827]/90 backdrop-blur-lg fixed top-0 left-0 w-full z-50 py-4 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-green-400 transition-colors">
            PulseLink
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/exercises" className="text-gray-300 hover:text-green-400 transition-colors">Exercises</Link>
            <a href="/program" className="text-gray-300 hover:text-green-400 transition-colors">Programs</a>
            <a href="https://www.youtube.com/@DrEducationFITNESS/videos" target='_blank' rel="noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">Nutrition</a>
            <a href="https://www.youtube.com/@Hamza97" target='_blank' rel="noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">Community</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button 
            className="h-10 w-10 flex items-center justify-center rounded-full text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-all"
            aria-label="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* USER DISPLAY */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium hidden sm:block">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm border border-red-500/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-all"
              aria-label="Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-6 py-4 bg-[#1a2234] border-t border-gray-700 absolute w-full">
          <div className="flex flex-col space-y-4 text-center">
            <Link to="/exercises" className="text-gray-300 hover:text-green-400 py-2">Exercises</Link>
            <Link to="/programs" className="text-gray-300 hover:text-green-400 py-2">Programs</Link>
            <Link to="/nutrition" className="text-gray-300 hover:text-green-400 py-2">Nutrition</Link>
            <Link to="/community" className="text-gray-300 hover:text-green-400 py-2">Community</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

// --- Pricing Card Component ---
const PricingCard = ({ title, price, duration, features, isPopular, buttonText, buttonAction }) => (
  <div className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
    isPopular 
      ? 'bg-gray-800/80 border-green-500 shadow-xl shadow-green-500/10' 
      : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
  }`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
        Most Popular
      </div>
    )}
    
    <div className="mb-4">
      <h3 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        {duration && <span className="ml-1 text-xl text-gray-500">/{duration}</span>}
      </div>
      <p className="mt-2 text-sm text-gray-400">
        {title === 'Free' ? 'Forever free for everyone.' : `Billed ${duration === 'mo' ? 'monthly' : 'yearly'}. Cancel anytime.`}
      </p>
    </div>

    <ul className="flex-1 space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.included ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/50 text-gray-500'}`}>
            {feature.included ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <span className={`ml-3 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>

    <button 
      onClick={buttonAction}
      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
        isPopular
          ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/20'
          : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

// --- FAQ Item Component ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-none">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- Main Plans Page Component ---
export default function ProgramPage() {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Starter",
      price: "Free",
      duration: null,
      isPopular: false,
      buttonText: "Current Plan",
      buttonAction: () => {},
      features: [
        { text: "Access to 1000+ Exercises", included: true },
        { text: "Basic Workout Timer", included: true },
        { text: "Community Access", included: true },
        { text: "Personalized Workout Plans", included: false },
        { text: "Ad-Free Experience", included: false },
        { text: "Advanced Progress Analytics", included: false },
        { text: "AI Coach Assistance", included: false },
      ]
    },
    {
      title: "Pro",
      price: "$9.99",
      duration: "mo",
      isPopular: true,
      buttonText: "Get Pro",
      buttonAction: () => navigate('/checkout/pro'),
      features: [
        { text: "Access to 1000+ Exercises", included: true },
        { text: "Basic Workout Timer", included: true },
        { text: "Community Access", included: true },
        { text: "Personalized Workout Plans", included: true },
        { text: "Ad-Free Experience", included: true },
        { text: "Advanced Progress Analytics", included: true },
        { text: "AI Coach Assistance", included: false },
      ]
    },
    {
      title: "Elite",
      price: "$49.99",
      duration: "yr",
      isPopular: false,
      buttonText: "Go Elite",
      buttonAction: () => navigate('/checkout/elite'),
      features: [
        { text: "Access to 1000+ Exercises", included: true },
        { text: "Basic Workout Timer", included: true },
        { text: "Community Access", included: true },
        { text: "Personalized Workout Plans", included: true },
        { text: "Ad-Free Experience", included: true },
        { text: "Advanced Progress Analytics", included: true },
        { text: "AI Coach Assistance", included: true },
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
    },
    {
      question: "What is the AI Coach?",
      answer: "Our AI Coach analyzes your workout history, goals, and performance to generate real-time feedback and custom weekly schedules tailored specifically for your body type."
    },
    {
      question: "Do you offer a student discount?",
      answer: "Yes, we offer a 50% discount for students with a valid .edu email address. Contact support to apply."
    },
    {
      question: "Is there a trial period for Pro?",
      answer: "Absolutely. You can try PulseLink Pro free for 7 days. You won't be charged if you cancel before the trial ends."
    }
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen font-sans text-white">
      <AppNavbar />
      
      <main className="pt-24 pb-20 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-green-400 font-bold tracking-wide uppercase text-sm mb-4">Plans & Pricing</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Invest in your <span className="text-green-400">Health</span> today.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your fitness journey. Whether you're just starting out or crushing PRs, we have the tools you need.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-2 md:p-8">
            {faqs.map((faq, index) => (
              <FaqItem key={index} {...faq} />
            ))}
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a href="mailto:support@pulselink.com" className="text-green-400 font-semibold hover:underline">
            Contact our support team
          </a>
        </div>
      </main>
    </div>
  );
}
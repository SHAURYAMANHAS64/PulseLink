import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:5000/graphql';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2">
    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
  </div>
);

// Form Input Component
const FormInput = ({ label, type = 'text', value, onChange, id }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#00ff85] focus:outline-none text-white placeholder-gray-500 transition"
      placeholder={label}
    />
  </div>
);

// Password Strength Meter
const PasswordStrengthMeter = ({ password }) => {
  const strength = password.length > 8 ? (password.match(/[A-Z]/) && password.match(/[0-9]/) ? 3 : 2) : password.length > 0 ? 1 : 0;
  const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  return (
    <div className="mb-5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded ${i < strength ? colors[strength - 1] : 'bg-gray-700'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-1">{['Weak', 'Fair', 'Good', 'Strong'][strength] || 'Enter password'}</p>
    </div>
  );
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const mutation = `
        mutation {
          login(email: "${formData.loginEmail}", password: "${formData.loginPassword}") {
            success
            message
            token
            user { id, name, email, role }
          }
        }
      `;

      const response = await axios.post(API_URL, { query: mutation });

      if (response.data.errors) {
        setError(response.data.errors[0].message || 'Login failed');
      } else if (response.data.data?.login?.success) {
        const { token, user } = response.data.data.login;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError(response.data.data?.login?.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.message || 'Connection error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.signupPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const mutation = `
        mutation {
          register(name: "${formData.signupName}", email: "${formData.signupEmail}", password: "${formData.signupPassword}") {
            success
            message
            token
            user { id, name, email, role }
          }
        }
      `;

      const response = await axios.post(API_URL, { query: mutation });

      if (response.data.errors) {
        setError(response.data.errors[0].message || 'Registration failed');
      } else if (response.data.data?.register?.success) {
        const { token, user } = response.data.data.register;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError(response.data.data?.register?.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.message || 'Connection error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-['Poppins'] text-white bg-cover bg-center p-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/gym.png')"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider">PulseLink</h1>
          <p className="text-[#00ff85] text-sm mt-1">Elevate Your Fitness Journey</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="relative overflow-hidden h-auto">
          {/* Login Form */}
          <form
            onSubmit={handleLoginSubmit}
            className={`transition-all duration-500 ${
              isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute pointer-events-none'
            }`}
          >
            <FormInput
              id="loginEmail"
              label="Email Address"
              type="email"
              value={formData.loginEmail}
              onChange={handleInputChange}
            />
            <FormInput
              id="loginPassword"
              label="Password"
              type="password"
              value={formData.loginPassword}
              onChange={handleInputChange}
            />
            <div className="text-right -mt-4 mb-6">
              <a href="#" className="text-xs text-gray-400 hover:text-[#00ff85]">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3.5 bg-[#00ff85] text-black font-bold uppercase tracking-wider rounded-lg hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00ff85]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </form>

          {/* Signup Form */}
          <form
            onSubmit={handleSignupSubmit}
            className={`transition-all duration-500 ${
              !isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute pointer-events-none'
            }`}
          >
            <FormInput
              id="signupName"
              label="Full Name"
              value={formData.signupName}
              onChange={handleInputChange}
            />
            <FormInput
              id="signupEmail"
              label="Email Address"
              type="email"
              value={formData.signupEmail}
              onChange={handleInputChange}
            />
            <FormInput
              id="signupPassword"
              label="Password"
              type="password"
              value={formData.signupPassword}
              onChange={handleInputChange}
            />
            <PasswordStrengthMeter password={formData.signupPassword} />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3.5 bg-[#00ff85] text-black font-bold uppercase tracking-wider rounded-lg hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00ff85]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner /> : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Toggle Forms */}
        <div className="text-center mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-[#00ff85] hover:underline ml-2"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded p-4 text-sm text-blue-200"
        >
          <p className="font-bold mb-2">🔧 Backend Integration Active</p>
          <p>This login form connects to your Express.js backend running on port 5000.</p>
          <p className="mt-2">Make sure the backend is running on http://localhost:5000</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

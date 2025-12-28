import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { useUIStore } from '../store/uiStore.js';
import { authService } from '../services/authService.js';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormInput = ({ id, label, type = 'text', value, onChange, required = true, icon }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className="relative mb-6">
      {icon && (
        <span className="absolute left-4 top-4 text-gray-400">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <input
        type={isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type}
        id={id}
        value={value}
        onChange={onChange}
        className={`peer w-full p-3.5 ${icon ? 'pl-12' : ''} bg-gray-800 border-2 border-gray-700 rounded-lg text-white outline-none focus:border-green-500 transition-colors placeholder-transparent`}
        placeholder={label}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 px-1 bg-[#111] text-xs text-gray-400 transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
                   peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-green-500"
      >
        {label}
      </label>

      {isPasswordField && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-4 top-4 text-gray-400 hover:text-green-500 transition"
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </button>
      )}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null;

  const calculateStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const options = [
      { width: '20%', color: 'bg-red-500', text: 'Weak' },
      { width: '40%', color: 'bg-orange-500', text: 'Fair' },
      { width: '60%', color: 'bg-yellow-500', text: 'Good' },
      { width: '80%', color: 'bg-blue-500', text: 'Strong' },
      { width: '100%', color: 'bg-green-500', text: 'Excellent' }
    ];

    return options[score - 1] || { width: '0%', color: 'bg-gray-700', text: '' };
  };

  const { width, color, text } = calculateStrength();

  return (
    <div className="mb-4">
      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width }}></div>
      </div>
      <p className={`text-xs text-right mt-1 ${color.replace('bg-', 'text-')}`}>{text}</p>
    </div>
  );
};

export default function EnhancedLoginPage() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const { addNotification } = useUIStore();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(formData.loginEmail, formData.loginPassword);

      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        addNotification({
          type: 'success',
          message: 'Login successful! Welcome back.'
        });
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.signupPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(
        formData.signupName,
        formData.signupEmail,
        formData.signupPassword
      );

      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        addNotification({
          type: 'success',
          message: 'Registration successful! Let\'s start your fitness journey.'
        });
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#111] to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
              PulseLink
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Welcome back to your fitness journey' : 'Start your transformation today'}
            </p>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <FormInput
                id="signupName"
                label="Full Name"
                type="text"
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </form>
          )}

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 hover:text-green-400 font-semibold transition"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-300">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: demo@example.com</p>
              <p>Password: Demo123!@</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

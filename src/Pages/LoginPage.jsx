import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// A small component for the loading spinner
const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto"></div>
);

// A component for the floating label input fields for reusability
const FormInput = ({ id, label, type = 'text', value, onChange, required = true }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === 'password';
  
  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative mb-6">
      <input
        type={isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type}
        id={id}
        value={value}
        onChange={onChange}
        className="peer w-full p-3.5 bg-gray-800 border-2 border-gray-700 rounded-lg text-white outline-none focus:border-[#00ff85] transition-colors placeholder-transparent"
        placeholder={label}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 px-1 bg-[#111] text-xs text-gray-400 transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
                   peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#00ff85]"
      >
        {label}
      </label>
      {isPasswordField && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00ff85]"
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  );
};

// Component for the password strength indicator
const PasswordStrengthMeter = ({ password }) => {
    const calculateStrength = () => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        switch (score) {
            case 1: return { width: '20%', color: 'bg-red-500', text: 'Weak' };
            case 2: return { width: '40%', color: 'bg-orange-500', text: 'Fair' };
            case 3: return { width: '60%', color: 'bg-yellow-500', text: 'Good' };
            case 4: return { width: '80%', color: 'bg-blue-500', text: 'Strong' };
            case 5: return { width: '100%', color: 'bg-green-500', text: 'Excellent' };
            default: return { width: '0%', color: 'bg-gray-700', text: '' };
        }
    };

    if (!password) return null;

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

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the mount animation
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On success, redirect to the main app dashboard
      navigate('/dashboard');
    }, 2000);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if(formData.signupPassword !== formData.confirmPassword) {
      alert("Passwords do not match!"); // In a real app, use a proper toast notification
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created! Please sign in.");
      setIsLogin(true); // Switch to login form
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-['Poppins'] text-white bg-cover bg-center p-4"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/gym.png')" }}
    >
      <div
        className={`w-full max-w-md bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl transition-all duration-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider">PulseLink</h1>
          <p className="text-[#00ff85] text-sm mt-1">Elevate Your Fitness Journey</p>
        </div>

        <div className="relative overflow-hidden h-auto">
            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className={`transition-all duration-500 ease-in-out ${isLogin ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full absolute'}`}>
                 <FormInput id="loginEmail" label="Email Address" type="email" value={formData.loginEmail} onChange={handleInputChange} />
                 <FormInput id="loginPassword" label="Password" type="password" value={formData.loginPassword} onChange={handleInputChange} />
                <div className="text-right -mt-4 mb-6">
                    <a href="#" className="text-xs text-gray-400 hover:text-[#00ff85]">Forgot Password?</a>
                </div>
                 <button type="submit" disabled={isLoading} className="w-full p-3.5 bg-[#00ff85] text-black font-bold uppercase tracking-wider rounded-lg hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00ff85]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                     {isLoading ? <LoadingSpinner /> : 'Sign In'}
                 </button>
            </form>
            
            {/* Signup Form */}
            <form onSubmit={handleSignupSubmit} className={`transition-all duration-500 ease-in-out ${!isLogin ? 'opacity-100 transform-none' : 'opacity-0 translate-x-full absolute'}`}>
                <FormInput id="signupName" label="Full Name" value={formData.signupName} onChange={handleInputChange} />
                <FormInput id="signupEmail" label="Email Address" type="email" value={formData.signupEmail} onChange={handleInputChange} />
                <FormInput id="signupPassword" label="Password" type="password" value={formData.signupPassword} onChange={handleInputChange} />
                <PasswordStrengthMeter password={formData.signupPassword} />
                <FormInput id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
                <button type="submit" disabled={isLoading} className="w-full p-3.5 bg-[#00ff85] text-black font-bold uppercase tracking-wider rounded-lg hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00ff85]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoading ? <LoadingSpinner /> : 'Create Account'}
                </button>
            </form>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-[#00ff85] hover:underline ml-2 bg-transparent border-none">
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

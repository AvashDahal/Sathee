import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BasicInfoStep, SecurityStep } from '../components/BasinInfoStep';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    // Validate fields
    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
  
    if (!agreeTerms) {
      setError('You must accept the terms');
      setIsLoading(false);
      return;
    }
  
    try {
      const data = {
        fullName,
        email,
        password,
        confirmPassword,
        role: 'user'
      };
  
      console.log('Submitting data:', data);
  
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
  
      console.log('Response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
  
      // Show success message
      setSuccess(true);
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 second delay
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const nextStep = () => {
    // Check if required fields are filled
    if (!fullName || !email) {
      setError('Please fill in all fields');
      return;
    }
  
    setError('');
    setStep(2);
  };
  
  const prevStep = () => {
    setError('');
    setStep(1);
  };
  
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return '';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card shadow-xl py-8 px-6 md:px-10 bg-white/95 backdrop-blur-md"
        >
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-16 w-16 mx-auto"
              >
                <div className="relative h-16 w-16 mx-auto rounded-full overflow-hidden bg-blue-50">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-blue-500 to-orange-400 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex items-center justify-center h-full w-full bg-white rounded-full">
                    <img 
                      src="/sathee-logo.png" 
                      alt="Sathee Logo" 
                      className="h-full w-full object-contain p-1" 
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-gradient">Create Account</h2>
            <p className="mt-2 text-gray-600">Join us on your wellness journey</p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-green-800">Account Created Successfully!</h3>
                <p className="text-sm text-green-600 mt-1">Redirecting you to login...</p>
              </div>
            </motion.div>
          )}

          {/* Progress Steps (only show when not successful) */}
          {!success && (
            <div className="mb-8 relative">
              <div className="flex items-center justify-between">
                <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                    <span>1</span>
                  </div>
                  <span className="text-xs mt-1">Basic Info</span>
                </div>
                <div className={`w-full h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                    <span>2</span>
                  </div>
                  <span className="text-xs mt-1">Security</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form (only show when not successful) */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <BasicInfoStep 
                  fullName={fullName}
                  setFullName={setFullName}
                  email={email}
                  setEmail={setEmail}
                  nextStep={nextStep}
                />
              )}

              {step === 2 && (
                <SecurityStep 
                  password={password}
                  handlePasswordChange={handlePasswordChange}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  prevStep={prevStep}
                  isLoading={isLoading}
                  passwordStrength={passwordStrength}
                  getStrengthColor={getStrengthColor}
                  getStrengthText={getStrengthText}
                />
              )}
            </form>
          )}

          {/* Login link (only show when not successful) */}
          {!success && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
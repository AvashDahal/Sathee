// src/pages/Signup/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic here
      console.log('Signup attempted with:', { fullName, email, password, agreeTerms });
    }, 1500);
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  // Helper functions for password strength
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

          {/* Progress Steps */}
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

          {/* Form */}
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

          {/* Login link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
// src/pages/Signup/SignupSteps.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Basic Info Step Component
export const BasicInfoStep = ({ fullName, setFullName, email, setEmail, nextStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label htmlFor="fullName" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={nextStep}
          className="btn btn-primary w-full"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

// Security Step Component
export const SecurityStep = ({ 
  password, 
  handlePasswordChange, 
  confirmPassword, 
  setConfirmPassword, 
  agreeTerms, 
  setAgreeTerms, 
  prevStep, 
  isLoading,
  passwordStrength,
  getStrengthColor,
  getStrengthText
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={handlePasswordChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="••••••••"
          />
        </div>
        {/* Password strength indicator */}
        {password && (
          <div className="mt-2">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                style={{ width: `${passwordStrength * 25}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span>Password strength</span>
              <span className={
                passwordStrength === 0 ? 'text-gray-500' :
                passwordStrength === 1 ? 'text-red-500' : 
                passwordStrength === 2 ? 'text-orange-500' : 
                passwordStrength === 3 ? 'text-yellow-500' : 
                'text-green-500'
              }>{getStrengthText()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="confirmPassword" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-2">
        <button
          type="button"
          onClick={prevStep}
          className="w-1/3 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading || !agreeTerms || password !== confirmPassword}
          className="btn btn-primary w-2/3 flex justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </motion.div>
  );
};
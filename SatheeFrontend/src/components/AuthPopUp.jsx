import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 rounded-full overflow-hidden bg-blue-50 mb-4">
            <div className="flex items-center justify-center h-full w-full bg-white rounded-full">
              <img 
                src="/sathee-logo.png" 
                alt="Sathee Logo" 
                className="h-full w-full object-contain p-1" 
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2>
          <p className="mt-2 text-gray-600">Please log in to access the Sathee Companion</p>
        </div>
        
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 rounded-lg p-4"
          >
            <p className="text-blue-800">
              To get personalized support and track your conversations, please log in to your account.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/login" className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md"
              >
                Log In
              </motion.button>
            </Link>
            
            <Link to="/signup" className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 rounded-xl border border-blue-300 text-blue-600 font-medium bg-white shadow-sm"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium py-2"
          >
            Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPopup;
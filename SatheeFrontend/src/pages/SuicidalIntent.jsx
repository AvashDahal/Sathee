import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function MentalHealthCheckIn() {
  const [userInput, setUserInput] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple keyword-based risk detection
    const riskKeywords = ['suicide', 'die', 'kill', 'end it', 'no point'];
    const hasRisk = riskKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
    
    if (hasRisk) {
      setShowDialog(true);
    }
  };

  const handleDialogResponse = (response) => {
    setShowDialog(false);
    if (response === 'yes') {
      navigate('/chatbot', { state: { initialMessage: userInput } });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Share What's On Your Mind
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Your thoughts matter. This is a safe space to express yourself without judgment.
            We're here to listen and support you.
          </p>
        </div>
        
        <div className="card shadow-xl border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="relative">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700"
                placeholder="How are you feeling today? You can share anything..."
              />
              <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                {userInput.length > 0 && `${userInput.length} characters`}
              </div>
            </div>
            
            <motion.button 
              type="submit" 
              className="btn btn-primary w-full py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center">
                <span>Share Your Thoughts</span>
              </span>
            </motion.button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your privacy is important to us. All information shared is confidential.
          </p>
        </div>

        <AnimatePresence>
          {showDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl border-t border-blue-100"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    We're Here For You
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We notice you might be going through a difficult time. 
                    Would you like to connect with someone who can help?
                  </p>
                </div>
                <div className="flex flex-col space-y-3">
                  <motion.button
                    onClick={() => handleDialogResponse('yes')}
                    className="btn btn-primary py-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, I'd like support
                  </motion.button>
                  <motion.button
                    onClick={() => handleDialogResponse('no')}
                    className="btn bg-gray-100 text-gray-800 hover:bg-gray-200 py-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    No, I'll continue on my own
                  </motion.button>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">
                    Remember, you're never alone. Help is always available.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default MentalHealthCheckIn;
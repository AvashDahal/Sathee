import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function SuicidalIntent() {
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
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Share What's On Your Mind
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-40 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="How are you feeling today? You can share anything..."
          />
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>

        <AnimatePresence>
          {showDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">
                  We noticed signs of distress
                </h2>
                <p className="mb-6">Would you like to talk to someone?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDialogResponse('yes')}
                    className="btn btn-primary flex-1"
                  >
                    Yes, please
                  </button>
                  <button
                    onClick={() => handleDialogResponse('no')}
                    className="btn bg-gray-100 text-gray-800 hover:bg-gray-200 flex-1"
                  >
                    No, thanks
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SuicidalIntent;
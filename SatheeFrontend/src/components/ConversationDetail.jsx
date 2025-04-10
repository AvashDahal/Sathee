import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ConversationDetail({ 
  selectedConversation, 
  handleCloseConversation 
}) {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // If no conversation is selected, show empty state
  if (!selectedConversation) {
    return (
      <div className="w-2/3 bg-white flex flex-col">
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
          <p className="text-gray-500">Choose a chat from the list to view its contents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-2/3 bg-white flex flex-col">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{formatDate(selectedConversation.date)}</h3>
          <p className="text-sm text-gray-500">{selectedConversation.messages.length} messages</p>
        </div>
        <div className="flex space-x-2">
          <motion.button 
            className="text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCloseConversation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {selectedConversation.messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 self-end mb-1">
                <img 
                  src="/sathee-logo.png" 
                  alt="Sathee" 
                  className="logo" 
                  style={{ 
                    width: '1.5em', 
                    height: '1.5em', 
                    padding: '0.15em',
                    objectFit: 'contain'
                  }} 
                />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 shadow-md ${
                message.sender === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-bot'
              }`}
            >
              {message.text}
            </div>
            {message.sender === 'user' && (
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 self-end mb-1">
                <span className="text-white text-sm font-bold">You</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <Link to="/chatbot">
          <motion.button 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue this Conversation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default ConversationDetail;
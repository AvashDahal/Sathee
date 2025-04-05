import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function ChatbotPage() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const [processedMessages, setProcessedMessages] = useState(new Set());

  const botResponses = [
    "I understand this is difficult. Can you tell me more about what's troubling you?",
    "You're not alone in this. I'm here to listen and support you.",
    "It's brave of you to share these feelings. How long have you been feeling this way?",
    "Would you like to talk about what triggered these thoughts?",
    "Your feelings are valid. Have you considered speaking with a mental health professional?",
    "Remember, there are people who care about you and want to help.",
  ];

  // Initialize chat with welcome message only once
  useEffect(() => {
    if (location.state?.initialMessage) {
      handleInitialMessage(location.state.initialMessage);
    } else {
      // Only add welcome message if no messages exist yet
      if (messages.length === 0) {
        addBotMessage("Hi, I'm your Sathee. I'm here to listen and support you. How are you feeling today?");
      }
    }
  }, []);

  const handleInitialMessage = (message) => {
    const messageId = `user-${Date.now()}`;
    
    // Prevent duplicate processing of the initial message
    if (!processedMessages.has(messageId)) {
      setProcessedMessages(prev => new Set(prev).add(messageId));
      addMessage('user', message, messageId);
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Use a response from the array instead of hardcoding to avoid repetition
        const responseIndex = Math.floor(Math.random() * botResponses.length);
        addBotMessage(botResponses[responseIndex]);
      }, 1500);
    }
  };

  const addMessage = (sender, text, id = null) => {
    const messageId = id || `${sender}-${Date.now()}`;
    
    // Check if this exact message has already been processed
    if (!processedMessages.has(messageId)) {
      setProcessedMessages(prev => new Set(prev).add(messageId));
      setMessages(prev => [...prev, { sender, text, id: messageId }]);
    }
  };

  const addBotMessage = (text) => {
    const messageId = `bot-${Date.now()}`;
    addMessage('bot', text, messageId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    
    const messageId = `user-${Date.now()}`;
    addMessage('user', userMessage, messageId);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addBotMessage(randomResponse);
    }, 1500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-2xl shadow-xl overflow-hidden glass-effect border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="flex items-center justify-center"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Using the logo class from your CSS */}
                <img 
                  src="/sathee-logo.png" 
                  alt="Sathee Logo" 
                  className="logo" 
                  style={{ 
                    width: '3em', 
                    height: '3em', 
                    padding: '0.5em',
                    background: 'white',
                    borderRadius: '50%'
                  }} 
                />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">Sathee Companion</h2>
                <p className="text-blue-100 text-sm">Your supportive AI friend</p>
              </div>
            </div>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(203, 213, 225, 0.5) transparent'
            }}
          >
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
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
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
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
                <div className="chat-bubble-bot p-4 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-white/90">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-4 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-medium"
              />
              <motion.button
                type="submit"
                className="btn btn-primary flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim()}
              >
                <span>Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                This is a supportive AI companion. If you're experiencing a crisis, please contact a mental health professional.
              </p>
              <div className="mt-2">
                <span className="inline-block h-1 w-1 rounded-full bg-blue-600 mx-1"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-500 mx-1"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-400 mx-1"></span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ChatbotPage;
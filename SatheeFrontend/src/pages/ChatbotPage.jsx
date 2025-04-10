import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { saveChat } from '../utilities/ChatStoreUtil';
import { useAuth } from '../context/AuthContext';
import AuthPopup from '../components/AuthPopup';

function ChatbotPage() {
  const location = useLocation();
  const { isAuthenticated, authLoading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const chatContainerRef = useRef(null);
  const [processedMessages, setProcessedMessages] = useState(new Set());
  const [apiError, setApiError] = useState(null);
  const [chatId, setChatId] = useState(`chat-${Date.now()}`);
  const initialMessageSent = useRef(false);
  const [isGuest, setIsGuest] = useState(false);

  // Fallback responses in case API fails
  const fallbackResponses = [
    "I understand this is difficult. Can you tell me more about what's troubling you?",
    "You're not alone in this. I'm here to listen and support you.",
    "It's brave of you to share these feelings. How long have you been feeling this way?",
    "Would you like to talk about what triggered these thoughts?",
    "Your feelings are valid. Have you considered speaking with a mental health professional?",
    "Remember, there are people who care about you and want to help.",
  ];

  // Check authentication status when component mounts
  useEffect(() => {
    if (!authLoading && !isAuthenticated && !isGuest) {
      setShowAuthPopup(true);
    }
  }, [authLoading, isAuthenticated, isGuest]);
  
  // Initialize chat with welcome message only once
  useEffect(() => {
    // Check if we're continuing a previous conversation
    if (location.state?.chatId) {
      setChatId(location.state.chatId);
      
      // Load this specific conversation
      const savedChat = JSON.parse(localStorage.getItem('satheeChats')) || [];
      const chat = savedChat.find(c => c.id === location.state.chatId);
      
      if (chat && chat.messages.length > 0) {
        setMessages(chat.messages);
        // Mark all messages as processed
        const processedIds = new Set();
        chat.messages.forEach(msg => processedIds.add(msg.id));
        setProcessedMessages(processedIds);
      } else {
        // Only add welcome message if this is a new chat
        addWelcomeMessageIfNeeded();
      }
    } else if (location.state?.initialMessage && !initialMessageSent.current) {
      // Handle initial message if provided and not already processed
      initialMessageSent.current = true;
      handleInitialMessage(location.state.initialMessage);
    } else {
      // Only add welcome message if this is a new chat with no messages
      addWelcomeMessageIfNeeded();
    }
  }, [location.state]);

  // Helper function to add welcome message only if needed
  const addWelcomeMessageIfNeeded = () => {
    if (messages.length === 0 && !initialMessageSent.current) {
      const welcomeMessageId = `bot-welcome-${Date.now()}`;
      if (!processedMessages.has(welcomeMessageId)) {
        addBotMessage("Hi, I'm your Sathee. I'm here to listen and support you. How are you feeling today?", welcomeMessageId);
      }
    }
  };

  // Save chat to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChat(chatId, messages);
    }
  }, [messages, chatId]);

 const fetchBotResponse = async (userMessage) => {
    try {
      console.log(userMessage);
      setApiError(null);
      
      // Get the token from localStorage or wherever you store it after login
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      let response;
      
      if (isAuthenticated && token) {
        // Authenticated request
        response = await fetch('http://localhost:8000/api/v1/users/chat', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ user_input: userMessage }),
        });
      } else {
        // Guest request (no auth token)
        response = await fetch('http://localhost:8000/api/v1/users/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_input: userMessage }),
        });
      }

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Use the botResponse field from your controller
      const fullResponse = data.botResponse;

      if (!fullResponse) {
        console.warn("Invalid response format. Using fallback.");
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      }

      return fullResponse;
    } catch (error) {
      console.error('Error fetching response:', error);
      setApiError(error.message);
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  };

  const handleInitialMessage = async (message) => {
    const messageId = `user-${Date.now()}`;
    
    // Prevent duplicate processing of the initial message
    if (!processedMessages.has(messageId)) {
      setProcessedMessages(prev => new Set(prev).add(messageId));
      addMessage('user', message, messageId);
      
      setIsTyping(true);
      try {
        const botResponse = await fetchBotResponse(message);
        setIsTyping(false);
        addBotMessage(botResponse);
      } catch (error) {
        setIsTyping(false);
        // Use a fallback response if API fails
        const responseIndex = Math.floor(Math.random() * fallbackResponses.length);
        addBotMessage(fallbackResponses[responseIndex]);
      }
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

  const addBotMessage = (text, id = null) => {
    const messageId = id || `bot-${Date.now()}`;
    addMessage('bot', text, messageId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    
    const messageId = `user-${Date.now()}`;
    addMessage('user', userMessage, messageId);
    
    setIsTyping(true);
    try {
      const botResponse = await fetchBotResponse(userMessage);
      setIsTyping(false);
      
      // Format the response to avoid numbered lists with asterisks
      const formattedResponse = formatBotResponse(botResponse);
      addBotMessage(formattedResponse);
    } catch (error) {
      setIsTyping(false);
      // Use a fallback response if API fails
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      addBotMessage(randomResponse);
    }
  };

  // Format bot responses to avoid numbered lists with asterisks
  const formatBotResponse = (text) => {
    // Check if the text contains a pattern like "1. **Title**:" format
    if (/\d+\.\s+\*\*[^*]+\*\*:/.test(text)) {
      // Replace numbered items with paragraph breaks
      return text
        .replace(/(\d+\.\s+)\*\*([^*]+)\*\*:/g, '\n$2:')
        .replace(/^\s+|\s+$/g, ''); // Trim leading/trailing whitespace
    }
    return text;
  };

  // Handle auth popup close
  const handleAuthPopupClose = () => {
    setShowAuthPopup(false);
    setIsGuest(true);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      {showAuthPopup && <AuthPopup onClose={handleAuthPopupClose} />}
      
      <div className="max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-2xl shadow-xl overflow-hidden glass-effect border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
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
                  <p className="text-blue-100 text-sm">
                    {isAuthenticated ? 'Your personalized AI friend' : isGuest ? 'Guest mode' : 'Your supportive AI friend'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {isAuthenticated && (
                  <Link to="/history">
                    <motion.button 
                      className="bg-white text-blue-600 py-2 px-4 rounded-full font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      History
                    </motion.button>
                  </Link>
                )}
                {!isAuthenticated && !isGuest && (
                  <Link to="/login">
                    <motion.button 
                      className="bg-white text-blue-600 py-2 px-4 rounded-full font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Login
                    </motion.button>
                  </Link>
                )}
                {isGuest && (
                  <Link to="/login">
                    <motion.button 
                      className="bg-white text-blue-600 py-2 px-4 rounded-full font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                )}
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
                  {message.text.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-3' : ''}>
                      {paragraph}
                    </p>
                  ))}
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
            {apiError && (
              <div className="text-center p-2 text-sm text-red-500">
                <p>Connection issue. Using backup responses.</p>
              </div>
            )}
            {isGuest && (
              <div className="text-center mt-4 p-2 border border-yellow-200 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  You're using Sathee in guest mode. 
                  <Link to="/login" className="ml-1 text-blue-600 hover:underline">Sign in</Link> to save your conversations.
                </p>
              </div>
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
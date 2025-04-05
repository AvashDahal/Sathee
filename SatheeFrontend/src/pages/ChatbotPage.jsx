import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function ChatbotPage() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const botResponses = [
    "I understand this is difficult. Can you tell me more about what's troubling you?",
    "You're not alone in this. I'm here to listen and support you.",
    "It's brave of you to share these feelings. How long have you been feeling this way?",
    "Would you like to talk about what triggered these thoughts?",
    "Your feelings are valid. Have you considered speaking with a mental health professional?",
    "Remember, there are people who care about you and want to help.",
  ];

  useEffect(() => {
    if (location.state?.initialMessage) {
      handleInitialMessage(location.state.initialMessage);
    } else {
      addBotMessage("Hi, I'm your Sathee. I'm here to listen and support you. How are you feeling today?");
    }
  }, []);

  const handleInitialMessage = (message) => {
    addMessage('user', message);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage("I hear you, and I want you to know that you're not alone. Can you tell me more about what's troubling you?");
    }, 1500);
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, id: Date.now() }]);
  };

  const addBotMessage = (text) => {
    addMessage('bot', text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage('user', inputMessage);
    setInputMessage('');
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden glass-effect"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative h-12 w-12 flex items-center justify-center bg-white rounded-full"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/sathee-logo.png" alt="Sathee Logo" className="h-10 w-10 object-contain" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Sathee Companion</h2>
            </div>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white"
          >
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 shadow-md ${
                    message.sender === 'user'
                      ? 'chat-bubble-user'
                      : 'chat-bubble-bot'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-bot p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 border-t bg-white">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-4 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ChatbotPage;
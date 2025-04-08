import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ChatHistoryPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);

  useEffect(() => {
    // Load chat history from localStorage when component mounts
    loadChatHistory();
  }, []);

  const loadChatHistory = () => {
    try {
      const savedHistory = localStorage.getItem('satheeChats');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Sort by date, newest first
        parsedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        setChatHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

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

  const handleViewConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  const handleDeleteClick = (conversation) => {
    setConversationToDelete(conversation);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (conversationToDelete) {
      const updatedHistory = chatHistory.filter(chat => chat.id !== conversationToDelete.id);
      
      try {
        localStorage.setItem('satheeChats', JSON.stringify(updatedHistory));
        setChatHistory(updatedHistory);
        
        // If the deleted conversation was the selected one, clear selection
        if (selectedConversation && selectedConversation.id === conversationToDelete.id) {
          setSelectedConversation(null);
        }
      } catch (error) {
        console.error('Error saving updated history:', error);
      }
    }
    
    setIsDeleteModalOpen(false);
    setConversationToDelete(null);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setConversationToDelete(null);
  };

  // Extract first message from each side as preview
  const getPreviewText = (messages) => {
    if (!messages || messages.length === 0) return "Empty conversation";
    
    // Get the first user message
    const firstUserMessage = messages.find(msg => msg.sender === 'user');
    
    if (firstUserMessage) {
      // Limit to 40 characters
      return firstUserMessage.text.length > 40 
        ? firstUserMessage.text.substring(0, 40) + '...' 
        : firstUserMessage.text;
    }
    
    return "New conversation";
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
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
                  <h2 className="text-2xl font-bold text-white">Chat History</h2>
                  <p className="text-blue-100 text-sm">View and manage your past conversations</p>
                </div>
              </div>
              <Link to="/">
                <motion.button 
                  className="bg-white text-blue-600 py-2 px-4 rounded-full font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Chat
                </motion.button>
              </Link>
            </div>
          </div>
          
          <div className="flex min-h-[600px]">
            {/* Chat list sidebar */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-50">
              {chatHistory.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {chatHistory.map(chat => (
                    <li key={chat.id}>
                      <motion.div 
                        className={`p-4 hover:bg-blue-50 cursor-pointer ${selectedConversation?.id === chat.id ? 'bg-blue-100' : ''}`}
                        whileHover={{ backgroundColor: 'rgba(219, 234, 254, 0.8)' }}
                        onClick={() => handleViewConversation(chat)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 truncate">{getPreviewText(chat.messages)}</p>
                            <p className="text-sm text-gray-500 mt-1">{formatDate(chat.date)}</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(chat);
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500">No chat history found</p>
                  <Link to="/chatbot">
                    <motion.button 
                      className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start a New Chat
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Chat content area */}
            <div className="w-2/3 bg-white flex flex-col">
              {selectedConversation ? (
                <>
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
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
                  <p className="text-gray-500">Choose a chat from the list to view its contents</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Conversation</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this conversation? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <motion.button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
              >
                Cancel
              </motion.button>
              <motion.button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDelete}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ChatHistoryPage;
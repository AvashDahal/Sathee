import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ConversationList from '../components/ConversationList';
import ConversationDetail from '../components/ConversationDetail';

function ChatHistoryPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);
  
  // Pagination and filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOption, setFilterOption] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeleteAllClick = () => {
    setIsDeleteAllModalOpen(true);
  };

  const confirmDeleteAll = () => {
    try {
      localStorage.removeItem('satheeChats');
      setChatHistory([]);
      setSelectedConversation(null);
    } catch (error) {
      console.error('Error deleting all chats:', error);
    }
    
    setIsDeleteAllModalOpen(false);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setConversationToDelete(null);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
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
              <Link to="/chatbot">
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
            {/* Conversation List Component */}
            <ConversationList 
              chatHistory={chatHistory}
              selectedConversation={selectedConversation}
              handleViewConversation={handleViewConversation}
              handleDeleteClick={handleDeleteClick}
              handleDeleteAllClick={handleDeleteAllClick}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            
            {/* Conversation Detail Component */}
            <ConversationDetail 
              selectedConversation={selectedConversation}
              handleCloseConversation={handleCloseConversation}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Delete single conversation modal */}
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
      
      {/* Delete all conversations modal */}
      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete All Conversations</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete all conversations? This action cannot be undone and will clear your entire chat history.</p>
            <div className="flex justify-end space-x-4">
              <motion.button 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeDeleteAllModal}
              >
                Cancel
              </motion.button>
              <motion.button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDeleteAll}
              >
                Delete All
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ChatHistoryPage;
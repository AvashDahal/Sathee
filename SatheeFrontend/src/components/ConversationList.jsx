import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ConversationList({ 
  chatHistory, 
  selectedConversation, 
  handleViewConversation, 
  handleDeleteClick,
  handleDeleteAllClick,
  searchTerm,
  setSearchTerm,
  filterOption,
  setFilterOption,
  currentPage,
  setCurrentPage
}) {
  // Pagination settings
  const itemsPerPage = 10;
  
  // Filter chats based on selected option and search term
  const getFilteredChats = () => {
    let filteredChats = [...chatHistory];
    
    // Apply search filter if there's a search term
    if (searchTerm.trim() !== '') {
      filteredChats = filteredChats.filter(chat => {
        // Search in all messages
        return chat.messages.some(msg => 
          msg.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Apply date filters
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    switch(filterOption) {
      case 'today':
        filteredChats = filteredChats.filter(chat => {
          const chatDate = new Date(chat.date);
          return chatDate >= today;
        });
        break;
      case 'yesterday':
        filteredChats = filteredChats.filter(chat => {
          const chatDate = new Date(chat.date);
          return chatDate >= yesterday && chatDate < today;
        });
        break;
      case 'thisWeek':
        filteredChats = filteredChats.filter(chat => {
          const chatDate = new Date(chat.date);
          return chatDate >= lastWeek;
        });
        break;
      case 'thisMonth':
        filteredChats = filteredChats.filter(chat => {
          const chatDate = new Date(chat.date);
          return chatDate >= lastMonth;
        });
        break;
      default:
        // 'all' - no additional filtering
        break;
    }
    
    return filteredChats;
  };

  // Get preview text for conversation
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

  // Get current chats for pagination
  const filteredChats = getFilteredChats();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChats = filteredChats.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChats.length / itemsPerPage);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-50 flex flex-col">
      {/* Search and filter controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
          />
        </div>
        <div className="flex justify-between">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterOption}
            onChange={(e) => {
              setFilterOption(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>
          
          <motion.button 
            className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg flex items-center border border-red-600 hover:bg-red-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteAllClick}
            disabled={chatHistory.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete All
          </motion.button>
        </div>
      </div>
      
      {/* Conversation list */}
      <div className="flex-grow overflow-y-auto">
        {currentChats.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {currentChats.map(chat => (
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
          <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {chatHistory.length === 0 ? (
              <p className="text-gray-500">No chat history found</p>
            ) : (
              <p className="text-gray-500">No matching conversations</p>
            )}
            {chatHistory.length === 0 && (
              <Link to="/chatbot">
                <motion.button 
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a New Chat
                </motion.button>
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Pagination controls */}
      {filteredChats.length > 0 && (
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredChats.length)} of {filteredChats.length}
          </div>
          <div className="flex space-x-2">
            <motion.button
              className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
            <select
              className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPage}
              onChange={(e) => paginate(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <motion.button
              className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationList;
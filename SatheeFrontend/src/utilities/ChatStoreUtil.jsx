// chatStorage.js - Utility functions for managing chat history

// Save a chat session to localStorage
export const saveChat = (chatId, messages) => {
    try {
      // Get existing chats
      const existingChats = getChats();
      
      // Check if this chat already exists
      const chatIndex = existingChats.findIndex(chat => chat.id === chatId);
      
      if (chatIndex !== -1) {
        // Update existing chat
        existingChats[chatIndex] = {
          id: chatId,
          date: new Date().toISOString(),
          messages: messages
        };
      } else {
        // Add new chat
        existingChats.push({
          id: chatId,
          date: new Date().toISOString(),
          messages: messages
        });
      }
      
      // Save back to localStorage
      localStorage.setItem('satheeChats', JSON.stringify(existingChats));
      return true;
    } catch (error) {
      console.error('Error saving chat:', error);
      return false;
    }
  };
  
  // Get all chats from localStorage
  export const getChats = () => {
    try {
      const savedChats = localStorage.getItem('satheeChats');
      return savedChats ? JSON.parse(savedChats) : [];
    } catch (error) {
      console.error('Error getting chats:', error);
      return [];
    }
  };
  
  // Get a specific chat by ID
  export const getChatById = (chatId) => {
    try {
      const chats = getChats();
      return chats.find(chat => chat.id === chatId) || null;
    } catch (error) {
      console.error('Error getting chat by ID:', error);
      return null;
    }
  };
  
  // Delete a chat by ID
  export const deleteChat = (chatId) => {
    try {
      const chats = getChats();
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      localStorage.setItem('satheeChats', JSON.stringify(updatedChats));
      return true;
    } catch (error) {
      console.error('Error deleting chat:', error);
      return false;
    }
  };
  
  // Clear all chat history
  export const clearAllChats = () => {
    try {
      localStorage.removeItem('satheeChats');
      return true;
    } catch (error) {
      console.error('Error clearing chats:', error);
      return false;
    }
  };
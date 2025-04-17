import { createContext, useState, useEffect, useContext } from 'react';

// Create Authentication Context
export const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is authenticated
  const checkAuthStatus = () => {
    setAuthLoading(true);
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setAuthLoading(false);
      return false;
    }

    try {
      // Get user data if saved in localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
      setIsAuthenticated(true);
      setAuthLoading(false);
      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setUser(null);
      setAuthLoading(false);
      return false;
    }
  };

  // Login function
  const login = (userData, token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('authToken', token); // For compatibility with existing code
    
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    
    setIsAuthenticated(true);
    return true;
  };

  // Logout function - Remove the navigate call
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    // Navigate will be handled where logout is called
  };

  // Context value
  const value = {
    isAuthenticated,
    authLoading,
    user,
    login,
    logout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import the auth context

function Header() {
  const { isAuthenticated, user, logout } = useAuth(); // Use auth context
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    // Could add navigation here if needed
  };

  // Get user initials for avatar
  const getUserInitial = () => {
    if (user && user.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    return 'N/A';
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Updated with simplified design */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-blue-50">
              <img 
                src="/sathee-logo.png" 
                alt="Sathee Logo" 
                className="h-full w-full object-contain p-1" 
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-blue-600">
                Sathee
              </span>
              <span className="text-xs text-gray-500 -mt-1">Your Companion</span>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/test">Test for Stress</NavLink>
            
            <div className="ml-6 flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="px-5 py-2 rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-5 py-2 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-200 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center mr-2">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                        {getUserInitial()}
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-red-200 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-3 pt-3 pb-4">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/test" onClick={() => setMobileMenuOpen(false)}>Test for Stress</MobileNavLink>
              
              <div className="pt-3 grid grid-cols-2 gap-3">
                {!isAuthenticated ? (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 text-center rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 text-center rounded-full font-medium border border-gray-200 text-gray-700"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center col-span-2 pb-2">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-lg">
                          {getUserInitial()}
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="col-span-2 w-full py-2 text-center rounded-full font-medium border border-gray-200 text-gray-700"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

// Custom NavLink component for desktop
function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
}

// Custom NavLink component for mobile
function MobileNavLink({ to, children, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 border-l-2 border-transparent hover:border-blue-600"
    >
      {children}
    </Link>
  );
}

export default Header;
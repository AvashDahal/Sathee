import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-12 w-12"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-blue-500 to-orange-400 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center justify-center h-full w-full bg-white rounded-full">
                <img src="/sathee-logo.png" alt="Sathee Logo" className="h-10 w-10 object-contain" />
              </div>
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600">
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
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/login" 
                    className="px-5 py-2 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-md hover:shadow-blue-200 transition-all duration-300 transform hover:translate-y-[-2px]"
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
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-5 py-2 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-red-200 transition-all duration-300"
                >
                  Logout
                </button>
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
                {!isLoggedIn ? (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 text-center rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm"
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
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center rounded-full font-medium border border-gray-200 text-gray-700"
                  >
                    Logout
                  </button>
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
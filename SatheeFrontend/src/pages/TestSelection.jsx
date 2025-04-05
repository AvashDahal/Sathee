import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function TestSelection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          <span className="text-gradient">Choose Your Assessment</span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Our professionally designed assessments help you understand your mental well-being and provide personalized guidance.
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            className="card cursor-pointer overflow-hidden relative group"
          >
            <Link to="/depression-test" className="block text-center p-4">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              
              <motion.div className="relative z-10">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M7 8h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">Depression Spectrum Test</h2>
                <p className="text-gray-600 mb-4">
                  Understand your emotional well-being with our comprehensive assessment
                </p>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300">
                  Start Assessment →
                </span>
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            className="card cursor-pointer overflow-hidden relative group"
          >
            <Link to="/suicidal-intent" className="block text-center p-4">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
              
              <motion.div className="relative z-10">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">Suicidal Intent Test</h2>
                <p className="text-gray-600 mb-4">
                  Get immediate support and guidance if you're having difficult thoughts
                </p>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300">
                  Start Assessment →
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default TestSelection;
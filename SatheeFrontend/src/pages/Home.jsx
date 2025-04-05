import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const testimonials = [
    {
      quote: "Taking the first step towards healing is an act of courage.",
      author: "Sarah M."
    },
    {
      quote: "You don't have to carry the weight alone. Reach out.",
      author: "Michael R."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section with better visual separation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden py-32 sm:py-40"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-40">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-200 blur-3xl"></div>
            <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-teal-200 blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-orange-200 blur-3xl"></div>
          </div>
        </div>
        
        {/* Main content with improved text and animations */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-gradient"
          >
            Your Emotional Companion
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Here to listen, support, and guide you through tough times
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link 
              to="/test" 
              className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-200"
            >
              Test for Stress
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Improved testimonials section with better visual separation */}
      <section className="py-24 relative">
        {/* Enhanced background for better separation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute right-0 top-0 h-full w-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
            </svg>
            <defs>
              <pattern id="grid-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="10" height="10" fill="none" stroke="rgba(37, 99, 235, 0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
          >
            Words of Hope
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="card glass-effect hover-scale border border-blue-100"
              >
                <div className="flex flex-col items-center text-left">
                  <svg className="w-10 h-10 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                  </svg>
                  <p className="text-lg md:text-xl mb-4 italic text-gray-700">{testimonial.quote}</p>
                  <p className="text-gray-600 font-medium self-end">{testimonial.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
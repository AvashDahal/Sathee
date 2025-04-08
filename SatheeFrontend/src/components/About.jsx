import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function About() {
  // Animation variants for staggered animations
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Team member data (single member for solo project)
  const teamMember = {
    name: "Avash Mani Dahal",
    role: "Computer Engineer",
    image: "/team-member-1.png",
    description: "Passionate about using technology to improve mental health accessibility across India. Combining expertise in AI and psychology to create supportive digital solutions."
  };

  // Scroll animation for section reveal
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">About Sathee</h1>
            <p className="text-xl text-gray-700 mb-10">Your companion on the journey to better mental health.</p>
            
            <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
              <img 
                src="/about-hero.png" 
                alt="Mental health support" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-8 left-0 right-0 text-white text-center">
                <p className="text-xl md:text-2xl font-medium">Supporting mental wellbeing across India</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-70 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-200 opacity-50 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-purple-100 opacity-40 blur-2xl"></div>
      </section>

      {/* Our Mission */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > 100 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-white/70 p-8 md:p-12 rounded-3xl shadow-lg border border-blue-50 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Mission</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Sathee was founded with a simple yet powerful vision: to make mental health support accessible to everyone in India, regardless of their location or economic background.
              </p>
              <p className="text-lg">
                In a country where mental health resources are often scarce and stigma still exists, we aim to bridge the gap by providing a safe, confidential space for individuals to assess their mental wellbeing and receive guidance.
              </p>
              <p className="text-lg">
                Through our AI-powered platform, we offer initial assessments, personalized resources, and connections to professional help when needed – all while respecting cultural nuances and individual circumstances.
              </p>
            </div>
            
            {/* Mission stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-700 font-medium">Users Supported</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-700 font-medium">Mental Health Partners</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">AI Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > 400 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">How Sathee Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Assessment</h3>
                <p className="text-gray-600 text-center">Take validated mental health assessments to understand your current wellbeing status.</p>
              </div>
              
              <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Conversation</h3>
                <p className="text-gray-600 text-center">Chat with our AI companion to express your feelings and receive supportive guidance.</p>
              </div>
              
              <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Connection</h3>
                <p className="text-gray-600 text-center">Get connected with professional resources and support groups when needed.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Centered solo member */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={scrollY > 800 ? "visible" : "hidden"}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Meet the Creator</h2>
            
            <motion.div 
              variants={itemVariants} 
              className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 max-w-md mx-auto text-center"
            >
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-6 shadow-lg">
                <img 
                  src={teamMember.image} 
                  alt={teamMember.name}
                  className="h-full w-full object-cover" 
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">{teamMember.name}</h3>
              <p className="text-blue-600 mb-4 font-medium">{teamMember.role}</p>
              <p className="text-gray-600">{teamMember.description}</p>
              
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > 1200 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">User Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 relative">
                <div className="absolute top-4 left-4 text-6xl text-blue-200 font-serif">"</div>
                <div className="pt-6 px-4 relative z-10">
                  <p className="text-gray-700 mb-6">Sathee helped me understand that what I was feeling was anxiety, and guided me through simple techniques to manage it. I'm grateful for this accessible support.</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">R</div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-800">Rahul K.</div>
                      <div className="text-sm text-gray-500">Student, Mumbai</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-50 relative">
                <div className="absolute top-4 left-4 text-6xl text-blue-200 font-serif">"</div>
                <div className="pt-6 px-4 relative z-10">
                  <p className="text-gray-700 mb-6">As someone living in a small town with limited mental health resources, Sathee has been invaluable. The stress assessment helped me realize I needed to make lifestyle changes.</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">S</div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-800">Sangeeta M.</div>
                      <div className="text-sm text-gray-500">Teacher, Rajasthan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: scrollY > 1600 ? 1 : 0, y: scrollY > 1600 ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-white/80 p-8 md:p-12 rounded-3xl shadow-lg border border-blue-50 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Have Questions?</h2>
            <p className="text-lg text-gray-700 mb-8">
              We're here to help. Reach out with any questions about Sathee or how we can support your mental health journey.
            </p>
            <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-6">
              <a href="mailto:contact@sathee.org" className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Us</span>
              </a>
              <a href="#" className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>FAQ</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multi-color gradient bar at bottom */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
    </div>
  );
}

export default About;
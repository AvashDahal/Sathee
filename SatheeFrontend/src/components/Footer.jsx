import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16 font-nunito relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 multi-color-gradient"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500 opacity-10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="transform transition hover:scale-105 duration-300">
            <h2 className="text-3xl font-extrabold mb-4 text-gradient">Sathee</h2>
            <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
              Empowering mental health awareness and support through technology and empathy.
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"></div>
          </div>

          {/* Emergency Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Emergency Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="transform transition hover:-translate-y-1 duration-200">
                <a href="tel:988" className="hover:text-blue-300 transition duration-200 flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                   Suicide & Crisis Lifeline
                </a>
              </li>
              <li className="transform transition hover:-translate-y-1 duration-200">
                <a
                  href="https://www.samhsa.gov"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-blue-300 transition duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  National Helpline
                </a>
              </li>
              <li className="transform transition hover:-translate-y-1 duration-200">
                <a
                  href="#"
                  className="hover:text-blue-300 transition duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Mental Health Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="transform transition hover:-translate-y-1 duration-200">
                <Link to="/about" className="hover:text-blue-300 transition duration-200 flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li className="transform transition hover:-translate-y-1 duration-200">
                <Link to="/services" className="hover:text-blue-300 transition duration-200 flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Our Services
                </Link>
              </li>
              <li className="transform transition hover:-translate-y-1 duration-200">
                <Link to="/privacy" className="hover:text-blue-300 transition duration-200 flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li className="transform transition hover:-translate-y-1 duration-200">
                <Link to="/contact" className="hover:text-blue-300 transition duration-200 flex items-center">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Connect With Us
            </h3>
            <p className="text-sm text-gray-300 mb-5">
              Follow us for updates and support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 hover:bg-blue-600 p-3 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-3">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-cyan-600 p-3 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-3">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-pink-600 p-3 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-3">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-blue-500 p-3 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-3">
                <FaLinkedinIn className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 py-6 border-t border-gray-700">
          <div className="max-w-lg mx-auto">
            <h4 className="text-center text-blue-400 font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="btn-primary px-6 py-2 rounded-lg text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} 
            <span className="mx-1 text-gradient font-semibold">Sathee</span> 
            All rights reserved.
          </p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <FaHeart className="mx-1 text-pink-500"/> by the Sathee Team
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Emergency Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:988" className="hover:text-indigo-400">
                  988 Suicide & Crisis Lifeline
                </a>
              </li>
              <li>
                <a href="https://www.samhsa.gov" className="hover:text-indigo-400" target="_blank" rel="noopener">
                  SAMHSA's National Helpline
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="mb-4">Get support and updates through our social channels</p>
            <div className="flex space-x-4">
              {/* Add social media links here */}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Sathee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
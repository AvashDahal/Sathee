import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 font-nunito">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-gradient">Sathee</h2>
            <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
              Empowering mental health awareness and support through technology and empathy.
            </p>
          </div>

          {/* Emergency Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Emergency Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:988" className="hover:text-indigo-300 transition duration-200">
                  988 Suicide & Crisis Lifeline
                </a>
              </li>
              <li>
                <a
                  href="https://www.samhsa.gov"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-indigo-300 transition duration-200"
                >
                  SAMHSA's National Helpline
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-indigo-300 transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-300 transition duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-300 transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Connect With Us</h3>
            <p className="text-sm text-gray-300 mb-4">
              Follow us for updates and support.
            </p>
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-blue-500 hover-scale"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400 hover-scale"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-500 hover-scale"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-600 hover-scale"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-gradient font-semibold">Sathee</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

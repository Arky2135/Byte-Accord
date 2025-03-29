
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/7b45f2cb-4eb4-4f21-a25e-24e1102c837e.png" 
                alt="SetuConnect Logo" 
                className="h-16"
              />
            </div>
            <p className="text-gray-400 mb-4">
              SetuConnect bridges local electronics and telecom businesses with a wider customer base, driving economic growth and community development in Bhiwandi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-terracotta-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-terracotta-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-terracotta-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-terracotta-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-terracotta-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-terracotta-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-terracotta-500 transition-colors">Browse Categories</Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-400 hover:text-terracotta-500 transition-colors">Vendors</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-terracotta-500 transition-colors">Blog & News</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-terracotta-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Vendor Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor-signup" className="text-gray-400 hover:text-terracotta-500 transition-colors">Join as a Vendor</Link>
              </li>
              <li>
                <Link to="/vendor-login" className="text-gray-400 hover:text-terracotta-500 transition-colors">Vendor Login</Link>
              </li>
              <li>
                <Link to="/vendor-dashboard" className="text-gray-400 hover:text-terracotta-500 transition-colors">Vendor Dashboard</Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-terracotta-500 transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link to="/vendor-resources" className="text-gray-400 hover:text-terracotta-500 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/vendor-faq" className="text-gray-400 hover:text-terracotta-500 transition-colors">Vendor FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-terracotta-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Tech Plaza, Central Market<br />
                  Bhiwandi, Maharashtra 421302
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-terracotta-500 mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-terracotta-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-terracotta-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@setuconnect.com" className="text-gray-400 hover:text-terracotta-500 transition-colors">
                  info@setuconnect.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">
                Stay updated with the latest products, vendor additions, and local business news.
              </p>
            </div>
            <div>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow rounded-l-lg py-3 px-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 border-0"
                />
                <button 
                  type="submit" 
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-r-lg px-4 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SetuConnect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 hover:text-terracotta-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-terracotta-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-terracotta-500 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

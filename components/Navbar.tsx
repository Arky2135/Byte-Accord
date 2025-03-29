
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/7b45f2cb-4eb4-4f21-a25e-24e1102c837e.png" 
            alt="SetuConnect Logo" 
            className="h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-terracotta-600 underline-link font-medium">
            Home
          </Link>
          <Link to="/categories" className="text-foreground/80 hover:text-terracotta-600 underline-link font-medium">
            Categories
          </Link>
          <Link to="/vendors" className="text-foreground/80 hover:text-terracotta-600 underline-link font-medium">
            Vendors
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-terracotta-600 underline-link font-medium">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-terracotta-600 underline-link font-medium">
            Contact
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button aria-label="Search" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/cart" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link to="/account" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/login" className="btn-outline py-2 px-4">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground/80 hover:text-terracotta-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-terracotta-600 transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-foreground/80 hover:text-terracotta-600 transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/vendors" 
              className="text-foreground/80 hover:text-terracotta-600 transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendors
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-terracotta-600 transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground/80 hover:text-terracotta-600 transition-colors py-2 border-b border-gray-100 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-5 pt-3">
              <button aria-label="Search" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/cart" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              <Link to="/account" className="text-foreground/80 hover:text-terracotta-600 transition-colors">
                <User className="h-5 w-5" />
              </Link>
            </div>
            <Link 
              to="/login" 
              className="btn-primary text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

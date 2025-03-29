
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mb-12 md:mb-0 animate-fade-in">
            <div className="inline-block bg-terracotta-100 text-terracotta-800 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-fade-in-slow">
              Powering Local Commerce, Digitally
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connecting <span className="text-terracotta-600">Local Businesses</span> With Digital Customers
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              SetuConnect brings Bhiwandi's electronics and telecom businesses to the digital world, fostering community growth and economic empowerment.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/explore" className="btn-primary text-center">
                Explore Products
              </Link>
              <Link to="/vendors" className="btn-outline text-center">
                Find Local Vendors
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center animate-fade-in-right">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-cream-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-terracotta-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="glass-card rounded-xl p-6 relative z-10 max-w-md">
                <img 
                  src="/lovable-uploads/7b45f2cb-4eb4-4f21-a25e-24e1102c837e.png" 
                  alt="SetuConnect" 
                  className="w-full h-auto mb-6"
                />
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Find What You Need</h3>
                  <SearchBar />
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Electronics</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Telecom</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Repairs</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, User } from 'lucide-react';

const vendors = [
  {
    id: 1,
    name: 'TechSolutions',
    category: 'Electronics Repair',
    rating: 4.8,
    reviewCount: 124,
    location: 'Local Market',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3',
    yearsInBusiness: 8,
    specialty: 'Motherboard repairs, computer servicing',
    link: '/vendor/tech-solutions'
  },
  {
    id: 2,
    name: 'Connect Telecom',
    category: 'Telecom Services',
    rating: 4.6,
    reviewCount: 89,
    location: 'Local Market',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3',
    yearsInBusiness: 5,
    specialty: 'Mobile repairs, network installations',
    link: '/vendor/connect-telecom'
  },
  {
    id: 3,
    name: 'Digital Vision Electronics',
    category: 'Electronics Sales',
    rating: 4.9,
    reviewCount: 211,
    location: 'Local Market',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    yearsInBusiness: 12,
    specialty: 'Premium smartphones, laptops, TVs',
    link: '/vendor/digital-vision'
  }
];

const VendorShowcase = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-terracotta-100 text-terracotta-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Local Businesses
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Local Vendors
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Support your community by shopping from these trusted local businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <Link 
              key={vendor.id}
              to={vendor.link}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white font-medium text-sm bg-terracotta-600 px-3 py-1 rounded-full">
                    {vendor.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {vendor.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{vendor.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({vendor.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{vendor.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{vendor.yearsInBusiness} years in business</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">Specialty: {vendor.specialty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/vendors" className="btn-primary inline-flex items-center">
            Explore All Local Vendors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorShowcase;

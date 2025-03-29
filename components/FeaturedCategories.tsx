
import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Tv, Cpu, WifiIcon, HeadphonesIcon, MouseIcon, BatteryChargingIcon, BellIcon } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Smartphones',
    description: 'Latest mobile devices and accessories',
    icon: <Smartphone className="h-8 w-8 text-terracotta-600" />,
    link: '/category/smartphones'
  },
  {
    id: 2,
    name: 'Televisions',
    description: 'Smart TVs and entertainment systems',
    icon: <Tv className="h-8 w-8 text-terracotta-600" />,
    link: '/category/televisions'
  },
  {
    id: 3,
    name: 'Computer Parts',
    description: 'Hardware components and peripherals',
    icon: <Cpu className="h-8 w-8 text-terracotta-600" />,
    link: '/category/computer-parts'
  },
  {
    id: 4,
    name: 'Networking',
    description: 'Routers, modems and connectivity solutions',
    icon: <WifiIcon className="h-8 w-8 text-terracotta-600" />,
    link: '/category/networking'
  },
  {
    id: 5,
    name: 'Audio',
    description: 'Speakers, headphones and sound systems',
    icon: <HeadphonesIcon className="h-8 w-8 text-terracotta-600" />,
    link: '/category/audio'
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Gadgets and peripherals for all devices',
    icon: <MouseIcon className="h-8 w-8 text-terracotta-600" />,
    link: '/category/accessories'
  },
  {
    id: 7,
    name: 'Power Solutions',
    description: 'UPS, inverters and power accessories',
    icon: <BatteryChargingIcon className="h-8 w-8 text-terracotta-600" />,
    link: '/category/power-solutions'
  },
  {
    id: 8,
    name: 'Security Systems',
    description: 'CCTV, alarms and protection devices',
    icon: <BellIcon className="h-8 w-8 text-terracotta-600" />,
    link: '/category/security-systems'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-terracotta-100 text-terracotta-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Discover
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our wide range of electronics and telecom products from local vendors in Bhiwandi
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="bg-white rounded-xl p-6 shadow-sm hover-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-cream-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories" className="btn-outline inline-flex items-center">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

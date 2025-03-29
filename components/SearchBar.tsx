
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for products, services, or vendors..." 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      console.log('Search for:', query);
      // Here you would handle the search, like redirecting to a search page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-terracotta-500 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

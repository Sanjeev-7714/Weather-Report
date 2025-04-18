import React, { useState, useEffect, useRef } from 'react';
import { Search, X, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSearchHistory } from '../utils/localStorage';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      inputRef.current?.blur();
    }
  };

  const handleHistoryItemClick = (item: string) => {
    setCity(item);
    onSearch(item);
    setIsFocused(false);
  };

  const clearInput = () => {
    setCity('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 pl-11 pr-10 rounded-lg border bg-white/10 backdrop-blur-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          {city && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!city.trim() || isLoading}
          className={`mt-3 w-full px-4 py-2 rounded-lg font-medium text-white transition-all ${
            !city.trim() || isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              <span>Searching...</span>
            </div>
          ) : (
            'Get Weather Report'
          )}
        </button>
      </form>

      {isFocused && history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 top-14 w-full bg-white rounded-lg shadow-lg mt-1 border border-gray-200 overflow-hidden"
        >
          <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center">
            <History size={16} className="text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Recent Searches</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {history.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleHistoryItemClick(item)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
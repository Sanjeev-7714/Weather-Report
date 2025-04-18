import React, { useState } from 'react';
import { CloudSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import WeatherBackground from './components/WeatherBackground';
import { fetchWeatherData } from './services/weatherService';
import { WeatherData } from './types/weather';
import { addToSearchHistory } from './utils/localStorage';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      addToSearchHistory(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 flex flex-col overflow-hidden">
      {weatherData && (
        <WeatherBackground weatherCondition={weatherData.weather[0].main} />
      )}
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        >
          <CloudSun className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">Weather Forecast</h1>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}
        </AnimatePresence>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <AnimatePresence>
          {!weatherData && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-600 mt-10"
            >
              <p className="text-lg">Enter a city name to get the current weather report</p>
              <div className="mt-8 flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <button 
                    onClick={() => handleSearch('New York')}
                    className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-lg transition-colors"
                  >
                    New York
                  </button>
                  <button 
                    onClick={() => handleSearch('London')}
                    className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-lg transition-colors"
                  >
                    London
                  </button>
                  <button 
                    onClick={() => handleSearch('Tokyo')}
                    className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-lg transition-colors"
                  >
                    Tokyo
                  </button>
                  <button 
                    onClick={() => handleSearch('Sydney')}
                    className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-lg transition-colors"
                  >
                    Sydney
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {weatherData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <WeatherCard data={weatherData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}

export default App;
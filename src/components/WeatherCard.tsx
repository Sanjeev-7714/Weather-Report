import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, ArrowUpRight, Clock } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { celsiusToFahrenheit, getWeatherIconUrl, getFormattedTime } from '../services/weatherService';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const getTemp = (temp: number): number => {
    return unit === 'celsius' ? temp : celsiusToFahrenheit(temp);
  };

  const getUnitSymbol = (): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const toggleUnit = () => {
    setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const getWeatherBackground = (): string => {
    const weatherMain = data.weather[0].main.toLowerCase();
    const hours = new Date().getHours();
    const isDay = hours >= 6 && hours < 18;

    if (weatherMain.includes('clear') && isDay) return 'bg-gradient-to-br from-blue-400 to-blue-200';
    if (weatherMain.includes('clear')) return 'bg-gradient-to-br from-indigo-900 to-blue-900';
    if (weatherMain.includes('cloud')) return 'bg-gradient-to-br from-gray-400 to-gray-300';
    if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) return 'bg-gradient-to-br from-gray-700 to-gray-600';
    if (weatherMain.includes('thunder')) return 'bg-gradient-to-br from-gray-900 to-gray-800';
    if (weatherMain.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-gray-100';
    if (weatherMain.includes('mist') || weatherMain.includes('fog')) return 'bg-gradient-to-br from-gray-400 to-gray-300';
    return 'bg-gradient-to-br from-blue-500 to-blue-300';
  };

  const getTextColor = (): string => {
    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes('thunder') || weatherMain.includes('clear') && !(new Date().getHours() >= 6 && new Date().getHours() < 18)) {
      return 'text-gray-100';
    }
    return 'text-gray-900';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl ${getWeatherBackground()} ${getTextColor()}`}
    >
      {/* Header with city and country */}
      <div className="pt-6 px-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
            <p className="text-sm opacity-80">{data.sys.country}</p>
          </div>
          <button 
            onClick={toggleUnit}
            className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            {unit === 'celsius' ? 'Switch to °F' : 'Switch to °C'}
          </button>
        </div>
      </div>

      {/* Main weather info */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col items-center">
          <img 
            src={getWeatherIconUrl(data.weather[0].icon)} 
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <p className="text-base capitalize">{data.weather[0].description}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold">{Math.round(getTemp(data.main.temp))}{getUnitSymbol()}</div>
          <p className="text-sm mt-1">
            Feels like: {Math.round(getTemp(data.main.feels_like))}{getUnitSymbol()}
          </p>
        </div>
      </div>

      {/* Temperature range */}
      <div className="px-6 py-2 flex justify-between text-sm">
        <div>
          <span className="opacity-80">Min: </span>
          <span className="font-medium">{Math.round(getTemp(data.main.temp_min))}{getUnitSymbol()}</span>
        </div>
        <div>
          <span className="opacity-80">Max: </span>
          <span className="font-medium">{Math.round(getTemp(data.main.temp_max))}{getUnitSymbol()}</span>
        </div>
      </div>

      {/* Additional weather details */}
      <div className="mt-4 bg-black/10 backdrop-blur-sm px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Wind size={18} className="mr-2 opacity-80" />
            <div>
              <p className="text-sm opacity-80">Wind</p>
              <p className="font-medium">{Math.round(data.wind.speed * 3.6)} km/h</p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets size={18} className="mr-2 opacity-80" />
            <div>
              <p className="text-sm opacity-80">Humidity</p>
              <p className="font-medium">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Eye size={18} className="mr-2 opacity-80" />
            <div>
              <p className="text-sm opacity-80">Visibility</p>
              <p className="font-medium">{(data.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 opacity-80" />
            <div>
              <p className="text-sm opacity-80">Updated</p>
              <p className="font-medium">{new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sunset and sunrise */}
      <div className="px-6 py-4 flex justify-between text-sm">
        <div className="flex flex-col items-center">
          <p className="opacity-80">Sunrise</p>
          <p className="font-medium">{getFormattedTime(data.sys.sunrise, data.timezone)}</p>
        </div>
        <div className="flex items-center">
          <ArrowUpRight size={40} className="opacity-30" />
        </div>
        <div className="flex flex-col items-center">
          <p className="opacity-80">Sunset</p>
          <p className="font-medium">{getFormattedTime(data.sys.sunset, data.timezone)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WeatherBackgroundProps {
  weatherCondition: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCondition }) => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const condition = weatherCondition.toLowerCase();
    
    // Clear previous particles
    setParticles([]);
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      const raindrops = Array.from({ length: 50 }).map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const animationDuration = 0.8 + Math.random() * 0.7;
        const delay = Math.random() * 5;
        const opacity = 0.4 + Math.random() * 0.4;
        
        return (
          <motion.div
            key={`raindrop-${i}`}
            className="absolute bg-blue-100 rounded-full w-0.5 h-6"
            style={{
              left,
              top: -30,
              opacity,
            }}
            animate={{
              y: ['0%', '120vh'],
            }}
            transition={{
              y: {
                duration: animationDuration,
                repeat: Infinity,
                ease: 'linear',
                delay,
              }
            }}
          />
        );
      });
      setParticles(raindrops);
    } else if (condition.includes('snow')) {
      const snowflakes = Array.from({ length: 40 }).map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const animationDuration = 4 + Math.random() * 6;
        const delay = Math.random() * 5;
        const size = 2 + Math.random() * 4;
        
        return (
          <motion.div
            key={`snowflake-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              left,
              top: -10,
              width: size,
              height: size,
              opacity: 0.7,
            }}
            animate={{
              y: ['0%', '100vh'],
              x: ['-10px', '10px', '-5px', '5px', '0px'],
            }}
            transition={{
              y: {
                duration: animationDuration,
                repeat: Infinity,
                ease: 'linear',
                delay,
              },
              x: {
                duration: animationDuration / 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'reverse',
              }
            }}
          />
        );
      });
      setParticles(snowflakes);
    } else if (condition.includes('cloud')) {
      const clouds = Array.from({ length: 8 }).map((_, i) => {
        const top = `${10 + Math.random() * 30}%`;
        const scale = 0.4 + Math.random() * 0.6;
        const opacity = 0.2 + Math.random() * 0.3;
        const animationDuration = 60 + Math.random() * 60;
        const delay = Math.random() * 10;
        
        return (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-white rounded-full w-24 h-24 blur-xl"
            style={{
              top,
              left: -100,
              scale,
              opacity,
            }}
            animate={{
              x: ['-10%', '110%'],
            }}
            transition={{
              x: {
                duration: animationDuration,
                repeat: Infinity,
                ease: 'linear',
                delay,
              }
            }}
          />
        );
      });
      setParticles(clouds);
    }
  }, [weatherCondition]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  );
};

export default WeatherBackground;
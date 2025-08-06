import React from 'react';
import { Sun, Moon, Thermometer } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SettingsPanel = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    temperatureUnit, 
    setTemperatureUnit 
  } = useWeather();

  const temperatureUnits = [
    { value: 'metric', label: '°C', name: 'Celsius' },
    { value: 'imperial', label: '°F', name: 'Fahrenheit' },
    { value: 'standard', label: 'K', name: 'Kelvin' }
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Temperature Unit Selector */}
      <div className="flex items-center space-x-2">
        <Thermometer className="w-5 h-5 text-white/70" />
        <select
          value={temperatureUnit}
          onChange={(e) => setTemperatureUnit(e.target.value)}
          className={`
            px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-medium
            ${isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white/20 border-white/30 text-white'
            }
            backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20
          `}
          aria-label="Select temperature unit"
        >
          {temperatureUnits.map(unit => (
            <option 
              key={unit.value} 
              value={unit.value}
              className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            >
              {unit.label} ({unit.name})
            </option>
          ))}
        </select>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`
          p-3 rounded-full transition-all duration-300 group
          ${isDarkMode 
            ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' 
            : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-200'
          }
          backdrop-blur-md border border-white/20 hover:border-white/30
        `}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default SettingsPanel;

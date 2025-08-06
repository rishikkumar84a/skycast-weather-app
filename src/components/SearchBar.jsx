import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { searchCities } from '../services/weatherApi';
import { debounce } from '../utils/helpers';

const SearchBar = ({ onCitySelect }) => {
  const { 
    searchResults, 
    setSearchResults, 
    isSearching, 
    setSearching,
    setSelectedCity,
    isDarkMode 
  } = useWeather();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce(async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    try {
      setSearching(true);
      const results = await searchCities(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);
    
    if (value.trim()) {
      debouncedSearch(value.trim());
    } else {
      setSearchResults([]);
      setSearching(false);
    }
  };

  const handleCitySelect = (city) => {
    const cityName = city.name;
    setSearchTerm(cityName);
    setSelectedCity(cityName);
    setShowResults(false);
    setSearchResults([]);
    
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowResults(false), 150);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search for a city..."
          className={`
            w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-200
            ${isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
              : 'bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50'
            }
            backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20
          `}
          aria-label="Search for cities"
          autoComplete="off"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (searchResults.length > 0 || isSearching) && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 rounded-xl shadow-weather z-50 max-h-64 overflow-y-auto
          ${isDarkMode 
            ? 'bg-gray-800 border border-gray-600' 
            : 'bg-white/90 border border-white/20'
          }
          backdrop-blur-md
        `}>
          {isSearching ? (
            <div className="p-4 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Searching...
              </p>
            </div>
          ) : (
            searchResults.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleCitySelect(city)}
                className={`
                  w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors
                  ${isDarkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-white/20 text-gray-800'
                  }
                  ${index === 0 ? 'rounded-t-xl' : ''}
                  ${index === searchResults.length - 1 ? 'rounded-b-xl' : ''}
                `}
                aria-label={`Select ${city.name}, ${city.country}`}
              >
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {city.name}
                  </div>
                  <div className={`text-sm truncate ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {city.state && `${city.state}, `}{city.country}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* No Results Message */}
      {showResults && !isSearching && searchTerm.length >= 2 && searchResults.length === 0 && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 p-4 rounded-xl shadow-weather z-50 text-center
          ${isDarkMode 
            ? 'bg-gray-800 border border-gray-600 text-gray-300' 
            : 'bg-white/90 border border-white/20 text-gray-600'
          }
          backdrop-blur-md
        `}>
          No cities found for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import React, { useEffect } from 'react';
import { Cloud, Loader2 } from 'lucide-react';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import SettingsPanel from './components/SettingsPanel';
import { ErrorMessage } from './components/LoadingStates';
import { getCurrentWeather, getForecast, getAirQuality } from './services/weatherApi';
import './index.css';

// Simplified CurrentWeatherPanel
const CurrentWeatherPanel = () => {
  const { currentWeather, isDarkMode, temperatureUnit, isLoading } = useWeather();
  
  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <span className="ml-2 text-white">Loading weather data...</span>
        </div>
      </div>
    );
  }
  
  if (!currentWeather) {
    return (
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="text-center text-white/70 py-8">
          <Cloud className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Select a city to view weather data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 card-hover">
      <h2 className="text-xl font-semibold text-white mb-4">{currentWeather.name}</h2>
      <div className="text-6xl font-light text-white mb-4">
        {Math.round(currentWeather.main.temp)}°{temperatureUnit === 'metric' ? 'C' : 'F'}
      </div>
      <p className="text-white/80 mb-6 capitalize">{currentWeather.weather[0].description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white/70 text-sm">Humidity</p>
          <p className="text-white font-semibold">{currentWeather.main.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white/70 text-sm">Wind</p>
          <p className="text-white font-semibold">{currentWeather.wind?.speed || 0} km/h</p>
        </div>
      </div>
    </div>
  );
};

// Simplified ForecastPanel
const ForecastPanel = () => {
  const { forecast, isLoading, temperatureUnit } = useWeather();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">7-Day Forecast</h3>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
            <span className="ml-2 text-white/70">Loading forecast...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (!forecast || forecast.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">7-Day Forecast</h3>
        <div className="glass rounded-2xl p-6">
          <div className="text-center text-white/70 py-8">
            <Cloud className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p>No forecast data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Process forecast data to get daily forecasts (OpenWeatherMap returns 3-hour intervals)
  const dailyForecasts = forecast.filter((_, index) => index % 8 === 0).slice(0, 7);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">7-Day Forecast</h3>
      <div className="space-y-3">
        {dailyForecasts.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div key={day.dt} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{dayName}</span>
                  <span className="text-white/70 text-sm capitalize">{day.weather[0].description}</span>
                </div>
                <span className="text-white font-semibold">
                  {Math.round(day.main.temp)}°{temperatureUnit === 'metric' ? 'C' : 'F'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Simplified CityComparisonPanel
const CityComparisonPanel = () => {
  const cities = ['Beijing', 'Shanghai', 'Chongqing'];
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">City Comparison</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {cities.map((city, index) => (
          <div key={city} className="glass rounded-xl p-4">
            <h4 className="font-semibold text-white mb-2">{city}</h4>
            <div className="text-2xl text-white">{20 + index * 5}°C</div>
            <p className="text-white/70">Clear</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const {
    setCurrentWeather,
    setForecast,
    setAirQuality,
    setLoading,
    setError,
    clearError,
    selectedCity,
    setSelectedCity,
    temperatureUnit,
    error,
    isDarkMode,
    isLoading
  } = useWeather();

  // Function to fetch weather data for a city
  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      clearError();
      
      console.log('Fetching weather data for:', cityName);

      // Fetch current weather
      const currentWeatherData = await getCurrentWeather(cityName, temperatureUnit);
      console.log('Current weather data:', currentWeatherData);
      setCurrentWeather(currentWeatherData);

      // Fetch forecast
      const forecastData = await getForecast(cityName, temperatureUnit);
      console.log('Forecast data:', forecastData);
      setForecast(forecastData.list);

      // Fetch air quality using coordinates from current weather
      if (currentWeatherData.coord) {
        const airQualityData = await getAirQuality(
          currentWeatherData.coord.lat, 
          currentWeatherData.coord.lon
        );
        console.log('Air quality data:', airQualityData);
        setAirQuality(airQualityData);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(`Failed to fetch weather data for ${cityName}. Please check the city name and try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Load initial city weather data
  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity, temperatureUnit]);

  const handleCitySelect = async (city) => {
    console.log('City selected:', city);
    // Update the selected city in context, which will trigger the useEffect to fetch data
    setSelectedCity(city.name);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Cloud className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">SkyCast</h1>
            </div>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-200 text-sm rounded-full">
              Modern Weather Dashboard
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <SearchBar onCitySelect={handleCitySelect} />
            <SettingsPanel />
          </div>
        </header>

        {/* Debug Info */}
        {selectedCity && (
          <div className="mb-4 glass rounded-lg p-3">
            <p className="text-white/70 text-sm">
              🌍 Current City: <span className="text-white font-medium">{selectedCity}</span>
              {isLoading && <span className="ml-2 text-yellow-300">⏳ Loading...</span>}
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6">
            <ErrorMessage error={error} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Current Weather - Left Column */}
          <div className="lg:col-span-2">
            <CurrentWeatherPanel />
          </div>

          {/* Forecast - Right Column */}
          <div className="lg:col-span-1">
            <ForecastPanel />
          </div>
        </div>

        {/* City Comparison - Full Width Bottom */}
        <div className="mt-8">
          <CityComparisonPanel />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-white/60 text-sm">
          <p>
            SkyCast - Weather Dashboard Demo | Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

// Main App Component with Provider
function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;

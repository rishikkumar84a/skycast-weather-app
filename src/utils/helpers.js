/**
 * Format temperature with unit symbol
 * @param {number} temp - Temperature value
 * @param {string} unit - Unit type (metric, imperial, standard)
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, unit = 'metric') => {
  const rounded = Math.round(temp);
  switch (unit) {
    case 'imperial':
      return `${rounded}°F`;
    case 'standard':
      return `${rounded}K`;
    default:
      return `${rounded}°C`;
  }
};

/**
 * Format date to readable string
 * @param {number} timestamp - Unix timestamp
 * @param {string} format - Format type ('day', 'date', 'time')
 * @returns {string} Formatted date
 */
export const formatDate = (timestamp, format = 'day') => {
  const date = new Date(timestamp * 1000);
  
  switch (format) {
    case 'day':
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    case 'short-day':
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    case 'date':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    case 'time':
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    case 'full':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Format wind speed with direction
 * @param {number} speed - Wind speed
 * @param {number} deg - Wind direction in degrees
 * @param {string} unit - Unit type
 * @returns {string} Formatted wind info
 */
export const formatWind = (speed, deg = 0, unit = 'metric') => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  const direction = directions[index];
  
  const speedUnit = unit === 'imperial' ? 'mph' : 'km/h';
  const convertedSpeed = unit === 'imperial' ? speed : speed * 3.6;
  
  return `${Math.round(convertedSpeed)} ${speedUnit} ${direction}`;
};

/**
 * Format humidity percentage
 * @param {number} humidity - Humidity value
 * @returns {string} Formatted humidity
 */
export const formatHumidity = (humidity) => `${humidity}%`;

/**
 * Format pressure
 * @param {number} pressure - Pressure in hPa
 * @returns {string} Formatted pressure
 */
export const formatPressure = (pressure) => `${pressure} hPa`;

/**
 * Format visibility
 * @param {number} visibility - Visibility in meters
 * @param {string} unit - Unit type
 * @returns {string} Formatted visibility
 */
export const formatVisibility = (visibility, unit = 'metric') => {
  if (unit === 'imperial') {
    const miles = visibility * 0.000621371;
    return `${miles.toFixed(1)} mi`;
  }
  
  if (visibility >= 1000) {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
  
  return `${visibility} m`;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

/**
 * Get appropriate weather background class
 * @param {string} weatherMain - Main weather condition
 * @param {boolean} isDark - Dark mode status
 * @returns {string} CSS class name
 */
export const getWeatherBackground = (weatherMain, isDark = false) => {
  const weatherLower = weatherMain?.toLowerCase();
  
  if (isDark) {
    return 'bg-gradient-weather-dark';
  }
  
  switch (weatherLower) {
    case 'clear':
      return 'bg-gradient-sunny';
    case 'rain':
    case 'drizzle':
      return 'bg-gradient-rainy';
    case 'clouds':
      return 'bg-gradient-cloudy';
    case 'thunderstorm':
      return 'bg-gradient-rainy';
    case 'snow':
      return 'bg-gradient-cloudy';
    default:
      return 'bg-gradient-weather';
  }
};

/**
 * Process forecast data to get daily forecasts
 * @param {Array} forecastList - Raw forecast data
 * @returns {Array} Processed daily forecasts
 */
export const processForecastData = (forecastList) => {
  const dailyForecasts = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = {
        dt: item.dt,
        temps: [],
        weather: item.weather[0],
        wind: item.wind,
        pop: item.pop || 0
      };
    }
    
    dailyForecasts[dateKey].temps.push(item.main.temp);
  });
  
  return Object.values(dailyForecasts)
    .slice(0, 7) // Get 7 days
    .map(day => ({
      ...day,
      temp_min: Math.min(...day.temps),
      temp_max: Math.max(...day.temps)
    }));
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

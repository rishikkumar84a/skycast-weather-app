// Weather API configuration
export const WEATHER_API_KEY = '0d55c6079668bbd19a583d32ed066a16';
export const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API_GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Default cities for comparison
export const DEFAULT_CITIES = [
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'Shanghai', lat: 31.2304, lon: 121.4737 },
  { name: 'Chongqing', lat: 29.4316, lon: 106.9123 }
];

// Air quality index colors and labels
export const AQI_COLORS = {
  1: { color: 'bg-green-500', label: 'Excellent' },
  2: { color: 'bg-yellow-500', label: 'Good' },
  3: { color: 'bg-orange-500', label: 'Moderate' },
  4: { color: 'bg-red-500', label: 'Poor' },
  5: { color: 'bg-purple-500', label: 'Very Poor' }
};

// Weather condition icons mapping
export const WEATHER_ICONS = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️', // scattered clouds
  '04d': '☁️', // broken clouds
  '04n': '☁️', // broken clouds
  '09d': '🌧️', // shower rain
  '09n': '🌧️', // shower rain
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️', // thunderstorm
  '13d': '❄️', // snow
  '13n': '❄️', // snow
  '50d': '🌫️', // mist
  '50n': '🌫️', // mist
};

// Temperature units
export const TEMP_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
  KELVIN: 'standard'
};

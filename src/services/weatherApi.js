import axios from 'axios';
import { 
  WEATHER_API_KEY, 
  WEATHER_API_BASE_URL, 
  WEATHER_API_GEO_URL 
} from '../constants/config';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
});

/**
 * Get current weather data for a city
 * @param {string} city - City name
 * @param {string} units - Temperature units (metric, imperial, standard)
 * @returns {Promise} Weather data
 */
export const getCurrentWeather = async (city, units = 'metric') => {
  try {
    const response = await api.get(`${WEATHER_API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Get weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Temperature units
 * @returns {Promise} Weather data
 */
export const getWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await api.get(`${WEATHER_API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

/**
 * Get 7-day weather forecast
 * @param {string} city - City name
 * @param {string} units - Temperature units
 * @returns {Promise} Forecast data
 */
export const getForecast = async (city, units = 'metric') => {
  try {
    const response = await api.get(`${WEATHER_API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units,
        cnt: 40 // 5 days * 8 (3-hour intervals)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Get forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Temperature units
 * @returns {Promise} Forecast data
 */
export const getForecastByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await api.get(`${WEATHER_API_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units,
        cnt: 40
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};

/**
 * Get air quality data
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Air quality data
 */
export const getAirQuality = async (lat, lon) => {
  try {
    const response = await api.get(`${WEATHER_API_BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

/**
 * Search for cities by name
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return
 * @returns {Promise} Array of cities
 */
export const searchCities = async (query, limit = 5) => {
  try {
    const response = await api.get(`${WEATHER_API_GEO_URL}/direct`, {
      params: {
        q: query,
        limit,
        appid: WEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};

/**
 * Get user's current location weather
 * @param {string} units - Temperature units
 * @returns {Promise} Current location weather data
 */
export const getCurrentLocationWeather = async (units = 'metric') => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByCoords(latitude, longitude, units);
          const forecastData = await getForecastByCoords(latitude, longitude, units);
          const airQualityData = await getAirQuality(latitude, longitude);
          
          resolve({
            current: weatherData,
            forecast: forecastData,
            airQuality: airQualityData
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

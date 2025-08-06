import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  currentWeather: null,
  forecast: [],
  cityWeatherList: [],
  airQuality: null,
  selectedCity: 'Patna',
  isDarkMode: false,
  isLoading: false,
  error: null,
  temperatureUnit: 'metric', // metric, imperial, standard
  searchResults: [],
  isSearching: false
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
  SET_FORECAST: 'SET_FORECAST',
  SET_CITY_WEATHER_LIST: 'SET_CITY_WEATHER_LIST',
  SET_AIR_QUALITY: 'SET_AIR_QUALITY',
  SET_SELECTED_CITY: 'SET_SELECTED_CITY',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_TEMPERATURE_UNIT: 'SET_TEMPERATURE_UNIT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_SEARCHING: 'SET_SEARCHING',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const weatherReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_CURRENT_WEATHER:
      return { ...state, currentWeather: action.payload, error: null };
    
    case actionTypes.SET_FORECAST:
      return { ...state, forecast: action.payload, error: null };
    
    case actionTypes.SET_CITY_WEATHER_LIST:
      return { ...state, cityWeatherList: action.payload };
    
    case actionTypes.SET_AIR_QUALITY:
      return { ...state, airQuality: action.payload };
    
    case actionTypes.SET_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    
    case actionTypes.TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode };
    
    case actionTypes.SET_TEMPERATURE_UNIT:
      return { ...state, temperatureUnit: action.payload };
    
    case actionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    
    case actionTypes.SET_SEARCHING:
      return { ...state, isSearching: action.payload };
    
    default:
      return state;
  }
};

// Create context
const WeatherContext = createContext();

// Custom hook to use weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

// Weather provider component
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('skycast-dark-mode');
    const savedUnit = localStorage.getItem('skycast-temperature-unit');
    const savedCity = localStorage.getItem('skycast-selected-city');

    if (savedDarkMode !== null) {
      if (JSON.parse(savedDarkMode)) {
        dispatch({ type: actionTypes.TOGGLE_DARK_MODE });
      }
    }

    if (savedUnit) {
      dispatch({ type: actionTypes.SET_TEMPERATURE_UNIT, payload: savedUnit });
    }

    if (savedCity) {
      dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: savedCity });
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('skycast-dark-mode', JSON.stringify(state.isDarkMode));
  }, [state.isDarkMode]);

  useEffect(() => {
    localStorage.setItem('skycast-temperature-unit', state.temperatureUnit);
  }, [state.temperatureUnit]);

  useEffect(() => {
    localStorage.setItem('skycast-selected-city', state.selectedCity);
  }, [state.selectedCity]);

  // Apply dark mode to document
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    setCurrentWeather: (weather) => dispatch({ type: actionTypes.SET_CURRENT_WEATHER, payload: weather }),
    setForecast: (forecast) => dispatch({ type: actionTypes.SET_FORECAST, payload: forecast }),
    setCityWeatherList: (list) => dispatch({ type: actionTypes.SET_CITY_WEATHER_LIST, payload: list }),
    setAirQuality: (airQuality) => dispatch({ type: actionTypes.SET_AIR_QUALITY, payload: airQuality }),
    setSelectedCity: (city) => dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: city }),
    toggleDarkMode: () => dispatch({ type: actionTypes.TOGGLE_DARK_MODE }),
    setTemperatureUnit: (unit) => dispatch({ type: actionTypes.SET_TEMPERATURE_UNIT, payload: unit }),
    setSearchResults: (results) => dispatch({ type: actionTypes.SET_SEARCH_RESULTS, payload: results }),
    setSearching: (searching) => dispatch({ type: actionTypes.SET_SEARCHING, payload: searching })
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

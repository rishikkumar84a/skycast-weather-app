import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <RefreshCw className={`${sizeClasses[size]} text-blue-500 animate-spin mb-3`} />
      <p className="text-gray-600 dark:text-gray-300 text-sm">{message}</p>
    </div>
  );
};

const ErrorMessage = ({ error, onRetry, isDarkMode = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-6 rounded-xl border-l-4 border-red-500 
        ${isDarkMode 
          ? 'bg-red-900/20 text-red-200' 
          : 'bg-red-50 text-red-800'
        }
      `}
    >
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Something went wrong</h3>
          <p className="text-sm opacity-90 mb-3">
            {error?.message || 'Failed to fetch weather data. Please try again.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ message, icon: Icon, isDarkMode = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {Icon && (
        <Icon className={`w-16 h-16 mb-4 ${
          isDarkMode ? 'text-gray-600' : 'text-gray-400'
        }`} />
      )}
      <p className={`text-lg font-medium mb-2 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {message}
      </p>
    </div>
  );
};

const SkeletonCard = ({ className = '', isDarkMode = false }) => {
  return (
    <div className={`${className} animate-pulse`}>
      <div className={`
        h-full rounded-xl p-6 
        ${isDarkMode 
          ? 'bg-gray-800/50' 
          : 'bg-white/20'
        }
        backdrop-blur-md
      `}>
        <div className={`h-4 rounded mb-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '60%' }} />
        <div className={`h-8 rounded mb-3 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '40%' }} />
        <div className={`h-3 rounded mb-2 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '80%' }} />
        <div className={`h-3 rounded ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '50%' }} />
      </div>
    </div>
  );
};

const WeatherCardSkeleton = ({ isDarkMode = false }) => {
  return (
    <div className="animate-pulse">
      <div className={`
        rounded-2xl p-6 glass
        ${isDarkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/20 border-white/20'
        }
      `}>
        {/* Location skeleton */}
        <div className={`h-6 rounded mb-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '60%' }} />
        
        {/* Temperature skeleton */}
        <div className={`h-16 rounded mb-6 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white/30'
        }`} style={{ width: '50%' }} />
        
        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className={`h-3 rounded ${
                isDarkMode ? 'bg-gray-700' : 'bg-white/30'
              }`} />
              <div className={`h-4 rounded ${
                isDarkMode ? 'bg-gray-700' : 'bg-white/30'
              }`} style={{ width: '70%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  SkeletonCard,
  WeatherCardSkeleton
};

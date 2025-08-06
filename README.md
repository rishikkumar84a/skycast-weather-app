# SkyCast - Modern Weather Dashboard

A beautiful, responsive weather dashboard application built with React.js, featuring real-time weather data, 7-day forecasts, city comparisons, and a modern glassmorphism design.

![SkyCast Preview](preview.png)

## ✨ Features

### 🌤️ Current Weather Panel
- **Real-time weather data** from OpenWeatherMap API
- **Temperature, humidity, wind speed, and pressure** display
- **Air quality index** with color-coded indicators
- **Interactive temperature trend chart** for the current day
- **Sunrise and sunset times**
- **"Feels like" temperature** and visibility

### 📅 7-Day Weather Forecast
- **Extended forecast** beyond the typical 4-day view
- **Daily temperature ranges** (min/max)
- **Weather condition icons** with animations
- **Wind speed and precipitation probability**
- **Air quality indicators** for each day
- **Today's hourly breakdown** (morning, afternoon, evening)

### 🏙️ City Weather Comparison
- **Pre-loaded cities**: Beijing, Shanghai, Chongqing
- **Add/remove cities dynamically**
- **Side-by-side weather comparison**
- **Quick city switching** with click-to-view details
- **Visual weather cards** with glassmorphism design

### 🔍 Smart Search Functionality
- **Real-time city search** with autocomplete
- **Global city database** via OpenWeatherMap Geocoding API
- **Instant results** with country and state information
- **Debounced search** for optimal performance

### 🎨 Modern Design & UX
- **Glassmorphism design** with blur effects and transparency
- **Smooth animations** powered by Framer Motion
- **Responsive layout** (mobile, tablet, desktop)
- **Gradient backgrounds** that adapt to weather conditions
- **Interactive hover effects** and micro-animations

### 🌙 Dark/Light Mode Toggle
- **Seamless theme switching**
- **Persistent user preferences** (localStorage)
- **Consistent design language** across themes
- **Optimized color schemes** for accessibility

### ⚙️ Customization Options
- **Temperature units**: Celsius, Fahrenheit, Kelvin
- **Persistent settings** stored locally
- **Responsive design** adapts to all screen sizes

### ♿ Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast** color schemes
- **Readable font sizes** and spacing

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Weather API**: OpenWeatherMap

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- OpenWeatherMap API key (included: `0d55c6079668bbd19a583d32ed066a16`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skycast-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
1. Import your repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Deploy!

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist/` folder to your web server

## 📁 Project Structure

```
skycast-weather-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CurrentWeatherPanel.jsx    # Main weather display
│   │   ├── ForecastPanel.jsx          # 7-day forecast
│   │   ├── CityComparisonPanel.jsx    # City comparison
│   │   ├── SearchBar.jsx              # City search
│   │   ├── SettingsPanel.jsx          # Theme & units
│   │   └── LoadingStates.jsx          # Loading & error states
│   ├── context/
│   │   └── WeatherContext.jsx         # Global state management
│   ├── services/
│   │   └── weatherApi.js              # API integration
│   ├── utils/
│   │   └── helpers.js                 # Utility functions
│   ├── constants/
│   │   └── config.js                  # App configuration
│   ├── data/
│   │   └── mockData.js                # Fallback mock data
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # App entry point
│   └── index.css                      # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### API Configuration
The app is pre-configured with an OpenWeatherMap API key. To use your own:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update `src/constants/config.js`:
   ```javascript
   export const WEATHER_API_KEY = 'your-api-key-here';
   ```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Cities**: Update `DEFAULT_CITIES` in `src/constants/config.js`
- **Mock Data**: Customize fallback data in `src/data/mockData.js`

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop computers** (1024px+)
- **Large screens** (1280px+)

### Mobile Features
- Touch-friendly interface
- Swipe gestures for navigation
- Optimized layout for small screens
- Fast loading and minimal data usage

## 🎯 Performance Optimizations

- **Code splitting** with dynamic imports
- **Image optimization** and lazy loading
- **API request debouncing** for search
- **Efficient state management** with React Context
- **Minimal bundle size** with tree shaking
- **Caching strategies** for weather data

## 🐛 Error Handling & Fallbacks

- **Graceful API failure handling**
- **Mock data fallbacks** when API is unavailable
- **User-friendly error messages**
- **Retry mechanisms** for failed requests
- **Offline support** with cached data

## 🔄 Data Sources

- **Current Weather**: OpenWeatherMap Current Weather API
- **Forecasts**: OpenWeatherMap 5-day/3-hour Forecast API
- **Air Quality**: OpenWeatherMap Air Pollution API
- **Geocoding**: OpenWeatherMap Geocoding API
- **Fallback**: Comprehensive mock data for offline testing

## 🎨 Design Inspiration

The design is based on the provided reference image featuring:
- **Glassmorphism UI** with blur effects
- **Soft gradients** and rounded corners
- **Clean typography** with proper hierarchy
- **Weather-appropriate color schemes**
- **Intuitive iconography** and visual feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing the weather API
- **React team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include browser version, error messages, and steps to reproduce

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**

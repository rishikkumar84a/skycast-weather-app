// Mock weather data for fallback when API is unavailable
export const mockCurrentWeather = {
  name: 'Guangzhou',
  main: {
    temp: 34,
    feels_like: 36,
    humidity: 65,
    pressure: 1013
  },
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  wind: {
    speed: 3.5
  },
  visibility: 10000,
  dt: Date.now() / 1000,
  sys: {
    country: 'CN',
    sunrise: 1691971200,
    sunset: 1692019200
  },
  coord: {
    lat: 23.1291,
    lon: 113.2644
  }
};

export const mockForecast = {
  list: [
    {
      dt: Date.now() / 1000 + 86400,
      main: { temp_min: 28, temp_max: 35 },
      weather: [{ main: 'Thunderstorm', icon: '11d' }],
      wind: { speed: 4.2 },
      pop: 0.8
    },
    {
      dt: Date.now() / 1000 + 172800,
      main: { temp_min: 26, temp_max: 32 },
      weather: [{ main: 'Rain', icon: '10d' }],
      wind: { speed: 3.8 },
      pop: 0.6
    },
    {
      dt: Date.now() / 1000 + 259200,
      main: { temp_min: 25, temp_max: 33 },
      weather: [{ main: 'Clear', icon: '01d' }],
      wind: { speed: 2.5 },
      pop: 0.1
    },
    {
      dt: Date.now() / 1000 + 345600,
      main: { temp_min: 27, temp_max: 34 },
      weather: [{ main: 'Clouds', icon: '03d' }],
      wind: { speed: 3.2 },
      pop: 0.3
    },
    {
      dt: Date.now() / 1000 + 432000,
      main: { temp_min: 29, temp_max: 36 },
      weather: [{ main: 'Clear', icon: '01d' }],
      wind: { speed: 2.8 },
      pop: 0.1
    },
    {
      dt: Date.now() / 1000 + 518400,
      main: { temp_min: 28, temp_max: 35 },
      weather: [{ main: 'Rain', icon: '10d' }],
      wind: { speed: 4.1 },
      pop: 0.7
    },
    {
      dt: Date.now() / 1000 + 604800,
      main: { temp_min: 26, temp_max: 32 },
      weather: [{ main: 'Clouds', icon: '04d' }],
      wind: { speed: 3.5 },
      pop: 0.4
    }
  ]
};

export const mockCityWeather = [
  {
    name: 'Beijing',
    main: { temp: 27 },
    weather: [{ main: 'Clouds', icon: '03d' }]
  },
  {
    name: 'Shanghai',
    main: { temp: 30 },
    weather: [{ main: 'Rain', icon: '10d' }]
  },
  {
    name: 'Chongqing',
    main: { temp: 23 },
    weather: [{ main: 'Clear', icon: '01d' }]
  }
];

export const mockAirQuality = {
  list: [
    {
      main: {
        aqi: 2
      },
      components: {
        co: 233.4,
        no: 0.01,
        no2: 13.4,
        o3: 151.2,
        so2: 2.75,
        pm2_5: 8.5,
        pm10: 15.3,
        nh3: 0.92
      }
    }
  ]
};

// Temperature trend data for the chart
export const mockTemperatureTrend = {
  labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
  datasets: [
    {
      label: 'Temperature (°C)',
      data: [28, 30, 34, 36, 32, 29],
      borderColor: 'rgba(102, 126, 234, 1)',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};

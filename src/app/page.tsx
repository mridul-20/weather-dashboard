'use client';

import { useState } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
  }[];
}

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const getWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'd3956aa31e6b4e0b63a746ff01020ad9';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
      
      setSearchHistory(prev => {
        const newHistory = [cityName, ...prev.filter(item => item.toLowerCase() !== cityName.toLowerCase())];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      getWeatherData(city.trim());
    }
  };

  const handleHistoryClick = (cityName: string) => {
    setCity(cityName);
    getWeatherData(cityName);
  };

  const handleRefresh = () => {
    if (weatherData?.name) {
      getWeatherData(weatherData.name);
    }
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyForecast = forecastData.list.reduce((acc: any[], item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!acc.find(d => d.day === day)) {
        acc.push({
          day,
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
          description: item.weather[0].main
        });
      }
      
      return acc;
    }, []).slice(0, 5);

    return dailyForecast;
  };

  return (
    <main className="min-h-screen w-full bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: "url('/Scenic Gifs.gif')" }}>
      <div className="h-[700px] w-[500px] bg-black bg-opacity-50 shadow-lg shadow-white p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-10 px-4 text-center text-black border-none rounded-lg bg-yellow-300 text-lg"
            placeholder="Enter city name"
          />
        </form>

        {searchHistory.length > 0 && (
          <div className="mb-4">
            <h3 className="text-white text-lg mb-2">Recent Searches:</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((cityName, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(cityName)}
                  className="px-3 py-1 bg-yellow-300 text-black rounded-lg hover:text-black-300 hover:bg-yellow-600 transition-colors text-sm"
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl text-center text-white">{weatherData.name}</h2>
              <button
                onClick={handleRefresh}
                className="px-3 py-1 bg-yellow-300 text-black rounded-lg hover:bg-yellow-600 transition-colors"
                title="Refresh weather data"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="h-[100px]"
              />
              <div>
                <h1 className="text-6xl text-center text-white">
                  {Math.round(weatherData.main.temp)}<sup>o</sup>
                </h1>
                <p className="text-2xl text-center text-white">celsius</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-2xl text-center text-yellow-300">
                Wind Speed: <span>{weatherData.wind.speed} km/h</span>
              </p>
              <p className="text-2xl text-center text-yellow-300">
                Humidity: <span>{weatherData.main.humidity}%</span>
              </p>
              <p className="text-xl text-center text-white">
                {weatherData.weather[0].main}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && forecastData && (
          <div className="mt-6">
            <h3 className="text-xl text-center text-white mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-2">
              {getDailyForecast().map((day, index) => (
                <div key={index} className="bg-black bg-opacity-30 p-2 rounded-lg text-center">
                  <p className="text-white font-semibold">{day.day}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    className="mx-auto h-10 w-10"
                  />
                  <p className="text-yellow-300 text-sm">{day.temp}°</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
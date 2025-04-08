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

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const getWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'd3956aa31e6b4e0b63a746ff01020ad9';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      setWeatherData(data);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [cityName, ...prev.filter(item => item.toLowerCase() !== cityName.toLowerCase())];
        return newHistory.slice(0, 5); // Keep only last 5 searches
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

  return (
    <main className="min-h-screen w-full bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: "url('/Scenic Gifs.gif')" }}>
      <div className="h-[600px] w-[450px] bg-black bg-opacity-50 shadow-lg shadow-white p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-10 px-4 text-center text-black border-none rounded-lg bg-blue-200 text-lg"
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
                  className="px-3 py-1 bg-yellow-300 text-black rounded-lg hover:text-yellow-300 transition-colors text-sm"
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-300"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <div className="mt-4">
            <h2 className="text-3xl text-center text-white mb-4">{weatherData.name}</h2>
            <h1 className="text-8xl text-center text-white">
              {Math.round(weatherData.main.temp)}<sup>o</sup>
            </h1>
            <p className="text-4xl text-center text-white">celsius</p>
            
            <div className="mt-4 space-y-2">
              <p className="text-3xl text-center text-yellow-300">
                Wind Speed: <span>{weatherData.wind.speed} km/h</span>
              </p>
              <p className="text-3xl text-center text-yellow-300">
                Humidity: <span>{weatherData.main.humidity}%</span>
              </p>
              <p className="text-2xl text-center text-white">
                {weatherData.weather[0].main}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && weatherData && (
          <div className="flex justify-center mt-4">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="h-[100px]"
            />
          </div>
        )}
      </div>
    </main>
  );
}
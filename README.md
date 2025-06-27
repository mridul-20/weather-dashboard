# Weather Dashboard

A modern, responsive weather dashboard built with Next.js that provides real-time weather information and 5-day forecasts for cities worldwide.

![Screenshot 2025-04-09 023936](https://github.com/user-attachments/assets/8f559410-a6a2-4d2d-9557-5f691d4a63d1)


## Features

- Real-time weather data for any city
- 5-day weather forecast
- Recent search history
- Dark/Light theme support
- Responsive design
- Weather condition icons
- Temperature in Celsius
- Wind speed and humidity information
- Auto-refresh capability

## Tech Stack

- **Frontend Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: OpenWeatherMap API
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

### OpenWeatherMap API

The application uses the OpenWeatherMap API for weather data:

- **Current Weather API**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast API**: `https://api.openweathermap.org/data/2.5/forecast`

#### API Key
- Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
- Free tier includes:
  - 60 calls/minute
  - Current weather data
  - 5-day/3-hour forecast
  - Weather icons

#### Rate Limits
- Free tier: 60 calls/minute
- Paid tiers available for higher limits
- Consider implementing caching for production use

#### API Endpoints Used
1. Current Weather:
   ```
   GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
   ```

2. 5-Day Forecast:
   ```
   GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
   ```

## Project Structure

```
weather-dashboard/
├── public/
│   └── Scenic Gifs.gif
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── components/
│       ├── SearchBar.tsx
│       ├── WeatherCard.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── package.json
├── tailwind.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenWeatherMap for providing the weather data API
- Next.js and Tailwind CSS teams for their amazing frameworks
- All contributors who have helped improve this project

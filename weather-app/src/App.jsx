import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const API_KEY = "16c5abdddb14d2428c46e7c739d1e626";
  
  const fetchWeather = async () => {
  if (!city.trim()) {
    setError("Please enter a city name");
    return;
  }

  try {
    setError("");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    setWeather(data);
    setLoading(false);
  } catch (err) {
    setWeather(null);
    setError(err.message);
    setLoading(false);
  }
};

const getWeatherIcon = (weatherMain) => {
  switch (weatherMain) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Drizzle":
      return "🌦️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    default:
      return "🌡️";
  }
};

  return (
    <div className="app">
      <h1>Weather &nbsp;App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />

        <button onClick={fetchWeather}>Search</button>
      </div>

      <div className="weather-info">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
  <>
    <h2>{weather.name}</h2>

    <div style={{ fontSize: "50px" }}>
      {getWeatherIcon(weather.weather[0].main)}
    </div>

    <p>Temperature: {weather.main.temp}°C</p>
    <p>Weather: {weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>
      Wind Speed: {(weather.wind.speed * 3.6).toFixed(1)} km/h
    </p>
  </>
)}
      </div>
    </div>
  );
}

export default App;
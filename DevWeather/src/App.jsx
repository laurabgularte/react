import { useWeather } from "./hooks/useWeather";
import { WeatherSearch } from "./components/WeatherSearch";
import { WeatherCard } from "./components/WeatherCard";
import "./styles/global.css";

function App() {
  const { weatherData, loading, error, getWeather } = useWeather();

  return (
    <div className="app-container">
      <h1>DevWeather 🌤️</h1>
      <WeatherSearch onSearch={getWeather} />

      {loading && <p className="loading">Buscando dados no satélite...</p>}
      {error && <p className="error-message">⚠️ {error}</p>}
      {weatherData && !loading && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;

export const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <div className="weather-info">
        <p className="temp">{Math.round(main.temp)}°C</p>
        <p className="desc">{weather[0].description}</p>
      </div>
      <div className="details">
        <p>Umidade: {main.humidity}%</p>
        <p>Vento: {wind.speed} km/h</p>
      </div>
    </div>
  );
};

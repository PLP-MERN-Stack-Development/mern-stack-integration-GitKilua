import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useWeather from '../hooks/useWeather';

const WeatherDetail = () => {
  const { city } = useParams();
  const { weather, loading, error, fetchWeatherByCity } = useWeather();
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    fetchWeatherByCity(city).then((data) => setCurrentWeather(data));
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentWeather) return <p>No data for {city}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weather for {currentWeather.city}</h1>
      <p>Temperature: {currentWeather.temperature}°C</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <p>Description: {currentWeather.description}</p>
      {currentWeather.icon && <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`} alt="Weather icon" />}
    </div>
  );
};

export default WeatherDetail;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWeather from '../hooks/useWeather';

const Dashboard = () => {
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kenya Weather Dashboard</h1>
      <div>
        {weather.map((w) => (
          <div key={w._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{w.city}</h2>
            <p>Temperature: {w.temperature}°C</p>
            <p>Humidity: {w.humidity}%</p>
            <p>Description: {w.description}</p>
            {w.icon && <img src={`https://openweathermap.org/img/wn/${w.icon}.png`} alt="Weather icon" />}
            <Link to={`/weather/${w.city}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
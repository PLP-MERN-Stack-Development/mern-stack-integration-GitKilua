import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/weather');
      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/weather/${city}`);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather, fetchWeatherByCity };
};

export default useWeather;
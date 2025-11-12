import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const getWeather = () => axios.get(`${API_BASE}/weather`);
export const getWeatherByCity = (city) => axios.get(`${API_BASE}/weather/${city}`);
export const createWeather = (data) => axios.post(`${API_BASE}/weather`, data);
export const updateWeather = (id, data) => axios.put(`${API_BASE}/weather/${id}`, data);
export const deleteWeather = (id) => axios.delete(`${API_BASE}/weather/${id}`);
export const getCities = () => axios.get(`${API_BASE}/cities`);
export const createCity = (data) => axios.post(`${API_BASE}/cities`, data);
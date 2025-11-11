const express = require('express');
const axios = require('axios');
const Joi = require('joi');
const Weather = require('../models/Weather');
const City = require('../models/City');

const router = express.Router();

// Validation schemas
const citySchema = Joi.object({ name: Joi.string().required() });

// GET /api/weather - Get all weather data
router.get('/weather', async (req, res) => {
  try {
    const weather = await Weather.find();
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/weather/:city - Get weather for a specific city
router.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    let weather = await Weather.findOne({ city });
    if (!weather) {
      // Fetch from OpenWeatherMap API
      const apiKey = process.env.WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},KE&appid=${apiKey}&units=metric`
      );
      weather = new Weather({
        city,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });
      await weather.save();
    }
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// POST /api/weather - Create new weather entry (for manual add)
router.post('/weather', async (req, res) => {
  const { error } = Joi.object({
    city: Joi.string().required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
    description: Joi.string().required(),
  }).validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const weather = new Weather(req.body);
    await weather.save();
    res.status(201).json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create weather entry' });
  }
});

// PUT /api/weather/:id - Update weather entry
router.put('/weather/:id', async (req, res) => {
  try {
    const weather = await Weather.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!weather) return res.status(404).json({ error: 'Weather not found' });
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update weather' });
  }
});

// DELETE /api/weather/:id - Delete weather entry
router.delete('/weather/:id', async (req, res) => {
  try {
    const weather = await Weather.findByIdAndDelete(req.params.id);
    if (!weather) return res.status(404).json({ error: 'Weather not found' });
    res.json({ message: 'Weather deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete weather' });
  }
});

// GET /api/cities - Get all cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/cities - Create new city
router.post('/cities', async (req, res) => {
  const { error } = citySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add city' });
  }
});

module.exports = router;
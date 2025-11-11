const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // Weather icon URL or code
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', weatherSchema);
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, default: 'Kenya' },
});

module.exports = mongoose.model('City', citySchema);
const mongoose = require('mongoose');

module.exports = mongoose.model('WeatherSensor', new mongoose.Schema({
  locationName: String,
  latitude: Number,
  longitude: Number,
  degreeType: String,
  time: Date,
  temperature: Number,
  humidity: Number,
  feelsLike: Number,
  wind: String,
}));
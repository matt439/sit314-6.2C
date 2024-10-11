const mongoose = require('mongoose');

module.exports = mongoose.model('HVACChange', new mongoose.Schema({
    address: String,
    time: Date,
    temperature: Number,
    unit: String,
    relativeHumidity: Number,
    fanSpeedPct: Number,
}));
const mongoose = require('mongoose');

module.exports = mongoose.model('RoomSensor', new mongoose.Schema({
    id: Number,
    name: String,
    address: String,
    time: Date,
    temperature: Number,
    unit: String,
    relativeHumidity: Number,
    numberUsedChairs: Number,
}));
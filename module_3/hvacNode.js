const express = require('express');

const port = 3001;

const app = express();
app.use(express.json());

app.use(express.json());

const MAX_TEMP = 27;
const MIN_TEMP = 20;
const MAX_HUMIDITY = 95;
const MIN_HUMIDITY = 30;
const MAX_FAN_SPEED = 100;
const MIN_FAN_SPEED = 0;

var hcacSettings = {
    temperature: 20,
    humidity: 50,
    fanSpeedPct: 30,
};

function setTemperature(temperature, time) {
    if (temperature >= MIN_TEMP && temperature <= MAX_TEMP &&
        typeof temperature === 'number' && temperature !== null) {
        hcacSettings.temperature = temperature;
        console.log(time + '  Temperature set to', temperature);
    } else {
        console.error('Invalid temperature:', temperature);
    }
};

function setHumidity(humidity, time) {
    if (humidity >= MIN_HUMIDITY && humidity <= MAX_HUMIDITY &&
        typeof humidity === 'number' && humidity !== null) {
        hcacSettings.humidity = humidity;
        console.log(time + '  Humidity set to', humidity);
    } else {
        console.error('Invalid humidity:', humidity);
    }
};

function setFanSpeedPct(fanSpeedPct, time) {
    if (fanSpeedPct >= MIN_FAN_SPEED && fanSpeedPct <= MAX_FAN_SPEED &&
        typeof fanSpeedPct === 'number' && fanSpeedPct !== null) {
        hcacSettings.fanSpeedPct = fanSpeedPct;
        console.log(time + '  Fan speed set to', fanSpeedPct);
    } else {
        console.error('Invalid fan speed:', fanSpeedPct);
    }
};

// Set HVAC data
app.post('/api/hvac/set', (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('No data provided');
    }
    if (req.body.temperature !== undefined && req.body.temperature !== null) {
        setTemperature(req.body.temperature, req.body.time);
    }
    if (req.body.humidity !== undefined && req.body.humidity !== null) {
        setHumidity(req.body.humidity, req.body.time);
    }
    if (req.body.fanSpeedPct !== undefined && req.body.fanSpeedPct !== null) {
        setFanSpeedPct(req.body.fanSpeedPct, req.body.time);
    }
});

// Get HVAC data
app.get('/api/hvac/get', (req, res) => {
    res.status(200).send(hcacSettings);
});

app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
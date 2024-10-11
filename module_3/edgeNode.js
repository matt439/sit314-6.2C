const express = require('express');
const mongoose = require('mongoose');
const HVACChange = require('./models/hvacChange.js');
var plotly = require('plotly')("matt439", "NmN3mp7G2mDs0oIeENEj");
let request = require('request');

const HVAC_API_URL = 'http://localhost:3001/api/hvac';

const username = 'matt439';
const password = encodeURIComponent("hR2meini3TxmMvEh");

const port = 3000;
const base = `${__dirname}/web`;

const app = express();

mongoose.connect("mongodb+srv://" + username + ":" + password+ "@sit314.qamvs.mongodb.net/?retryWrites=true&w=majority&appName=sit314");

app.use(express.json());

var targetTemperatureRangeMax = 24;
var targetTemperatureRangeMin = 22;
var targetHumidityRangeMax = 50;
var targetHumidityRangeMin = 40;
const BUSY_THRESHOLD = 50;

var hvacChangeTempStorage = {
    x: [],
    y: [],
    type: "scatter"
};

var hvacChangeHumidityStorage = {
    x: [],
    y: [],
    type: "scatter"
};

var hvacChangeFanSpeedStorage = {
    x: [],
    y: [],
    type: "scatter"
};

function analyseRoomSensorData(data) {

    let alterTemperature = data.temperature > targetTemperatureRangeMax ||
        data.temperature < targetTemperatureRangeMin;

    let alterHumidity = data.relativeHumidity > targetHumidityRangeMax ||
        data.relativeHumidity < targetHumidityRangeMin;

    let alterChairs = data.numberUsedChairs > BUSY_THRESHOLD;
    
    if (alterTemperature || alterHumidity || alterChairs) {

        let hvacChangeRequest = {
            temperature: alterTemperature ? (targetTemperatureRangeMax + targetTemperatureRangeMin) / 2 : null,
            humidity: alterHumidity ? (targetHumidityRangeMax + targetHumidityRangeMin) / 2 : null,
            fanSpeedPct: alterChairs ? 100 : 30
        };

        let hvacData = {
            time: new Date(),
            address: data.address,
            temperature: hvacChangeRequest.temperature,
            humidity: hvacChangeRequest.humidity,
            fanSpeedPct: hvacChangeRequest.fanSpeedPct
        };

        // Send data to HVAC
        request.post({
            url: HVAC_API_URL + '/set',
            json: hvacData
        }, function (error, response, body) {
            if (error) {
                console.error('Error sending HVAC data:', error);
            } else {
                console.log('HVAC data sent:', body);
            }
        })

        let hvacChange = new HVACChange({
            address: data.address,
            time: new Date(),
            temperature: hvacChangeRequest.temperature,
            unit: 'C',
            relativeHumidity: hvacChangeRequest.humidity,
            fanSpeedPct: hvacChangeRequest.fanSpeedPct
        });

        // log the change to MongoDB then plot it
        hvacChange.save();

        // hvacChange.save().then(doc => {
        //     if (hvacData && hvacData.temperature !== null) {

        //         hvacChangeTempStorage.x.push((new Date()).toISOString());
        //         hvacChangeTempStorage.y.push(hvacData.temperature);

        //         var graphOptions = {filename: "iot-hvac-change-temp2", fileopt: "overwrite"};

        //         plotly.plot(hvacChangeTempStorage, graphOptions, function (err, msg) {
        //             if (err) {
        //                 console.error(err);
        //             } else {
        //                 console.log(msg);
        //             }
        //         });
        //     }
        // });

        // if (hvacChangeRequest && hvacChangeRequest.humidity !== null) {
        //     hvacChangeHumidityStorage.x.push((new Date()).toISOString());
        //     hvacChangeHumidityStorage.y.push(hvacChangeRequest.humidity);
        //     var graphOptions = {filename: "iot-hvac-change-humidity", fileopt: "overwrite"};
        //     plotly.plot(hvacChangeHumidityStorage, graphOptions, function (err, msg) {
        //         if (err) return console.log(err);
        //         console.log(msg);
        //     });
        // }

        // if (hvacChangeRequest && hvacChangeRequest.fanSpeedPct !== null) {
        //     hvacChangeFanSpeedStorage.x.push((new Date()).toISOString());
        //     hvacChangeFanSpeedStorage.y.push(hvacChangeRequest.fanSpeedPct);
        //     var graphOptions = {filename: "iot-hvac-change-fan-speed", fileopt: "overwrite"};
        //     plotly.plot(hvacChangeFanSpeedStorage, graphOptions, function (err, msg) {
        //         if (err) return console.log(err);
        //         console.log(msg);
        //     });
        // }
    }
};

app.post('/api/edge/sensor', (req, res) => {
    
    if (req.body === undefined) {
        return res.status(400).send('No data provided');
    }
    analyseRoomSensorData(req.body);
});

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
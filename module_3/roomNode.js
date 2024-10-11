let request = require('request');
const EDGE_API_URL = 'http://localhost:3000/api/edge/sensor';
const ROOM_ID = 1208746;
const NUM_SENSORS = 5;
const MAX_TEMP = 27;
const MIN_TEMP = 20;
const MAX_HUMIDITY = 95;
const MIN_HUMIDITY = 30;
const MAX_CHAIRS = 100;
const MIN_CHAIRS = 0;

// Function to send sensor data to the Edge API
function sendData(data) {
    if (data) {
        request.post({
            url: EDGE_API_URL,
            json: data
        }, function (error, response, body) {
            if (error) {
                console.error('Error sending sensor data:', error);
            } else {
                console.log('Sensor data sent:', body);
            }
        });
    } else {
        console.error('Error sending sensor data: Data is undefined');
    }
};

setInterval(sendSensorData, 5000);

function sendSensorData() {

    for (let i = 0; i < NUM_SENSORS; i++) {
        const sensor = {
            id: i,
            name: 'Sensor' + i,
            address: 'Room ' + ROOM_ID + '_' + i,
            time: new Date(),
            temperature: Math.floor(Math.random() * (MAX_TEMP - MIN_TEMP + 1) + MIN_TEMP),
            unit: 'C',
            relativeHumidity: Math.floor(Math.random() * (MAX_HUMIDITY - MIN_HUMIDITY + 1) + MIN_HUMIDITY),
            numberUsedChairs: Math.floor(Math.random() * (MAX_CHAIRS - MIN_CHAIRS + 1) + MIN_CHAIRS)
        };
        sendData(sensor);
    };
};
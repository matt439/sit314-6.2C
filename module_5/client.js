let request = require('request');
const URL = 'http://SIT314module5creditLoadBalancer-1394936883.us-east-1.elb.amazonaws.com:3000';

function sendSensorData() {
    // create a new random sensor reading.
    const sensor = {
        id: Math.floor(Math.random() * 100),
        name: 'Sensor ' + Math.floor(Math.random() * 100),
        address: 'Address ' + Math.floor(Math.random() * 100),
        time: new Date().toISOString(),
        temperature: Math.floor(Math.random() * 100)
    };

    // send a POST request to the server.
    request.post({
        url: URL,
        json: sensor
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
    });
}

setInterval(sendSensorData, 1);
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
var topic= "/g9j4p1n0";
var num_vertical_sensors = 10;
var num_horizontal_sensors = 10;

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function publishSensorData(x_coord, y_coord) {
    var smoke_level = generateRandomNumber(0, 100);
    var temperature = generateRandomNumber(0, 100);
    var fire = generateRandomNumber(0, 100);

    var sensor_topic = topic + '/sensor/' + x_coord + '/' + y_coord;

    var sensorData = {
        smoke: smoke_level,
        temperature: temperature,
        fire: fire
    };

    client.publish(sensor_topic, JSON.stringify(sensorData));
    console.log('published to Topic: ' + sensor_topic + " with Message: " + JSON.stringify(sensorData));
}

client.on('connect', () =>
{
    console.log('mqtt connected');

    setInterval(function() {
        for (var i = 0; i < num_horizontal_sensors; i++) {
            for (var j = 0; j < num_vertical_sensors; j++) {

                publishSensorData(i.toString(), j.toString());
            }
        }
    }, 5000);
});
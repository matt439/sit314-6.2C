const mongoose = require('mongoose');

const username = 'matt439';
const password = encodeURIComponent("hR2meini3TxmMvEh");

const express = require('express');
const weatherSensor = require('./models/weatherSensor');
const app = express();
app.use(express.json());
const port = 3000;

let latestWeatherReading = null;

mongoose.connect("mongodb+srv://" + username + ":" + password + "@sit314.qamvs.mongodb.net/?retryWrites=true&w=majority&appName=sit314");

// all the sensor Readings in MongoDB
app.get('/', async function (req, res) {
    const filter = {};// get all documents.
    const all = await weatherSensor.find(filter);
    res.send(all); // send the documents back to the client.
});

// get a specific weather reading by ID
app.get('/id', async function (req, res) {
    const filter = {_id: req.body.id}; // get documents by ID.
    const all = await weatherSensor.find(filter);
    res.send(all); // send the documents back to the client.
});

// get all the weather readings from a specific location
app.get('/location', async function (req, res) {
    const filter = {locationName: req.body.location}; // get documents by location.
    const all = await weatherSensor.find(filter);
    res.send(all); // send the documents back to the client.
});

// get the latest weather reading from a specific location
app.get('/latest/location', async function (req, res) {
    const filter = {locationName: req.body.location};//get documents by location.
    const all = await weatherSensor.find(filter);
    res.send(all[all.length - 1]); //send the documents back to the client.
});

// get the latest weather reading (could be from any location)
app.get('/latest', async function (req, res) {
    res.send(latestWeatherReading);
});

// submit a new weather reading.
app.post('/', async function (req, res) {

    // Create a new sensor reading.
    const newSensor = new weatherSensor({
        locationName: req.body.locationName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        degreeType: req.body.degreeType,
        time: req.body.time,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        feelsLike: req.body.feelsLike,
        wind: req.body.wind,
    });

    latestWeatherReading = newSensor;

    newSensor.save().then(doc => {
  console.log("Saving Sensor reading to Database");
  console.log(doc);
    }).then(() => {
    });
  res.end('Added Data!'); // return back to the client.
});

// update a weather reading by ID
app.put('/', async function (req, res) {
    const filter = {_id: req.body._id};//get documents by ID.
    const update = req.body; //get the updated data from the client.
    const all = await weatherSensor.updateOne(filter, update);
    res.send(all); //send the documents back to the client.
});

// delete a weather reading by ID
app.delete('/', async function (req, res) {
    const filter = {_id: req.body._id}; // get documents by ID.
    const all = await weatherSensor.deleteOne(filter);
    res.send(all); // send the documents back to the client.
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
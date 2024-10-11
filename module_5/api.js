const mongoose = require('mongoose');

const username = 'matt439';
const password = encodeURIComponent("hR2meini3TxmMvEh");

const express = require('express');
const sensor = require('./models/sensor');
const app = express();
app.use(express.json());
const port = 3000;

mongoose.connect("mongodb+srv://" + username + ":" + password + "@sit314.qamvs.mongodb.net/?retryWrites=true&w=majority&appName=sit314");

// submit a new weather reading.
app.post('/', async function (req, res) {

    // Create a new sensor reading.
    const newSensor = new sensor({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        time: req.body.time,
        temperature: req.body.temperature
    });

    newSensor.save().then(doc => {
        console.log("Saving Sensor reading to Database");
        console.log(doc);
    }).then(() => {
    });
    res.end('Added Data!'); // return back to the client.
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
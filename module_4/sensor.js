let request = require('request');
let url = `http://localhost:3000`;
var weather = require('weather-js');

// function to convert location name to the format required by the weather-js library
function convertLocationName(location){

    // find underscore index
    var underscoreIndex = location.indexOf("_");
    // change to comma and space
    location = location.substring(0, underscoreIndex) + ", " + location.substring(underscoreIndex + 1);
    return location;
}

// function to get the weather data from the weather-js library and
// convert it to the format required by the API
function getWeather(location, callback) {
    location = convertLocationName(location);
    console.log(location);

    weather.find({ search: location, degreeType: 'C' }, function (err, result) {
        if (err) {
            console.log(err);
            return callback(false);
        }
        if (!result || result.length === 0) {
            return callback(false);
        }

        // create JSON object which matches the schema of the WeatherSensor model
        var weatherJSON = {
            locationName: location,
            latitude: result[0].location.lat,
            longitude: result[0].location.long,
            degreeType: 'C',
            time: result[0].current.date + " " + result[0].current.observationtime,
            temperature: result[0].current.temperature,
            humidity: result[0].current.humidity,
            feelsLike: result[0].current.feelslike,
            wind: result[0].current.winddisplay
        }
        return callback(weatherJSON);
    });
}

// get the location from the command line arguments
// it should be in the format "city_country"
// for example, "Melbourne_AU"
var arg = process.argv.slice(2);

// check if the location is provided
// if not, exit the program
if (arg.length == 0){
    console.log("No location provided");
    process.exit(1);
}

// get the weather data and send it to the API
getWeather(arg[0], function (result) {
    if (result === false) {
        console.log("Invalid location");
        process.exit(1);
    }

    console.log(result);

    // send the JSON object to the API
    request.post({
        url: url,
        json: result
    }, function (err, res, body) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(body);
    });
});
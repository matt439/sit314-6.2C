function decodeTopic(topic) {
    var sensorIndex = topic.indexOf("sensor");
    var firstSlash = sensorIndex + 6;
    var secondSlash = topic.indexOf("/", firstSlash + 1);

    var xCoord = topic.substring(firstSlash + 1, secondSlash);
    var yCoord = topic.substring(secondSlash + 1, topic.length);
    return { x: xCoord, y: yCoord };
}

var payload = msg.payload;
var topic = msg.topic;

var coords = decodeTopic(topic);

return {
    payload: {
        x: coords.x,
        y: coords.y,
        fire: payload.fire,
        smoke: payload.smoke,
        temperature: payload.temperature
}};
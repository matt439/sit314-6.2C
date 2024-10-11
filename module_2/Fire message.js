var value = msg.payload;

var message = "Fire has been detected at coordinates x:" +
    value.x + ", y:" + value.y + ".";

return {payload: message};
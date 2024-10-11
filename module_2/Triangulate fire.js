var value = msg.payload;
var x, y;

if (Array.isArray(value))
{
    var count = value.length;

    // triangulate fire with mean of coordinates
    var x_sum = 0;
    var y_sum = 0;
    for (var i = 0; i < count; i++)
    {
        x_sum += value[i].x;
        y_sum += value[i].y;
    }

    x = x_sum / count;
    y = y_sum / count;
}
else
{
    x = value.x;
    y = value.y;
}

return {payload: {x: x, y: y}};
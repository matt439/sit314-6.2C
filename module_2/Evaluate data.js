var value = msg.payload;

const alerts = [];
for (let i = 0; i < value.length; i++) {
    const { fire, smoke, temperature, x, y } = value[i];
    if (fire > 80 && smoke > 70 && temperature > 50) {
        alerts.push({ x, y });
    }
}

return {payload: alerts};
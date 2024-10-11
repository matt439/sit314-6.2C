#include <BH1750.h>
BH1750 sensor(0x23, Wire);
void setup()
{
    sensor.begin();
    sensor.set_sensor_mode(BH1750::forced_mode_high_res2);
    Serial.begin();
}
void loop()
{
    sensor.make_forced_measurement();
    Particle.publish("lux-sensor", String(sensor.get_light_level()), PRIVATE);
    delay(10000);
}

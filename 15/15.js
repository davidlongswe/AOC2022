const fs = require("fs");
const { CLIENT_RENEG_WINDOW } = require("tls");

const sensorData = fs
  .readFileSync("15.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => {
    // Ex: Sensor at x=2, y=18: closest beacon is at x=-2, y=15
    const [sensorX, sensorY, beaconX, beaconY] = x.match(/\d+/gi);
    return {
      sensorX,
      sensorY,
      beaconX,
      beaconY,
    };
  });

class Sensor {
  constructor(x, y, closestBeaconX, closestBeaconY) {
    this.x = x;
    this.y = y;
    this.closestBeaconX = closestBeaconX;
    this.closestBeaconY = closestBeaconY;
  }

  distToClosestBeacon() {
    return (
      Math.abs(this.x - this.closestBeaconX) +
      Math.abs(this.y - this.closestBeaconY)
    );
  }
}

const sensors = () => {
  let sensors = [];
  for (let sensor of sensorData) {
    sensors.push(
      new Sensor(sensor.sensorX, sensor.sensorY, sensor.beaconX, sensor.beaconY)
    );
  }
  return sensors;
};

for (let sensor of sensors()) {
  console.log(sensor.distToClosestBeacon());
}

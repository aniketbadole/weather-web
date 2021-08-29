const request = require("request");

const weatherstack = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=49822248b42bacdfbc4635a09fb677eb&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the api", undefined);
    } else if (body.error) {
      callback(
        `Error ${body.error.code}: ${body.error.info} ${url}`,
        undefined
      );
    } else {
      callback(
        undefined,
        `🕐 Local time: ${body.location.localtime.slice(
          11,
          16
        )}, 🌡 Temperature: ${body.current.temperature}°C, Feels like ${
          body.current.feelslike
        }°C, Humidity is ${
          body.current.humidity
        }%. It is currently ${body.current.weather_descriptions[0]
          .toString()
          .toLowerCase()} outside.`
      );
    }
  });
};

module.exports = weatherstack;

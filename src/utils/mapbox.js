const request = require("request");

const mapbox = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFwbmlrZXQiLCJhIjoiY2tzcmQyYmZ1MGxmNzMxbzN3ZW5vNHNiNyJ9.Q2ii5wECHepRjjua5y9uEQ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to the api", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found", undefined);
    } else {
      const responseData = body.features[0];
      const latitude = responseData.center[1];
      const longitude = responseData.center[0];
      const location = responseData.place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = mapbox;

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const mapbox = require("./utils/mapbox");
const weatherstack = require("./utils/weatherstack");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aniket Badole",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aniket Badole",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Aniket Badole",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  mapbox(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    weatherstack(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ location, forecast: weatherData, address: req.query.address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aniket Badole",
    errorMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aniket Badole",
    errorMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

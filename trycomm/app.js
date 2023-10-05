const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    try {
      console.log("aia");
      // Create a JSON payload and send it as the response
      const jsonResponse = {
        message: "oooooooooo",
      };
      res.status(200).json(jsonResponse);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

app.get("/welcome", (req, res) => {
    try {
      console.log("aia");
      // Create a JSON payload and send it as the response
      const jsonResponse = {
        message: "Welcome",
      };
      res.status(200).json(jsonResponse);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

app.get("/calcolo", (req, res) => {
    try {
      console.log("sto calcolando...");
      const lat1 = req.body.lat1;
      const lon1 = req.body.lon1;
      const lat2 = req.body.lat2;
      const lon2 = req.body.lon2;


      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI/180; // φ, λ in radians
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;
      
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
      const d = R * c; // in metres


      res.status(200).json(d);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = app;
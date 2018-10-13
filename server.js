import express from "express";
import path from "path";
import axios from "axios";
import bodyParser from "body-parser";
import request from "request";
const app = express();

require('dotenv').config();

app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

app.get("/test", (req, res) => {
  console.log("Here!");
  request.get('https://api.typeform.com/forms/Aq7be1/responses', {
  'auth': {
    'bearer': process.env.TYPEFORM_ACCESS_TOKEN
  }
},
(error, response) => {
  console.log(response.body);

  var data = JSON.parse(response.body);
  console.log(data);

  //Declare array to hold geolocations
  var locs = [];

  //Declare array to hold movement
  var movs = [];

  data.items.forEach((elem) => {
    if (elem.answers) {
      console.log(elem.answers[0].text + " " + elem.answers[1].text);
      if (!locs.includes(elem.answers[0].text.toLowerCase())) {
        locs.push(elem.answers[0].text.trim().toLowerCase());
      }
      if (!locs.includes(elem.answers[1].text.toLowerCase())) {
        locs.push(elem.answers[1].text.trim().toLowerCase());
      }
    }
  });

  locs.forEach((loc) => {
    // axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + loc.split(" ").join("+") + "&key=" + process.env.GOOGLE_API_KEY)
    //   .then((error, response) => {
    //     console.log(error);
    //   });
    console.log(loc);
  });
  res.status(200).json({
    success: true,
    data: locs
  });
});


})

app.listen(process.env.PORT || 8080);

var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var users = require('../database-mongo');
var Models = require('./models');


var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/users', function (req, res) {

  var yelpResponse;

  var yelpRequest = {
    latitude: 37.783749799999995,
    longitude: -122.40914869999999,
    searchTerm:'food'
  }

  var weatherRequest = {
    latitude: 37.783749799999995,
    longitude: -122.40914869999999, 
  }

  if (req.query.latitude > 0) {
    yelpRequest.latitude = req.query.latitude
    weatherRequest.latitude = req.query.latitude
  }

  if (req.query.longitude > 0) {
    yelpRequest.longitude = req.query.longitude
    weatherRequest.longitude = req.query.longitude
  }
  
  var dataQuery = {
        temp: 74,
        time: new Date().getHours()
      }

  console.log('Before weather')

  // Models.getWeatherInfo(weatherRequest)
  // .then((data) => { 
  //   if (data.cod === 500) {
  //     var dataQuery = {
  //       temp: 74,
  //       time: new Date().getHours()
  //     }
  //   } else {
  //     var dataQuery = {
  //       temp: (JSON.parse(data)).main.temp,
  //       time: new Date().getHours()
  //     }
  //   }
  //   console.log('Before db')
  //   return Models.getYelpQueryString(dataQuery)
  //   //Make a database call based on temp and location
  // })
  Models.getYelpQueryString(dataQuery)
  .then((data) => {
    yelpRequest.searchTerm = data[0].searchText;
    console.log(yelpRequest.searchTerm)
    if (yelpRequest.searchTerm === undefined || yelpRequest.searchTerm === '') {
      yelpRequest.searchTerm = 'coffee'
    }
    console.log('Before Yelp')
    return Models.getBusinessesData(yelpRequest)
  })
  .then((data) => {
    yelpResponse = data;
    res.send(yelpResponse);
  })
  .catch((err) => {
    res.sendStatus(500);
  })

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


var http = require('http');
var config = require('../config.js');

exports.getWeatherInfo = function(req, res) {

    var cityID = req.params.id;
    var apikey = config.weather.apikey;

    http.get({
        hostname: 'api.openweathermap.org',
        port: 80,
        path: '/data/2.5/forecast?id='+cityID+'&units=metric&lang=de&cnt=5&mode=json&APPID='+apikey,
        agent: false  // create a new agent just for this one request
    }, function(weatherdata) {
      var body = '';
      weatherdata.on('data', function (chunk) {
         body += chunk;
      });
      weatherdata.on('end', function() {
        res.send(body);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

};

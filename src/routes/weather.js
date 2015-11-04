var http = require('http');
var config = require('../config.js');

exports.getWeatherInfo = function(req, res) {

    var cityID = req.params.id;
    var apikey = config.weather.apikey;
    console.log(cityID, apikey);

    http.get('http://api.openweathermap.org/data/2.5/forecast?id='+cityID+'&units=metric&lang=de&cnt=5&mode=json&APPID='+apikey, function(result) {
      console.log(result);
      //(result);
    })
    .on("socket", function (socket) {
      console.log('sock', socket);
      socket.emit("agentRemove");
    })
    .on('error', function(e) {
      console.log("Got error: " + e.message);
    });

};

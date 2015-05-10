var express = require('express');
var cors = require('cors');
var nodeGallery = require('node-gallery');
var bodyParser = require('body-parser');

var shoppinglist = require('./routes/shoppinglist.js');
var gallery = require('./routes/gallery.js');
var station = require('./routes/station.js');
var guestbook = require('./routes/guestbook.js');
var trello = require('./routes/trello.js');
var webrtc = require('./routes/webrtc.js');

var app = express();
var config = require("./config.js");

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));


/* shopping list routes */
app.get('/list', shoppinglist.findAll);
app.get('/list/:id', shoppinglist.findById);
app.post('/list', shoppinglist.add);
app.put('/list/:id', shoppinglist.update);
app.delete('/list/:id', shoppinglist.delete);
app.delete('/list', shoppinglist.deleteAll);

/* gallery routes */
app.use('/gallery', nodeGallery({
  staticFiles : 'resources/photos',
  urlRoot : 'gallery',
  title : 'Example Gallery',
  render : false
}), gallery.getPictures);

/* station monitor routes */
app.get('/station/:id', station.getStationInfo);

/* station monitor routes */
app.get('/guestbook', guestbook.getGuestbookData);
app.post('/guestbook', guestbook.postGuestbookEntry);

/* Trello login */
app.get('/login', trello.login);

/* WebRTC */
app.get('/webrtc', webrtc.run);

//static frontend
app.use(express.static(__dirname + '/frontend'));

app.listen(config.port);
console.log("the app will run on:",config.port);

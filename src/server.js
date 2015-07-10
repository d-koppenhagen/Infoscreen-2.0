var express = require('express');
var cors = require('cors');
var nodeGallery = require('node-gallery');
var bodyParser = require('body-parser');

var shoppinglist = require('./routes/shoppinglist.js');
var gallery = require('./routes/gallery.js');
var station = require('./routes/station.js');
var guestbook = require('./routes/guestbook.js');
var trello = require('./routes/trello.js');

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
/*
@param {string, required} staticFiles The directory where your album starts - can contain photos or images
@param {string, required} urlRoot The root URL which you pass into the epxress router in app.use (no way of obtaining this otherwise)
@param {string, optional} title Yup, you guessed it - the title to display on the root gallery
@param {boolean, optional} render Default to true. If explicitly set to false, rendering is left to the next function in the chain - see below.
@param {string, optional} thumbnail.width Thumbnail image width, defaults '200'
@param {string, optional} thumbnail.height as above
@param {string, optional} image.width Large images width defaults '100%'
@param {string, optional} image.height as above
*/
app.use('/gallery', nodeGallery({
  staticFiles : 'resources',
  urlRoot : 'gallery',
  title : 'Gallery',
  render : false
}), gallery.getPictures);

/* station monitor routes */
app.get('/station/:id', station.getStationInfo);

/* station monitor routes */
app.get('/guestbook', guestbook.getGuestbookData);
app.post('/guestbook', guestbook.postGuestbookEntry);

/* Trello login */
app.get('/login', trello.login);

//static frontend
var staticPath = '/frontend'
if (config.minified) staticPath +='-min';

app.use(express.static(__dirname + staticPath));

app.listen(config.port);
console.log("the app will run on:",config.port);

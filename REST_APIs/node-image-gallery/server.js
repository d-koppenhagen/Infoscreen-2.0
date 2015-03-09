var express = require('express');
var nodeGallery = require('node-gallery');
var cors = require('cors');

var app = express();
var port = 7333;
var settings = require("./settings.js");
var apikey = settings.apikey;
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
app.use(cors());

app.use('/gallery', nodeGallery({
  staticFiles : 'resources/photos',
  urlRoot : 'gallery',
  title : 'Example Gallery',
  render : false
}), function(req, res, next){
  /*
   We MUST add another middleware function to the chain when render is false.
   just return the raw HTML data - we could partial into another template here,
   pass the JSON data into a template
   */
   /*
   req.html -> return html data
   req.data -> retrun json raw data ; you have to set 'render' to 'false'
   */
   console.log(req.query.apikey);
   if (req.query.apikey == apikey) {
     console.log("received new request! - right API key.")
     return res.send(req.data);
   }
   else {
     console.error("wrong API key!");
     res.status(401).send("Wrong API Key!");
   }
});

app.get('/', function(req, res){
   res.send('Hi, you can reach me on path: /gallery !');
});

app.listen(port);
console.log("the app will run on:",port);

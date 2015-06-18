var nodeGallery = require('node-gallery');
var config = require("../config.js");

exports.getPictures = function(req, res, next){
  /*
   We MUST add another middleware function to the chain when render is false.
   just return the raw HTML data - we could partial into another template here,
   pass the JSON data into a template
   */
   /*
   req.html -> return html data
   req.data -> retrun json raw data ; you have to set 'render' to 'false'
   */
   if (req.query.apikey == config.apikey) {
     console.log("received new request! - right API key.")
     return res.send(req.data);
   }
   else {
     console.error("wrong API key!");
     res.status(401).send("Wrong API Key!");
   }
};

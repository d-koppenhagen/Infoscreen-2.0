var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config.mysqlGBcred);
connection.connect();

exports.getGuestbookData = function(req, res) {
    connection.query('SELECT * FROM guestbook ORDER BY timestamp DESC', function(err, rows, fields) {
      if (err) throw err;

      //set link for random images with first three letters of author name
      for(i=0; i<rows.length; i++){
        rows[i].img = 'http://lorempixel.com/56/56/abstract/'+ rows[i].name.substring(0, 3);
      }

      res.send(rows);
    });
};

exports.postGuestbookEntry = function(req, res) {
    var name = req.body.name;
    var message = req.body.message;
    console.log(name, message);
    connection.query('INSERT INTO guestbook (id, name, text, timestamp) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP)', [name, message], function (err, rows, fields) {
        if (err) throw err;
        res.send('success');
    });
};

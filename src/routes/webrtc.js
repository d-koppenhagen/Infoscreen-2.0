var socketio = require('socket.io');
var http = require('http');
var uuid = require('node-uuid');
var http = require('http');
var express = require('express');




var app = express();

var rooms = {};
var userIds = {};


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

var server = http.createServer(app);


exports.run = function (config) {

  socketio.listen(server, { log: false })
  .on('connection', function (socket) {
    var currentRoom, id;

    socket.on('init', function (data, fn) {
      currentRoom = (data || {}).room || uuid.v4();
      var room = rooms[currentRoom];
      if (!data) {
        rooms[currentRoom] = [socket];
        id = userIds[currentRoom] = 0;
        fn(currentRoom, id);
        console.log('Room created, with #', currentRoom);
      } else {
        if (!room) {
          return;
        }
        userIds[currentRoom] += 1;
        id = userIds[currentRoom];
        fn(currentRoom, id);
        room.forEach(function (s) {
          s.emit('peer.connected', { id: id });
        });
        room[id] = socket;
        console.log('Peer connected to room', currentRoom, 'with #', id);
      }
    });

    socket.on('msg', function (data) {
      var to = parseInt(data.to, 10);
      if (rooms[currentRoom] && rooms[currentRoom][to]) {
        console.log('Redirecting message to', to, 'by', data.by);
        rooms[currentRoom][to].emit('msg', data);
      } else {
        console.warn('Invalid user');
      }
    });

    socket.on('disconnect', function () {
      if (!currentRoom || !rooms[currentRoom]) {
        return;
      }
      delete rooms[currentRoom][rooms[currentRoom].indexOf(socket)];
      rooms[currentRoom].forEach(function (socket) {
        if (socket) {
          socket.emit('peer.disconnected', { id: id });
        }
      });
    });
  });
};

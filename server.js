'use strict';

var express = require('express'),
	http = require('http'), 
    socketio = require('socket.io');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});


var io = require('socket.io').listen(9001);
// var io = socketio.listen(http.createServer(app));

//io.set('log level', 1000);
io.sockets.on('connection', function (socket) {
	console.log('connecting');
  io.sockets.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});



// Expose app
exports = module.exports = app;

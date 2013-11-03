var express = require('express')
var app = express();

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/app'));

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

	function log() {
		var array = [">>> "];
		for (var i = 0; i < arguments.length; i++) {
			array.push(arguments[i]);
		}
		socket.emit('log', array);
	}

	socket.on('message', function(message) {
		log('Got message: ', message);
		socket.broadcast.emit('message', message); // should be room only
	});

	socket.on('create or join', function(room) {
		var numClients = io.sockets.clients(room).length;

		log('Room ' + room + ' has ' + numClients + ' client(s)');
		log('Request to create or join room', room);

		if (numClients == 0) {
			socket.join(room);
			socket.emit('created', room);
		} else {
			io.sockets. in (room).emit('join', room);
			socket.join(room);
			socket.emit('joined', room);
		}
		socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

	});
});

server.listen(3000);
var express = require('express')
var app = express();

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/viewer', express.static(__dirname + '/viewer'));
app.use('/recorded_videos', express.static(__dirname + '/recorded_videos'));
app.use(express.static(__dirname + '/app'));

app.use(express.bodyParser());

var recFolder = __dirname + '/recorded_videos';
var fs = require('fs');
if (!fs.existsSync(recFolder)) {
	fs.mkdirSync(recFolder)
	fs.writeFileSync(recFolder + '/recorded.json', '[]');
}

app.post('/uploadVideo', function(req, resp) {
	console.log('Uploading Video')
	var data = JSON.parse(fs.readFileSync(recFolder + '/recorded.json'));
	data.push({
		loc: '/recorded_videos/' + req.files.video.name
	});
	fs.writeFileSync(recFolder + '/recorded.json', JSON.stringify(data));
	console.log('Written recorded.json');
	fs.createReadStream(req.files.video.path).pipe(fs.createWriteStream(recFolder + '/' + req.files.video.name));
	console.log('Moved Video files');
	resp.send('Saved Video');
});

app.get('/profile', function(req, resp) {
	var request = require('request');
	request({
			url: 'https://testapi.ark.com/email/' + req.query.name,
			headers: {
				api_token: '04b2d11f-0c99-496e-b06a-175dbe81c304'
			}
		},
		function(err, response, body) {
			console.log('Got response', body)
			if (err) throw err;
			resp.send(body);
		});
});

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
app.use(express.bodyParser());
app.use(express.bodyParser());
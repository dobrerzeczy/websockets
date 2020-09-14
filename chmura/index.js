var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const players = {};

io.on('connection', (socket) => {
  const powitanie = 'no elo';
  socket.emit('welcomeMessage', powitanie);

  socket.on('changePosition', position => {
    console.log('position changed', position);

    socket.broadcast.emit('newPosition', {
      x: position.x,
      y: position.y,
      id: socket.id
    });
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
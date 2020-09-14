var app = require('express')();
var http = require('http').createServer(app);
const io = require(`socket.io`)(http)



app.get('/', (req, res) => {
  res.sendFile(__dirname + `/index.html`)
});



io.on('connection', (socket) => {
    console.log(`user connected`)
    socket.on(`changeposition`, position =>
    {
        console.log(`box zmienia pozycje`, position)

        socket.broadcast.emit(`newPosition`, {
            x: position.x,
            y: position.y,
            id: socket.id
        })
    })
})


http.listen(3000, () => {
  console.log('listening on *:3000');
});
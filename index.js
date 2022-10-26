const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// websocket
const { Server } = require("socket.io");
const io = new Server(server);

// mqtt
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://157.230.255.247:1883')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'  );
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

client.on('connect', function () {
  client.subscribe('test')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  io.emit('chat message', message.toString());  
})

server.listen(3005, () => {
  console.log('listening on *:3005');
});
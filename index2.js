const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { io } = require("socket.io-client");
var socket = io("http://localhost:3005");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

socket.on("chat message", function (msg) {
  console.log('message: ' + msg)
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
const express = require('express');
const app = express();
const socketIo = require('socket.io');


const http = require('http');
const server = http.Server(app);
const io = socketIo(server);
// websocket

//io class Server
//io.of(namespace) pour se connecter sur un namespace class Namespace


const getQuestion = require('./question/QuestionController.js');
const Api = require('./api.js');
require('dotenv').config()


server.listen(3100, function () {
  console.log('Example app listening on port 3100!');
});
/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

app.get(['/','/question','/question/:category'], getQuestion);

const rooms = {
  smash_lab: []
}
io.on('connection', (socket) => {
  if(rooms.smash_lab.length > 1)socket.disconnect(true);

  rooms.smash_lab.push(socket.id);
  socket.join('smash_lab');
  socket.emit('lab', socket.id);

  socket.on('start', () => {
    
    socket.to('smash_lab').broadcast.emit('match', socket.id);
  });

  socket.on('heroSelected', (hero_id) => {
    socket.to('smash_lab').broadcast.emit('enemySelection', hero_id);
  });

  socket.on('disconnect', () => {
    rooms.smash_lab.splice(rooms.smash_lab.indexOf(socket.id), 1);
    // console.log(rooms);
    // do some stuff
    console.log('disconnect');
  });
});


app.use('/api', Api);





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

// const rooms = {
//   smash_lab: []
// }
var rooms = [['room_1', []]];

io.on('connection', (socket) => {
  // choose or create a new room for the new user
  giveRoomUser(socket);

  socket.emit('lab', socket.id);

  // get the user room
  var userRoom = getRoomUser(socket);

  socket.on('start', () => {
    socket.to(userRoom).broadcast.emit('start', socket.id);
  });

  socket.on('match', () => {
    socket.to(userRoom).broadcast.emit('match', socket.id);
  })

  socket.on('heroSelected', (hero_id) => {
    socket.to(userRoom).broadcast.emit('enemySelection', hero_id);
  });

  socket.on('attack', (enemy) => {
    socket.to(userRoom).broadcast.emit('attack', enemy);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id);
    clearRooms(socket);
  });
});

function getRoomUser(socket) {
  for(var i = 0; i < rooms.length; i++)
  {
    // room[0] -> name of room, room[1] -> list users
    var room = rooms[i];
    if(room[1].includes(socket.id))
    {
      //return then name of the room;
      return room[0];
    }
  }
}

app.use('/api', Api);

function giveRoomUser(socket) {
  // we check if their is no room available
  var available = false;
  if(rooms.length < 1)
  {
    rooms.push(['room_1', [socket.id]]);
    socket.join(new_room);
  }
  else
  {
    for(var i = 0; i < rooms.length; i++)
    {
      // room[0] -> name of room, room[1] -> list users
      var room = rooms[i];
      if(room[1].length < 2 && !available)
      {
        room[1].push(socket.id);
        socket.join(room[0]);
        available = true;
      }
    }
    //if no rooms are available
    if(!available)
    {
      var lastRoom = rooms[rooms.length - 1];
      // name of the new room
      var newNumber =  parseInt(lastRoom[0].split("_")[1]) + 1;
      var new_room = 'room_' + newNumber;
      rooms.push([new_room, [socket.id]]);
      socket.join(new_room);
    }
  }
}

function clearRooms (socket) {

  for(var i = 0; i < rooms.length; i++)
  {
    // room[0] -> name of room, room[1] -> list users
    var room = rooms[i];
    if(room[1].includes(socket.id))
    {
      if(room[1].length > 1)
      {
        var user = room[1].indexOf(socket.id);
        console.log('user delete of : ' + rooms[i][0]);
        room[1].splice(user, 1);
      }
      else
      {
        console.log('rooms delete : ' + rooms[i][0]);
        rooms.splice(i, 1);
      }
      //return then name of the room;
      console.log(rooms);
    }
  }
}

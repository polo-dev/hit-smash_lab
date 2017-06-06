var express = require('express');
var app = express();
const getQuestion = require('./question/QuestionController.js');
const Api = require('./api.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config();

io.on('connection', function(socket){
  console.log('a user connected : ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.get(['/','/question','/question/:category'], getQuestion);

app.use('/api', Api);

http.listen(3100, function(){
  console.log('listening on *:3000');
});
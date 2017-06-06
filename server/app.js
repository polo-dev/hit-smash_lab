var express = require('express');
var app = express();
const getQuestion = require('./question/QuestionController.js');
const Api = require('./server.js');
require('dotenv').config()

app.get(['/','/question','/question/:category'], getQuestion);

app.use('/api', Api);

app.listen(3100, function () {

  console.log('Example app listening on port 3100!');
});
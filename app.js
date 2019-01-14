var express = require('express');
var app = express();
var birds = require('./route.js');

app.use('/mqtt', birds);
 
app.get('/', function (req, res) {
  res.end('Health');
});
 
app.listen(4000);
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mqtt_routes = require('./route.js');

app.use(bodyParser.json())
app.use('/mqtt', mqtt_routes);
 
app.get('/', function (req, res) {
  res.end('Health');
});
 
app.listen(4000);
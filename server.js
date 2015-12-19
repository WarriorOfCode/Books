var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('express');
});

app.listen(3000);
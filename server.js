var express = require('express');
var app = express();
var api = require('./api');

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index.html');
});

app.use('/api', api);

app.listen(3000);
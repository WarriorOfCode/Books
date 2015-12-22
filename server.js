var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var api = require('./api');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/registration', function(req, res){
	res.render('registration.html');
})


app.listen(3000);
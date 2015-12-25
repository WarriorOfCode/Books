var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var api = require('./api');

var mysql      = require('mysql');
var config = require('./config.js');
var connection = mysql.createConnection({
  
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database: config.dbname
});


app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	connection.query('SELECT Name FROM Books', function(err, rows) {
		if (err) throw err;
  		//res.json(rows);
	
  res.render('index.html', {data: rows});
  });
});

app.get('/registration', function(req, res){
	res.render('registration.html');
})


app.listen(3000);
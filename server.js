var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var api = require('./api');

var mysql = require('mysql');
var config = require('./config.js');
var connection = mysql.createConnection({
  
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database : config.dbname
});


app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static(__dirname + '/public'));

app.get('/book/:id', function(req, res){
	if (req.params.id == null) res.redirect('/');
	connection.query('SELECT * FROM Books WHERE id = ? LIMIT 1', req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0)
			res.render('book.html', {book: rows});
		else
			res.redirect('/');
	});
} );

app.get('/admin', function(req, res){
	res.render('admin.html');
});

app.get('/', function(req, res){
	connection.query('SELECT * FROM Books', function(err, rows) {
		if (err) throw err;
		res.render('index.html', {data: rows});
  });
});

app.get('/registration', function(req, res){
	res.render('registration.html');
});

app.get('/login', function(req, res){
	res.render('login.html');
});


app.listen(3000);
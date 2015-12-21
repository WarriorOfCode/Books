var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var config = require('./config.js');
var connection = mysql.createConnection({
  
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database: config.dbname
});



router.get('/users', function (req, res){
	
	connection.connect();

	connection.query('SELECT * FROM users', function(err, rows) {
		if (err) throw err;
  		res.json(rows);
	});

	connection.end();

});

router.post('/user', function(req, res){
	/*connectn.connect();

	connect.query('INSERT INTO users (NickName, Name, LastName, BirthData) VALUES ()', function(err, rows){
		if (err) throw err;*/
		console.log(req.body);
		res.send("Данные добавлены!");
	//})
})

module.exports = router;
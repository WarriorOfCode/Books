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
	connection.connect();

	connection.query("INSERT INTO users (Name, LastName, NickName) VALUES ('"+req.body.name+"', '"+req.body.surname+"', '"+req.body.nickName+"')", function(err, rows){
		if (err) throw err;
		res.send("Данные добавлены!");
	});
	connection.end();
	//console.log(req.body.name);
})

module.exports = router;
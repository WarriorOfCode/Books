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
	connection.query("SELECT Email FROM users WHERE Email='"+req.body.email+"'", function(err, rows2){
		if (err) throw err;
		if (rows2!=0) res.send("Email занят!");
		connection.query("SELECT NickName FROM users WHERE NickName='"+req.body.nickName+"'", function(err, rows1){
			if (err) throw err;
			if (rows1!=0)
			{
				res.send("Login занят");
				return;
			}
			connection.query("INSERT INTO users (Email, password, NickName) VALUES ('"+req.body.email+"', '"+req.body.password+"', '"+req.body.nickName+"')", function(err, rows){
			if (err) throw err;
			res.send("Данные добавлены!");
			});
	
		});
	});
	/*connection.query("INSERT INTO users (Email, password, NickName) VALUES ('"+req.body.email+"', '"+req.body.password+"', '"+req.body.nickName+"')", function(err, rows){
		if (err) throw err;
		res.send("Данные добавлены!");
	});
	*/
	//console.log(req.body.name);
})

module.exports = router;
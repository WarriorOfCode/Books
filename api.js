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

router.post('/user', function (req, res) {

	var selectSql = "SELECT Email FROM users WHERE Email= ? OR NickName=?";
	var selectParams = [req.body.email, req.body.nickName];

	var insertSql = "INSERT INTO users (Email, password, NickName) VALUES (?,?,?)";
	var insertParams = [req.body.email, req.body.password,  req.body.nickName];

	var errorEmail = {"error": true, "message": 'Email занят', "emailError": true};
	var errorLogin = {"error": true, "message": 'Login занят', "emailError": false};
	var success = {"error": false, "message": "Вы успешно зарегистрированны!"};

	connection.query(selectSql, selectParams, function (err, rows1) {
		if (err) throw err;

		if (rows1 != null && rows1.length > 0) {
			if (rows1[0].Email == req.body.email) {
				res.json(errorEmail); 
			} else {
				res.json(errorLogin);
			}
		} else {
			connection.query(insertSql, insertParams, function (err, rows2) {
				if (err) throw err;
				
				res.json(success);
			});
		}
	});

})

module.exports = router;
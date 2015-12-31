var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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

router.post('/login', function(req, res){
	var errorLogin = {"error": true, "message": 'Ошибка входа!'};
	var success = {"error": false, "message": "Вы успешно вошли!"};
	connection.query("SELECT * FROM users WHERE NickName =?", req.body.nickName, function(err, rows){
		if (err) throw err;

		if (rows[0].password==req.body.password) {
			if (rows[0].permissions > 0) {
				success.message = "Вы Админ!";
			} else {
				success.message = "Вы пользователь!";
			}

			res.json(success);
		} else {
			res.json(errorLogin);
		}
	});
});

router.post('/book', function(req, res){
	var selectBooks = "SELECT * FROM Books WHERE Name = ?";
	var selectBA = "SELECT * FROM books_authors WHERE id_book = ?";
	var selectAuthors = "SELECT * FROM Authors WHERE id = ?";
	var insertSql = "INSERT INTO Books (Name, Description, number_of_pages) VALUES (?,?,?)";
	var insertParams = [req.body.name, req.body.description,  req.body.page];
	var errorbook = {"error": true, "message": 'Такая книга уже зарегистрированна!'};
	var success = {"error": false, "message": "Вы успешно зарегистрированны!"};

	connection.query(selectBooks, req.body.name, function(err, rows){
		if (err) throw err;
		if (rows != null && rows.length > 0){
			connection.query(selectBA, rows[0].id, function(err, rows1){
				if(err) throw err;
				connection.query(selectAuthors, rows1[0].id_author, function(err, rows2){
					if (err) throw err;
					if (rows2[0].Name == req.body.authorName && rows2[0].Last_Name == req.body.authorLastName){
						res.json(errorbook);
					} else {
						connection.query(insertSql, insertParams, function(err, rows3){
							if (err) throw err;
							res.json(success);
						});
						
					}
				});
			});
		} else{
			connection.query(insertSql, insertParams, function(err, rows3){
				if (err) throw err;
				res.json(success);
			});
		}
	});
});

router.post('/user', function (req, res) {

	var selectSql = "SELECT Email FROM users WHERE Email = ? OR NickName =?";
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
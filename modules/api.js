var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/users', function (req, res){	

	connection.query('SELECT * FROM users', function(err, rows) {
		if (err) throw err;
  		res.json(rows);
	});

});

router.post('/login', function(req, res){
	var errorLogin = {"error": true, "message": 'Ошибка входа!'};
	var success = {"error": false};
	connection.query("SELECT * FROM users WHERE NickName = ?", req.body.nickName, function(err, rows){
		if (err) throw err;

		if (rows[0].password==req.body.password) {
			req.session.login = req.body.nickName;
			req.session.permissions = rows[0].permissions;
			res.json(success);
		} else {
			res.json(errorLogin);
		}
	});
});

router.get('/out', function(req, res){
	req.session.login = null;
	res.send("");
});

router.post('/author', function(req, res){
	var error = {"error": true, "message": 'Такой писатель уже зарегистрирован!'};
	var success = {"error": false, "message": "Автор успешно зарегистрирован!"};
	var insertSql = "INSERT INTO Authors (Name, Last_Name, patronymic, Birth_date, Biography, Counry_of_birth) VALUES (?,?,?,?,?,?)";
	var insertParams = [req.body.name, req.body.lastname, req.body.patronymic, req.body.age, req.body.description, req.body.country];
	var overlap;
	connection.query("SELECT * FROM Authors WHERE Name = ?", req.body.name, function(err, rows){
		if (err) throw err;
		for (var i = 0; i < rows.length; i++){
			if (rows[i].Last_Name == req.body.lastname)
				overlap = 1;
		}
		if (!overlap) {
			connection.query(insertSql, insertParams, function(err, rows1){
				if (err) throw err;
				res.json(success);
			});
		} else {
			res.json(error);
		}

	});
});

router.post('/book', function(req, res){
	var irows = 0;
	var bol = 0;
	var selectBooks = "SELECT * FROM Books WHERE Name = ?";
	var selectBA = "SELECT * FROM books_authors WHERE id_book = ?";
	var selectAuthors = "SELECT * FROM Authors WHERE id = ?";
	var insertSqlBook = "INSERT INTO Books (Name, Description, number_of_pages, Birth_data) VALUES (?,?,?,?)";
	var insertSqlISBN = "INSERT INTO Books (Name, Description, number_of_pages, Birth_data, ISBN) VALUES (?,?,?,?,?)";
	var insertSqlBA = "INSERT INTO books_authors (id_book, id_author) VALUES (?,?)";
	var insertParams = [req.body.name, req.body.description,  req.body.page, req.body.age];
	var errorbook = {"error": true, "message": 'Такая книга уже зарегистрированна!'};
	var success = {"error": false, "message": "Книга успешно добавлена!"};

	if (req.body.isbn!= null && req.body.isbn > 0)
	{
		connection.query("SELECT * FROM Books WHERE ISBN = ?", req.body.isbn, function(err, rows){
			if (err) throw err;
			if (rows!= null && rows.length > 0){
				res.json(errorbook);
			} else {
				insertParams.push(req.body.isbn)
				connection.query(insertSqlISBN, insertParams, function(err, rows3){
					if (err) throw err;
					connection.query("SELECT * FROM Books WHERE ISBN = ?", req.body.isbn, function(err, rows4){	
						if (err) throw err;				
						connection.query(insertSqlBA, [rows4[rows4.length-1].id, req.body.author], function(err, rows5){
							if (err) throw err;
							res.json(success);
						});
					});
				});
	
			};
		});
	} else {
		connection.query(selectBooks, req.body.name, function(err, rows){
			if (err) throw err;
			if (rows != null && rows.length > 0){
				for (var i = 0; i<rows.length; i++){
					connection.query(selectBA, rows[i].id, function(err, rows1){
						if(err) throw err;
						bol++;
						if (req.body.author != rows1[0].id_author){
							irows++;
						}
						if (irows == rows.length){
							connection.query(insertSqlBook, insertParams, function(err, rows3){
								if (err) throw err;
								connection.query(selectBooks, req.body.name, function(err, rows4){	
									if (err) throw err;				
									connection.query(insertSqlBA, [rows4[rows4.length-1].id, req.body.author], function(err, rows5){
										if (err) throw err;
										res.json(success);
									});
								});
							});
						} else if (bol == rows.length && irows != rows.length){
							res.json(errorbook);
						}
					});
				}
				
			} else {
				connection.query(insertSqlBook, insertParams, function(err, rows3){
					if (err) throw err;
					connection.query(selectBooks, req.body.name, function(err, rows4){	
						if (err) throw err;				
						connection.query(insertSqlBA, [rows4[rows4.length-1].id, req.body.author], function(err, rows5){
							if (err) throw err;
							res.json(success);
						});
					});
				});
			};
		});
	};
});

router.post('/user', function (req, res) {

	var selectSql = "SELECT Email FROM users WHERE Email = ? OR NickName =?";
	var selectParams = [req.body.email, req.body.nickName];

	var insertSql = "INSERT INTO users (Email, password, NickName) VALUES (?,?,?)";
	var insertParams = [req.body.email, req.body.password,  req.body.nickName];

	var errorEmail = {"error": true, "message": 'Email занят', "emailError": true};
	var errorLogin = {"error": true, "message": 'Login занят', "emailError": false};
	var success = {"error": false, "message": "Подтвердите почту!"};

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
				
				req.session.login = req.body.nickName;
				res.json(success);
			});
		};
	});

})

module.exports = router;
var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/users', function (req, res){
	connection.query('SELECT * FROM users', function(err, rows) {
		if (err) throw err;
  		res.json(rows);
	});

});

router.post('/book/user', function(req, res){
	var selectSql = "SELECT * FROM books_users WHERE id_book = ? AND id_user = ?";
	var insertSql ="INSERT INTO books_users (id_book, id_user) VALUES (?,?)";
	var deleteSql = "DELETE FROM books_users WHERE id_book = ? AND id_user = ?";
	var params = [req.body.bookId, req.session.id]; 
	connection.query(selectSql, params, function(err, rows){
		if (err) throw err;
		if (rows != null && rows.length > 0){
			connection.query(deleteSql, params, function(err, rows1){
				if (err) throw err;
				res.send(" ");
			});
		} else {
			connection.query(insertSql,params, function(err, rows1){
				if (err) throw err;
				res.send(" ");
			});
		};
	});
});

router.post('/password', function(req, res){
	var error = {"error": true, "message": 'Old password is wrong'};
	var success = {"error": true, "message": 'Password changed'}
	connection.query("SELECT password FROM Users WHERE id = ?", req.session.id, function(err, rows){
		if (err) throw err;
		if (rows[0].password == req.body.old) {
			connection.query("UPDATE Users SET password = ? WHERE id = ?", [req.body.new, req.session.id])
			res.json(success);
		} else {
			res.json(error);
		};
	})
});

router.post('/friend', function(req, res){
	if (isFinite(req.body.userId)){
		friend(req.body.userId);
	} else {
		connection.query("SELECT id FROM Users WHERE NickName = ?", req.body.userId, function (err, rows0){
			if (err) throw err;
		friend(rows0[0].id);
		});
	};

	function friend(id){
		var params = [req.session.id, id];
		var selectSql = "SELECT * FROM friends WHERE id_follower = ? AND id_following = ?";
		var deleteSql = "DELETE FROM friends WHERE id_follower = ? AND id_following = ?";
		var insertSql = "INSERT INTO friends (id_follower, id_following) VALUES (?,?)";
		connection.query(selectSql, params, function(err, rows){
			if (err) throw err;
			if (rows != null && rows.length > 0){
				connection.query(deleteSql, params, function (err, rows1){
					if (err) throw err;
					res.send(" ");
				});
			} else {
				connection.query(insertSql, params, function (err, rows1){
					if (err) throw err;
					res.send(" ");
				});
			}
		});
	};
	
});

router.post('/login', function(req, res){
	var errorLogin = {"error": true, "message": 'Ошибка входа!'};
	var success = {"error": false};
	connection.query("SELECT * FROM users WHERE NickName = ?", req.body.nickName, function(err, rows){
		if (err) throw err;

		if (rows.length>0 && rows[0].password==req.body.password){
			req.session.login = rows[0].NickName;
			req.session.id = rows[0].id;
			req.session.permissions = rows[0].permissions;
			res.json(success);
		} else {
			res.json(errorLogin);
		}
	});
});

router.get('/out', function(req, res){
	req.session.login = null;
	req.session.permissions = null;
	req.session.id = null;
	res.send("");
});

router.post('/author', function(req, res){
	var error = {"error": true, "message": 'Такой писатель уже зарегистрирован!'};
	var success = {"error": false, "message": "Автор успешно зарегистрирован!"};
	var insertSql = "INSERT INTO Authors (Name, Last_Name, patronymic, Birth_date, Biography, Counry_of_birth, image_url) VALUES (?,?,?,?,?,?,?)";
	var insertParams = [req.body.name, req.body.lastname, req.body.patronymic, req.body.age, req.body.description, req.body.country, req.body.link];
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
	var insertSqlBook = "INSERT INTO Books (Name, Description, number_of_pages, Birth_data, image_url) VALUES (?,?,?,?,?)";
	var insertSqlISBN = "INSERT INTO Books (Name, Description, number_of_pages, Birth_data, image_url, ISBN) VALUES (?,?,?,?,?,?)";
	var insertSqlBA = "INSERT INTO books_authors (id_book, id_author) VALUES (?,?)";
	var insertParams = [req.body.name, req.body.description,  req.body.page, req.body.age, req.body.link];
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
				connection.query("SELECT * FROM Users WHERE NickName = ?", req.body.nickName, function(err, rows3){
					if (err) throw err;
					req.session.login = rows3[0].NickName;
					req.session.id =rows3[0].id;
					req.session.permissions = rows3[0].permissions;
					res.json(success);
				});
			});
		};
	});
});


router.post('/edit', function(req, res){
	var updateSql = "UPDATE Users SET Name = ?, LastName = ?, Email =? WHERE id = ?";
	var params = [req.body.name, req.body.lastName, req.body.email, req.session.id]
	connection.query(updateSql, params, function(err, rows){
		if (err) throw err;
		res.json({"message": 'Saved!'})
	});
});

module.exports = router;
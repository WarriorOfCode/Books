var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var crypto = require ('crypto');
var userService = require('../services/userService');
var authorService = require('../services/authorService');
var bookService = require('../services/bookService');
var listService = require('../services/listService');

router.get('/users', function (req, res){
	userService.getUsers(function (err, rows) {
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/books', function (req, res){
	bookService.getBooksWithAuthors(function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/authors', function(req, res){
	authorService.getAuthors(function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/lists', function(req, res){
	listService.getLists(function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/lists/books', function(req, res){
	listService.getBooksInLists(function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.delete('/author/:id', function(req, res){
	authorService.deleteAuthor(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(" ");
	});
});

router.post('/author/:id', function(req, res){
	authorService.updateAuthor(req.params.id, req.body.name, req.body.lastname, req.body.patronymic, req.body.description, req.body.country, req.body.link, function(err, rows){
		if (err) throw err;
		res.json(" ");
	});
});

router.get('/connections', function (req, res){
	bookService.getConnections(function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.post('/book/:id', function (req, res){
	bookService.updateBook(req.params.id, req.body.name, req.body.description, req.body.age, req.body.link, req.body.isbn, function(err, rows){
		if (err) throw err;
		bookService.updateConnection(req.params.id, req.body.author.id, function(err, rows1){
			if (err) throw err;
			res.send(" ");
		});
	});
});

router.get('/user/books/:id', function (req, res){
	if (isFinite(req.params.id)) {
		bookService.getBooksByUserId(req.params.id, function(err, rows){
			if (err) throw err;
			res.json(rows);
		});
	} else {
		userService.getInformationByLogin(req.params.id, function(err, rows3){
			if (err) throw err;
			bookService.getBooksByUserId(rows3[0].id, function(err, rows){
				if (err) throw err;
				res.json(rows);
			});
		});
	}
});

router.put('/book/user', function(req, res){
	userService.addUserBook(req.body.bookId, req.session.id, function(err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.delete('/book/user/:id', function(req, res){
	userService.deleteUserBook(req.params.id, req.session.id, function(err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.post('/password', function(req, res){
	var error = {"error": true, "message": 'Old password is wrong'};
	var success = {"error": false, "message": 'Password changed'};

	userService.getUserInformation(req.session.id, function(err, rows){
	
		if (err) throw err;

		var oldPassword = userService.passwordEncryption(rows[0].salt, req.body.old);
		var newPassword = userService.passwordEncryption(rows[0].salt, req.body.new);

		if (rows[0].password == oldPassword) {
			userService.updateUserPassword(newPassword, req.session.id, function(err, rows){
				if (err) throw err;
				res.json(success);
			});
		} else {
			res.json(error);
		};
	});
});

router.delete('/friend/:id', function(req, res){
	if (isFinite(req.params.id)){
		unsubscribe(req.params.id);
	} else {
		userService.getInformationByLogin(req.params.id, function (err, rows){
			if (err) throw err;
			unsubscribe(rows[0].id);
		});
	}

	function unsubscribe(id){
		userService.deleteFriend(req.session.id, id, function (err, rows1){
			if (err) throw err;
			res.send(" ");
		});
	}

});

router.put('/friend', function(req, res){
	if (isFinite(req.body.userId)){
		subscribe(req.body.userId);
	} else {
		userService.getInformationByLogin(req.body.userId, function (err, rows){
			if (err) throw err;
			subscribe(rows[0].id);
		});
	}

	function subscribe(id){
		userService.addfriend(req.session.id, id, function (err, rows1){
			if (err) throw err;
			res.send(" ");
		});
	}
});

router.post('/login', function(req, res){
	var errorLogin = {"error": true, "message": 'Ошибка входа!'};
	var success = {"error": false};

	userService.getInformationByLogin(req.body.nickName, function(err, rows){
		if (err) throw err;
		if (rows.length>0){
			
			var password = userService.passwordEncryption(rows[0].salt, req.body.password)

			if (rows[0].password==password){
				req.session.login = rows[0].NickName;
				req.session.id = rows[0].id;
				req.session.permissions = rows[0].permissions;
				res.json(success);
			} else {
				res.json(errorLogin);
			}
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

router.put('/author', function(req, res){
	var error = {"error": true, "message": 'Такой писатель уже зарегистрирован!'};
	var success = {"error": false, "message": "Автор успешно зарегистрирован!"};
	authorService.getAuthorByName(req.body.name, req.body.lastname, function(err, rows){
		if (err) throw err;
		if (rows != null && rows.length > 0) {
			res.json(error);
		} else {
			authorService.addAuthor(req.body.name, req.body.lastname, req.body.patronymic, req.body.age, req.body.description, req.body.country, req.body.link, function(err, rows1){
				if (err) throw err;
				res.json(success);
			});
		}
	});
});

router.delete('/book/:id', function(req, res){
	bookService.deleteBook(req.params.id, function(err, rows){
		if (err) throw err;
		res.json({"message": 'Книга успешно удалена!'});
	})
});

router.put('/book', function(req, res){
	var errorbook = {"error": true, "message": 'Такая книга уже зарегистрированна!'};
	var success = {"error": false, "message": "Книга успешно добавлена!"};

	if (req.body.isbn!= null && req.body.isbn > 0)
	{
		bookService.getBookByISBN(req.body.isbn, function(err, rows){
			if (err) throw err;
			if (rows!= null && rows.length > 0){
				res.json(errorbook);
			} else {
				bookService.addBookWithISBN(req.body.name, req.body.description, req.body.age, req.body.link, req.body.isbn, function(err, rows3){
					if (err) throw err;
					bookService.addConnectionBookAuthor(req.body.author.id, function(err, rows5){
						if (err) throw err;
						res.json(success);
					});
				});
			};
		});
	} else {
		bookService.checkBookUniqueness(req.body.name, req.body.author.id, function(err, rows){
			if (err) throw err;
			if (rows != null && rows.length>1) {
				res.json(errorbook);
			} else {
				bookService.addBook(req.body.name, req.body.description, req.body.age, req.body.link, function(err, rows3){
					if (err) throw err;
					bookService.addConnectionBookAuthor(req.body.author.id, function(err, rows5){
						if (err) throw err;
						res.json(success);
					});
				});
			}
		});
	};
});

router.put('/user', function (req, res) {
	
	var salt = userService.getSalt();
	var password = userService.passwordEncryption(salt, req.body.password);

	var errorEmail = {"error": true, "message": 'Email занят', "emailError": true};
	var errorLogin = {"error": true, "message": 'Login занят', "emailError": false};
	var success = {"error": false, "message": "Регистрация прошла успешно!"};
	
	userService.getUser(req.body.email, req.body.nickName, function (err, rows1) {
		if (err) throw err;

		if (rows1 != null && rows1.length > 0) {
			if (rows1[0].Email == req.body.email) {
				res.json(errorEmail); 
			} else {
				res.json(errorLogin);
			}
		} else {
			userService.insertUser(req.body.email, password, req.body.nickName, salt, function (err, rows2) {
				if (err) throw err;
				userService.getInformationByLogin(req.body.nickName, function(err, rows3){
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
	userService.checkEmailUniqueness(req.body.email, req.session.id, function(err, rows1){
		if (err) throw err;
		if (rows1 != null && rows1.length > 0){
			res.json({"message": 'Такая почта уже зарегистрированна!', "error": true});
		} else {
			userService.updateUserInformation(req.body.name, req.body.lastName, req.body.email, req.session.id, function(err, rows){
				if (err) throw err;
				res.json({"message": 'Saved!'})
			});
		}
	});
});

module.exports = router;
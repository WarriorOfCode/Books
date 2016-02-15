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

router.put('/offer', function (req, res){
	bookService.addOffer(req.body.name, req.body.author, req.session.id, req.body.link, function(err, rows){
		if (err) throw err;
		res.json({"message": 'Книга скоро будет добавлена!'});
	});
});

router.get('/offers', function(req, res){
	bookService.getOffers(function(err, rows){
		res.json(rows);
	});
});

router.delete('/offer/:id', function(req, res){
	bookService.deleteOffer(req.params.id, function(err, rows){
		res.json("");
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

router.get('/author/:id/books', function(req, res){
	bookService.getBooksByAuthorId(req.params.id, function(err, rows){
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

router.get('/book/lists/:id', function(req, res){
	listService.getBookLists(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/lists/search/:query', function(req, res){
	listService.searchLists(req.params.query, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.put('/book/:id/mark', function(req,res){
	bookService.addMark(req.session.id, req.params.id, req.body.rate, function(err, rows){
		if (err) throw err;
		res.send("");
	});
});

router.post('/book/:id/mark', function(req, res){
	bookService.updateMark(req.session.id, req.params.id, req.body.rate, function(err, rows){
		if (err) throw err;
		res.send("");
	})
})

router.delete('/book/:id/mark', function(req, res){
	bookService.deleteMark(req.session.id, req.params.id, function(err, rows){
		if (err) throw err;
		res.send("");
	})
})

router.get('/book/:id/mark', function(req, res){
	bookService.getMarkBook(req.session.id, req.params.id, function(err, rows){
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

router.get('/book/:id/authors', function(req, res){
	authorService.getAuthorByBookId(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/follower/:id', function(req, res){
	userService.checkFriend(req.session.id, req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	})
});

router.get('/user/books/:id', function (req, res){
	bookService.getBooksByUserId(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.get('/book/user/:id', function(req, res){
	userService.checkisBookUser(req.params.id, req.session.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.put('/book/user', function(req, res){
	userService.deleteAllUserBook(req.body.bookId, req.session.id, function(err, rows){
		if (err) throw err;
		userService.addUserBook(req.body.bookId, req.session.id, req.body.progress, function(err, rows1){
			if (err) throw err;
			res.send(" ");
		});
	});
});

router.delete('/book/user/:id', function(req, res){
	userService.deleteUserBook(req.params.id, req.session.id, 0, function(err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.delete('/book/user/inFuture/:id', function(req, res){
	userService.deleteUserBook(req.params.id, req.session.id, 2, function(err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.delete('/book/user/inPresent/:id', function(req, res){
	userService.deleteUserBook(req.params.id, req.session.id, 1, function(err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.get('/authors/search/:query', function(req, res){
	authorService.searchAuthors(req.params.query, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.post('/password', function(req, res){
	var error = {"error": true, "message": 'Old password is wrong'};
	var success = {"error": false, "message": 'Password changed'};

	userService.checkPassword(req.session.login, req.body.old, function(check, user){
		if (check) {
			userService.updateUserPassword(req.body.new, req.session.id, function(err, rows){
				if (err) throw err;
				res.json(success);
			});
		} else {
			res.json(error);
		}
	});
});

router.delete('/friend/:id', function(req, res){
	userService.deleteFriend(req.session.id, req.params.id, function (err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.put('/friend', function(req, res){
	userService.addfriend(req.session.id, req.body.userId, function (err, rows){
		if (err) throw err;
		res.send(" ");
	});
});

router.post('/login', function(req, res){
	var errorLogin = {"error": true, "message": 'Ошибка входа!'};
	var success = {"error": false};

	userService.checkPassword(req.body.nickName, req.body.password, function(check, user){
		if(check){
			req.session.login = user.login;
			req.session.id = user.id;
			req.session.permissions = user.permissions;
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
					bookService.getBookId(function(err, rows4){
						if (err) throw err;
						bookService.addConnectionBookAuthor(rows4[0].id, req.body.author, function(err, rows5){
							if (err) throw err;
						});
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
					bookService.getBookId(function(err, rows4){
						if (err) throw err;
						bookService.addConnectionBookAuthor(rows4[0].id, req.body.author, function(err, rows5){
							if (err) throw err;
						});
						res.json(success);
					});
				});
			}
		});
	};
});

router.put('/user', function (req, res) {
	var errorEmail = {"error": true, "message": 'Email занят', "emailError": true};
	var errorLogin = {"error": true, "message": 'Login занят', "emailError": false};
	var success = {"error": false, "message": "Регистрация прошла успешно!"};
	
	userService.getUser(req.body.email, req.body.nickName, function (err, rows) {
		if (err) throw err;

		if (rows != null && rows.length > 0) {
			if (rows[0].Email == req.body.email) {
				res.json(errorEmail); 
			} else {
				res.json(errorLogin);
			}
		} else {
			userService.insertUser(req.body.email, req.body.password, req.body.nickName, function (err, rows2) {
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

router.put('/book/:id/review', function(req, res){
	bookService.getUserReview(req.params.id, req.session.id, function(err, rows){
		if (err) throw err;
		if (rows != null && rows.length > 0){
			res.send("Отзыв от этого пользователя уже есть");
		} else {
			bookService.addReview(req.params.id, req.session.id, req.body.head, req.body.body, function(err, rows1){
				if (err) throw err;
				res.json("saved")
			});
		}
	});
});

router.get('/book/:id/review', function(req, res){
	bookService.getReviews(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

router.delete('/book/review/:id', function(req, res){
	bookService.deleteReview(req.params.id, req.session.id, function(err, rows){
		if (err) throw err;
		res.send("");
	});
});

router.get('/book/:id/citations', function(req, res){
	bookService.getCitations(req.params.id, function(err, rows){
		if (err) throw err;
		res.send(rows);
	});
});

router.get('/user/:id/reviews', function(req, res){
	bookService.getUserReviews(req.params.id, function(err, rows){
		if (err) throw err;
		res.send(rows);
	});
});

router.put('/book/:id/citation', function(req, res){
	bookService.addCitation(req.params.id, req.session.id, req.body.text, function(err, rows){
		if (err) throw err;
		res.send("saved");
	});
});

router.delete('/book/citation/:citationId', function(req, res){
	bookService.deleteCitation(req.params.citationId, req.session.id, function(err, rows1){
		if (err) throw err;
		res.send("");
	});
});

router.get('/user/:id/citations', function(req, res){
	bookService.getCitationsByUserId(req.params.id, function(err, rows){
		if (err) throw err;
		res.json(rows);
	});
});

module.exports = router;
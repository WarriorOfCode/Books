var express = require('express');
var router = express.Router();
var connection = require('./db');
var userService = require('./services/userService');
var authorService = require('./services/authorService');
var bookService = require('./services/bookService');

router.get('/book/:id', function(req, res){
	
	if (req.params.id == null) res.redirect('/');
	bookService.getBookById(req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			authorService.getAuthorByBookId(req.params.id, function(err, rows1){
				if (err) throw err;

				userService.findUserBook(req.params.id, req.session.id, function(err, rows2){
					if (err) throw err;
					res.render('book.html', {book: rows, author: rows1, login: req.session.login,	flag: rows2});
				});
			});
		} else {
			res.redirect('/');
		}		
	});
});

router.get('/author/:id', function(req, res){
	authorService.getAuthorInformationById(req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			bookService.getBooksByAuthorId(req.params.id, function(err, rows1){
				if (err) throw err;

				res.render('author.html', {author:rows, login: req.session.login, books: rows1});
			});
		} else {
			res.redirect('/');
		}
	});
});

router.get('/authors', function(req, res){
	authorService.getAuthors(function(err, rows){
		if (err) throw err;
		res.render('authors.html', {books: rows, login: req.session.login})
	});
});

router.get('/setting', function(req, res){
	if (req.session.id){
		userService.getUserInformation(req.session.id, function(err, rows){
			if (err) throw err;
			res.render('edit.html', {data: rows, login: req.session.login});
		});
	} else {
		res.redirect('/');
	}
});

router.get('/user/:id', function (req, res){
	if (isFinite(req.params.id)) {
		user(req.params.id);
	} else {
		userService.getInformationFromLogin(req.params.id, function(err, rows3){
			if (err) throw err;
			if (rows3 !==null && rows3.length > 0){
				user(rows3[0].id);
			} else {
				res.redirect('/');
			}
		});
	};
	function user(params) {
		
		if (params == null) res.redirect('/');

		userService.getUserInformation(params, function(err, rows){
			if (err) throw err;
			if (rows !== null && rows.length > 0){
				bookService.getBooksByUserId(params, function(err, rows1){
					if (err) throw err;
					userService.getFriend(req.session.id, params, function(err, rows2){
						if (err) throw err;
						res.render('user.html', {login: req.session.login, user: rows, books: rows1, flag: rows2});
					});
				});
			} else {
				res.redirect('/');
			}
		});
	}
});

router.get('/', function(req, res){
	bookService.getNewBooks(function(err, rows) {
		if (err) throw err;
		bookService.getPopBooks(function(err, rows1){
			if (err) throw err;
			bookService.getBookByGroupId(function(err, rows2){
				if (err) throw err;
				res.render('index.html', {books: rows1, login: req.session.login, newbooks: rows, classic: rows2});
			});
		});
	});
});

router.get('/registration', function(req, res){
	if (!req.session.login)
		res.render('registration.html', { login: null });
	else res.redirect('/');
});

router.get('/login', function(req, res){
	if (!req.session.login)
		res.render('login.html', { login: null });
	else res.redirect('/');
});

router.get('/search', function(req, res){
	if (req.query.query) {
		bookService.searchBook(req.query.query+"%", function(err, rows){
			if (err) throw err;
			
			res.render('search.html', {login: req.session.login, books: rows});	
		});
	} else {
		res.render('search.html', {login: req.session.login, books: []})
	}
	
})

module.exports = router;
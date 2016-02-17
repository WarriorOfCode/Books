var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var userService = require('../services/userService');
var authorService = require('../services/authorService');
var bookService = require('../services/bookService');
var listService = require('../services/listService');

router.get('/book/:id', function(req, res){
	
	if (req.params.id == null) res.redirect('/');
	bookService.getBookById(req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			res.render('book.html', {
				book: rows,
				login: req.session.login,
				id: req.session.id
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
			res.render('author.html', {author:rows, login: req.session.login});
		} else {
			res.redirect('/');
		}
	});
});

router.get('/authors', function(req, res){
	res.render('authors.html', {login: req.session.login})
});

router.get('/lists', function(req, res){
	res.render('lists.html', {login: req.session.login});
})

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

router.get('/list/:id', function (req, res){
	listService.getList(req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !==null && rows.length > 0){
			res.render('list.html', {books: rows, login: req.session.login});
		} else {
			res.redirect('/');
		}
	})
});

router.get('/user/:id', function (req, res){
	if (isFinite(req.params.id)) {
		userService.getUserInformation(req.params.id, handleRequestByUser);
	} else {
		userService.getInformationByLogin(req.params.id, handleRequestByUser);
	};

	function handleRequestByUser(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			res.render('user.html', {
				login: req.session.login,
				user: rows,
				id: req.session.id
			});
		} else {
			res.redirect('/');
		}
	}
});

router.get('/', function(req, res){
	listService.getPopBooks(function(err, rows){
		if (err) throw err;
		res.render('index.html', {books: rows, login: req.session.login});
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
		bookService.searchBooks(req.query.query, function(err, rows){
			if (err) throw err;
			res.render('search.html', {login: req.session.login, books: rows, search: req.query.query});	
		});
	} else {
		res.render('search.html', {login: req.session.login, books: []})
	}
	
})

module.exports = router;
var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/book/:id', function(req, res){
	var selectSql = "SELECT * FROM books_users WHERE id_book = ? AND id_user =?";
	if (req.params.id == null) res.redirect('/');
	connection.query('SELECT * FROM Books WHERE id = ? LIMIT 1', req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			connection.query(selectSql, [req.params.id, req.session.id], function(err, rows1){
				if (err) throw err;
				res.render('book.html', {book: rows, login: req.session.login,	flag: rows1});
			});
		} else {
			res.redirect('/');
		}		
	});
});

router.get('/setting', function(req, res){
	if (req.session.id){
		connection.query("SELECT * FROM Users WHERE id = ?", req.session.id, function(err, rows){
			if (err) throw err;
			res.render('edit.html', {data: rows});
		});
	} else {
		console.log(req.session.id)
		res.redirect('/');
	}
});

router.get('/user/:id', function (req, res){
	if (isFinite(req.params.id)) {
		user(req.params.id);
	} else {
		connection.query("SELECT id FROM Users WHERE NickName = ?", req.params.id, function(err, rows3){
			if (err) throw err;
			if (rows3 !==null && rows3.length > 0){
				user(rows3[0].id);
			} else {
				res.redirect('/');
			}
		});
	};
	function user (params) {
		var selectSql = "SELECT Books.* FROM Books, books_users WHERE books_users.id_user = ? AND books_users.id_book = Books.id";
		var selectFriendSql = "SELECT * FROM friends WHERE id_follower = ? AND id_following = ?";
		if (params == null) res.redirect('/');
		connection.query("SELECT * FROM Users WHERE id = ? LIMIT 1", params, function(err, rows){
			if (err) throw err;
			if (rows !== null && rows.length > 0){
				connection.query(selectSql, params, function(err, rows1){
					if (err) throw err;
					connection.query(selectFriendSql, [req.session.id, params], function(err, rows2){
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
	connection.query('SELECT * FROM Books', function(err, rows) {
		if (err) throw err;
		res.render('index.html', {books: rows, login: req.session.login});
  });
});

router.get('/registration', function(req, res){
	if (!req.session.login)
		res.render('registration.html');
	else res.redirect('/');
});

router.get('/login', function(req, res){
	if (!req.session.login)
		res.render('login.html', { login: null });
	else res.redirect('/');
});

module.exports = router;
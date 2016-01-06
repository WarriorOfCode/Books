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


router.get('/', function(req, res){
	connection.query('SELECT * FROM Books', function(err, rows) {
		if (err) throw err;
		res.render('index.html', {data: rows, login: req.session.login});
  });
});

router.get('/registration', function(req, res){
	if (!req.session.login)
		res.render('registration.html');
	else res.redirect('/');
});

router.get('/login', function(req, res){
	if (!req.session.login)
		res.render('login.html');
	else res.redirect('/');
});

module.exports = router;
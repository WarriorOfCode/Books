var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/book/:id', function(req, res){
	var selectSql = "SELECT * FROM books_users WHERE id_book = ? AND id_user =?";
	var selectauthor = "SELECT Name, Last_Name, patronymic, id FROM  authors WHERE id IN (SELECT id_author FROM books_authors WHERE id_book=?)";
	if (req.params.id == null) res.redirect('/');
	connection.query('SELECT * FROM Books WHERE id = ? LIMIT 1', req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			connection.query(selectauthor, req.params.id, function(err, rows1){
				if (err) throw err;
				connection.query(selectSql, [req.params.id, req.session.id], function(err, rows2){
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
	connection.query('SELECT * FROM Authors WHERE id = ?', req.params.id, function(err, rows){
		if (err) throw err;
		if (rows !== null && rows.length > 0){
			var selectbooks = 'SELECT * FROM Books WHERE id IN (SELECT id_book FROM books_authors WHERE id_author = ?)';
			connection.query(selectbooks, req.params.id, function(err, rows1){
				if (err) throw err;

				res.render('author.html', {author:rows, login: req.session.login, books: rows1});
			});
		} else {
			res.redirect('/');
		}
	});
});

router.get('/authors', function(req, res){
	connection.query('SELECT * FROM Authors', function(err, rows){
		if (err) throw err;
		res.render('authors.html', {books: rows, login: req.session.login})
	});
});

router.get('/setting', function(req, res){
	if (req.session.id){
		connection.query("SELECT * FROM Users WHERE id = ?", req.session.id, function(err, rows){
			if (err) throw err;
			res.render('edit.html', {data: rows, login: req.session.login});
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
	function user(params) {
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
	var selectPop = 'SELECT * FROM Books WHERE id IN (SELECT id_book FROM books_users GROUP BY id_book ORDER BY COUNT(*) DESC) LIMIT 4';
	connection.query('SELECT * FROM Books GROUP BY id DESC LIMIT 4; ', function(err, rows) {
		if (err) throw err;
		connection.query(selectPop, function(err, rows1){
			if (err) throw err;
			connection.query('SELECT * FROM Books WHERE id IN (SELECT id_book FROM books_groups WHERE id_group = 1)', function(err, rows2){
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
		connection.query('SELECT * FROM Books WHERE Name LIKE ?', req.query.query+"%", function(err, rows){
			if (err) throw err;
			
			res.render('search.html', {login: req.session.login, books: rows});	
		});
	} else {
		res.render('search.html', {login: req.session.login, books: []})
	}
	
})

module.exports = router;
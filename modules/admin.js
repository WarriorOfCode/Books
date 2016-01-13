var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/', function(req, res){
	if (req.session.permissions > 0){
		connection.query('SELECT id, Name, Last_Name FROM Authors', function(err, rows){
			if (err) throw err;
			res.render('admin.html', {authors: rows, login: req.session.login});	
		});
	} else res.redirect('/');
});

module.exports = router;
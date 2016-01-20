var express = require('express');
var router = express.Router();
var connection = require('../db.js');
var authorService = require('../services/authorService');

router.get('/', function(req, res){
	if (req.session.permissions > 0){
		authorService.getAuthors(function(err, rows){
			if (err) throw err;
			res.render('admin.html', {authors: rows, login: req.session.login});	
		});
	} else res.redirect('/');
});

module.exports = router;
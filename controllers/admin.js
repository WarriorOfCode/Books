var express = require('express');
var router = express.Router();
var authorService = require('../services/authorService');

router.get('/', function(req, res){
	if (req.session.permissions > 0){
		res.render('admin.html', {login: req.session.login});	
	} else res.redirect('/');
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	if (req.session.permissions > 0)
		res.render('admin.html');
	else res.redirect('/');
});

module.exports = router;
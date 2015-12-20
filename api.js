var express = require('express');
var router = express.Router();

router.get('/users', function (req, res){
	
	var data = [
		{ name: 'Dexter', lastName: 'Morgan'},
		{ name: 'Debra', lastName: 'Morgan'}
	];
	res.json(data);

});

module.exports = router;
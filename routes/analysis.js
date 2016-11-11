var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('analysis', { 
		isAuthenticated : req.isAuthenticated(),
		title: 'analysis'
	});
});

module.exports = router;

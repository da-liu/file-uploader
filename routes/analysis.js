var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('analysis', { title: 'analysis'} );
});

module.exports = router;

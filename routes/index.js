var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var now = new Date();
	res.render('index', { title: "File Upload" });

});

module.exports = router;

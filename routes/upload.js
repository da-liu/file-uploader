var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('upload', {
  	isAuthenticated : req.isAuthenticated(),
  	title: "Upload File"
  });

});

module.exports = router;

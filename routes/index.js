var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const isLoggedIn = req.session.user ? true : false;
  res.render('index', { title: 'Motek-Project', isLoggedIn });
});

module.exports = router;

var express = require('express');
var router = express.Router();

const {isLoggedIn, isLoggedOut } = require('../middleware/route-guard')

/* GET users listing. */
router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('users/user-profile',req.session.user);
});

module.exports = router;

var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const User = require('../models/User')


/* GET home page. */
router.get('/user', function (req, res, next) {
    console.log("Admin User recognised");
    const isLoggedIn = req.session.user ? true : false;
    res.render('users/admin-profile', { isLoggedIn, admin: true });
});

module.exports = router;
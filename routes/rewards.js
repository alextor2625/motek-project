var express = require('express');
var router = express.Router();
const User = require('../models/User')


router.get('/content', function (req, res, next) {
    const isLoggedIn = req.session.user ? true : false;
    const { username } = req.session.user

    res.render('rewards/rewards', { isLoggedIn: true, username });
});

module.exports = router;
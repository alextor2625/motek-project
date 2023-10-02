var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const User = require('../models/User')


/* GET home page. */
router.get('/user', isLoggedIn, function (req, res, next) {
    console.log("Admin User recognised");
    const isLoggedIn = req.session.user ? true : false;
    res.render('users/admin-profile', { isLoggedIn, admin: true });
});


router.get('/user/lunchmenu/edit', isLoggedIn, (req,res,next) =>{
    const isLoggedIn = req.session.user ? true : false;
    res.render('menus/edit-lunch-menu', { isLoggedIn, admin: true })
})
router.get('/user/dinnermenu/edit', isLoggedIn, (req,res,next) =>{
    const isLoggedIn = req.session.user ? true : false;
    res.render('menus/edit-dinner-menu', { isLoggedIn, admin: true })
})
router.get('/user/rewards/edit', isLoggedIn, (req,res,next) =>{
    const isLoggedIn = req.session.user ? true : false;
    res.render('rewards/edit-rewards', { isLoggedIn, admin: true })
})


module.exports = router;
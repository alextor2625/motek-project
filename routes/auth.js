var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const {isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const User = require('../models/User');

/* GET home page. */
router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('auth/signup');
});

router.post('/signup', isLoggedOut, (req, res, next) => {

    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }
    const email_regex = /^\S+@\S+\.\S+$/;
    if (!email_regex.test(email)) {
        res.render('auth/signup', { errorMessage: "Please enter a valid email." });
        return;
    }

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!regex.test(password)) {
    //   res
    //     .status(500)
    //     .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    //   return;
    // }
    User.findOne({ $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] })
        .then(foundUser => {
            if (!foundUser) {
                bcryptjs
                    .genSalt(saltRounds)
                    .then(salt => bcryptjs.hash(password, salt))
                    .then(hashedPassword => {
                        return User.create({
                            fullname: firstname + ' ' + lastname,
                            username: username.toLowerCase(),
                            email: email.toLowerCase(),
                            password: hashedPassword
                        })
                    })
                    .then(newUser => {
                        console.log('New User created ===> ', newUser);
                        req.session.user = newUser;
                        console.log("Session after signup ===>", req.session)
                        res.redirect('/')
                    })
                    .catch((error) => {
                        console.log(error);
                        next(error);
                    });
            } else {
                res.render("auth/signup", {
                    errorMessage: "Email or username already taken.",
                });
                return;
            }
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
});


router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', isLoggedOut, (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.render('auth/login', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }

    User.findOne({username})
    .then(user => {
        if(!user){
            console.log("Username not registered.");
            res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.'})
        } else if(bcryptjs.compareSync(password, user.password)) {
            req.session.user = user;
            console.log('SESSION ===> ', req.session);
            res.redirect('/')
        } else {
            console.log("Incorrect password. ");
            res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
        }
    })
    .catch(error => {
        console.log(error);
        next(error)
    });

})

router.get('/logout', isLoggedIn, (req,res,next) =>{
    req.session.destroy(err => {
        if (err) next(err)
        res.redirect('/')
    })
})

module.exports = router;
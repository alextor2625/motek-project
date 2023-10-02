var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')

const User = require('../models/User')

/* GET users listing. */
router.get('/profile', isLoggedIn, (req, res, next) => {
  const { fullname, username, email, admin } = req.session.user;
  if(admin){
    res.redirect('/admin/user')
  }
  res.render('users/user-profile', { fullname, username, email, isLoggedIn: true })
});

router.get('/profile/edit', isLoggedIn, (req, res, next) => {
  const { fullname, email } = req.session.user;
  let name = fullname.split(' ');
  res.render('users/edit-user-profile', { firstname: name[0], lastname: name[1], email, isLoggedIn: true });
})

//Allows for user to edit profile
router.post('/profile/edit', isLoggedIn, (req, res, next) => {
  const { fullname, username } = req.session.user;
  const { firstname, lastname, email } = req.body;

  User.findOne({ email })
    .then(foundUserEmail => {
      if (foundUserEmail) {
        if (username === foundUserEmail.username) {
          if ((firstname + ' ' + lastname) !== fullname) {
            User.findOneAndUpdate({ username }, { fullname: firstname + ' ' + lastname }, { new: true })
              .then(updatedUser => {
                console.log('User Updated ===> ', updatedUser);
                req.session.user = updatedUser
                return res.render('users/user-profile', req.session.user)
              })
              .catch(err => {
                console.log(err);
                next(err);
              })
          } else {
            console.log("No Change on User.");
            return res.redirect('/users/profile');
          }
        } else {
          console.log("LINE 43 USERS.JS");
          res.render('users/edit-user-profile', {
            firstname,
            lastname,
            email,
            errorMessage: "Email already in use."
          })
        }
      } else if (!((firstname + ' ' + lastname) == fullname) || !(email === req.session.user.email)) {
        User.findOneAndUpdate({ username }, { fullname: firstname + ' ' + lastname, email }, { new: true })
          .then(updatedUser => {
            console.log('User Updated ===> ', updatedUser);
            req.session.user = updatedUser
            return res.render('users/user-profile', req.session.user)
          })
          .catch(err => {
            console.log(err);
            next(err);
          })
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    })



})

module.exports = router;

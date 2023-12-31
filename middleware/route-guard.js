// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  res.locals.user = req.session.user;
  console.log("Is logged in:", true);
  res.locals.isLoggedIn = true
  next();
};



// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.locals.user = null;
  console.log("Is logged out:", isLoggedOut);
  res.locals.isLoggedIn = false

  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
//middleware/is-signed-in.js
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
  };
  
  module.exports = isSignedIn;
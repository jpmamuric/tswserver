var express = require('express');
var router = express.Router();
const AUTHENTICATION = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport');

// setting session to false, rejects default cookie based session creation
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {
  res.json({ message: 'Welcome to Total Stretch Works' }); 
});

router.post('/signup', AUTHENTICATION.signup);
router.post('/login', requireLogin, AUTHENTICATION.login);

module.exports = router;

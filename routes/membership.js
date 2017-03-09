var express = require('express');
var router = express.Router();

const AUTHENTICATION = require('../controllers/authentication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {
  res.json({
    memberships: [
      { name: 'Warrior'},
      { name: 'Beast'},
      { name: 'Titan'}
    ]
  });
});

module.exports = router;

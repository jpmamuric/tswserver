const JWT       = require('jwt-simple');
const USERCLASS = require('../models/users');
const CONFIG    = require('../config');

//Create TJWT Token
function tokenForUser(user) {
  const TIMESTAMP = new Date().getTime();
  return JWT.encode({ sub: user.id, iat: TIMESTAMP }, CONFIG.secret)
}

// Export login function
exports.login = function(req, res, next) {
  //given token when signed in
  res.send({token: tokenForUser(req.user)});
}

// Export signup function
exports.signup = function(req, res, next) {
  //Declare const for req.body
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;

  //See if given email and password exists
  if (!EMAIL || !PASSWORD){
    return res.status(422).send({ error: 'you must provide email and password'});
  }

  //See if given email exists
  USERCLASS.findOne({ email: EMAIL }, function(err, existingUser){
    if(err) {
      return next(err)
    }

  //If exists, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is already taken'});
    }

  // If user does NOT exist create and save user record
  const NEW_USER = new USERCLASS({
    email:EMAIL,
    password: PASSWORD
  })

  NEW_USER.save(function(err){
    if(err) {return next(err);}

    //respond to request
    res.json({token: tokenForUser(NEW_USER)});
    });
  });
}

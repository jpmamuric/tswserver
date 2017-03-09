const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define out model
const USERSCHEMA = new Schema({
  email: { type: String , unique: true , lowercase: true },
  password: String
});

//before password Save Hook an encrypted password
USERSCHEMA.pre('save', function(next){
  //get access to the user model
  const USER = this;

  //generate a salt (randomly generated str of characters) then run call back
  bcrypt.genSalt(10, function(err, salt){
    if(err) {return next(err);}

    //hash (encrypt) our password using the salt
    bcrypt.hash(USER.password, salt, null, function(err, hash){
      if(err) {return next(err);}

      //overwrite plain text pasword with encrypted password
      USER.password = hash;
      next();
    });
  });
});

USERSCHEMA.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

//create model class
const USERCLASS = mongoose.model('user', USERSCHEMA);


//export model
module.exports = USERCLASS;

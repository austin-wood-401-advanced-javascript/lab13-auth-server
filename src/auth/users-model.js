'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
  jti: {type:String},
});


users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});


users.static.authenticateToken = function(token){
  let parsedToken = jwt.verify(token, process.env.SECRET);
  let query = { _id:parsedToken.id};
  if(blacklist.contains(parsedToken.jti)){
    throw 'Bad Token';
  }
  blacklist.push(parsedToken.jti);
  return this.findOne(query);
};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};
let blacklist = [];
users.methods.generateToken = function() {
  
  let token = {
    id: this._id,
    role: this.role,
    jti: uuid(),
  };

  return jwt.sign(token, process.env.SECRET, {expiresIn:'15m'});
};

module.exports = mongoose.model('users', users);

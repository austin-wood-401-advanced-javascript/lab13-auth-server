'use strict';

const express = require('express');
const authRouter = express.Router();
const Role = require('./roles-model.js');
const User = require('./users-model.js');
const auth = require('./middleware.js');

authRouter.post('/roles', (req,res,next) => {
  let role = new Role(req.body);
  console.log(role);
  role.save()
    .then( (role) => {
      res.send(role);
    }).catch(next);
});

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/public-stuff', (req,res,next) => {
  res.status(200).send('Welcome Everyone!');
});

authRouter.get('/hidden-stuff', auth(), (req,res,next) => {
  res.status(200).send('You\'re Valid!');
});

authRouter.get('/something-to-read', auth('read'), (req,res,next) => {
  res.status(200).send('You Can Read!');
});

authRouter.post('/create-a-thing'), auth('create'), (req,res,next) => {
  res.status(200).send('You Can Make Things!');
};

authRouter.put('/update'), auth('update'), (req,res,next) => {
  res.status(200).send('You Can Update Things!');
};

authRouter.patch('/jp'), auth('update'), (req,res,next) => {
  res.status(200).send('You Can Update Things!');
};

authRouter.delete('/bye-bye'), auth('delete'), (req,res,next) => {
  res.status(200).send('It\'s gone. Forever.');
};

authRouter.get('/everything'), auth('superuser'), (req,res,next) => {
  res.status(200).send('You Have All The Power.');
};


module.exports = authRouter;

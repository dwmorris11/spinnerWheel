const Promise = require('bluebird');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../database/schema.js');
const { db } = require('../database/index.js');
const { validateUser, validateEmail, validateWheelValue } = require('./validate.js');
const xss = require('xss');

const app = express();
const port = 80;

app.use('../public/', express.static());
/********************************************************************************************
 * REGISTER A NEW USER
 * ******************************************************************************************/
app.post('/register', function(req, res) {
  const isValidUser = validateUser(req.username, req.password);
  const isValidEmail = validateEmail(req.username, req.email);
  if(isValidUser === undefined && isValidEmail === undefined){
    var new_user = new User({
        username: xss(req.username),
        email: xss(req.email),
    });
  }
  new_user.password = new_user.generateHash(xss(req.password));
  new_user.save();
});

/********************************************************************************************
 * LOGIN
 * ******************************************************************************************/
app.post('/login', function(req, res) {
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  User.findOne({username: username}, function(err, user) {

    if (!user.validPassword(password)) {
      //password did not match
    } else {
      // password matched. proceed forward
    }
  });

  app.listen(port, () => {
      console.log("Server listening on port: ", port);
  })
});
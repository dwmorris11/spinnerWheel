require('dotenv').config();
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const xss = require('xss');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { User } = require('../database/schema.js');
const { db } = require('../database/index.js');
const { validateWheelValue } = require('./validate.js');
const { createUser, getCleanUser, generateToken } = require('./util.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(helmet());
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
   
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {  
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });

/********************************************************************************************
 * REGISTER A NEW USER
 * ******************************************************************************************/
app.route('/register')
    .post((req, res) => createUser(req, res));

/********************************************************************************************
 * LOGIN
 * ******************************************************************************************/
app.route('/login')
    .post((req, res) => {
        const username = xss(req.body.username);
        const password = xss(req.body.password);
        if(!username || !password){
            res.status(400).json({
                error: true,
                message: "Username and Password required."
            });
        }
        User.findOne({username: username}, function(err, user) {
            if(!user){
                res.status(401).json({
                    error: true,
                    message: "Username not found"
                });
            }else if (!user.validPassword(password)) {
                res.status(401).json({
                    error: true,
                    message: 'Invalid password'});
            } 
            // TODO: get this from database
            const token = generateToken(userData);
            const userObj = getCleanUser(userData);
            res.json({user: userObj, token});
        });
    });

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
 
    // return 401 status if the userId does not match.
    if (user.id !== userData.id) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

  app.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send();
  });

  /******************************************************************************************
   * MAKE NEW LIST/UPDATE
   ******************************************************************************************/
  app.route('/update')
    .post((req, res) => {
        const ListId = xss(req.body.listId);
        const list = req.body.list;
            for(let value of list){
                if(validateWheelValue(value) !== undefined){
                    res.status(500).send(validateWheelValue(value));
                    return;
                }
            }
    })
    .get((req, res)=> {
        // TODO: add code to show list building page and get data from database
    });

  app.listen(port, () => {
      console.log("Server listening on port: ", port);
  });

  // static user details
const userData = {
    id: "789789",
    password: "123456",
    name: "Clue Mediator",
    username: "cluemediator",
    isAdmin: true
  };
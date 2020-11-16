const { validateUser, validateEmail } = require('./validate.js');
const jwt = require('jsonwebtoken');
const { User } = require('../database/schema');
const xss = require('xss');

const createUser = async function(req, res) {
    const isValidUser = validateUser(req.body.username, req.body.password);
    const isValidEmail = validateEmail(req.body.username, req.body.email);
    if(isValidUser === undefined && isValidEmail === undefined){
      const new_user = new User({
          username: xss(req.body.username),
          email: xss(req.body.email),
      });
      new_user.password = new_user.generateHash(xss(req.body.password));
      new_user.save()
          .then((data)=>{
            res.status(200).send(getCleanUser(data));
          })
          .catch((e)=>{
            console.error(e);
            res.redirect('/register');
          });
    }else{
      if(isValidEmail !== undefined){
        res.status(400).send(isValidEmail.email[0]);
      }else if(isValidUser !== undefined){
        res.status(400).send( isValidUser.join('\n'));
      }
    }
};

function generateToken(user) {
    //1. Don't use password and other sensitive fields
    //2. Use the information that are useful in other parts
    if (!user) return null;
   
    var u = {
      username: user.username,
      email: user.email,
    };
   
    return jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
  }
   
  // return basic user details
  function getCleanUser(user) {
    if (!user) return null;
   
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      lists: user.lists,
    };
  }
   
  module.exports = {
    generateToken,
    getCleanUser, 
    createUser,
  };

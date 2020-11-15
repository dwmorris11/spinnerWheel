const { validateUser, validateEmail } = require('./validate.js');
const jwt = require('jsonwebtoken');
const { User } = require('../database/schema');
const xss = require('xss');

const createUser = async function(req, res) {
    const isValidUser = validateUser(req.username, req.password);
    const isValidEmail = validateEmail(req.username, req.email);
    if(isValidUser === undefined && isValidEmail === undefined){
      const new_user = new User({
          username: xss(req.username),
          email: xss(req.email),
      });
      new_user.password = new_user.generateHash(xss(req.password));
      new_user.save()
          .then(()=>{
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
          })
          .catch((e)=>{
            res.redirect('/register');
          });
    }else{
      
    }
};

function generateToken(user) {
    //1. Don't use password and other sensitive fields
    //2. Use the information that are useful in other parts
    if (!user) return null;
   
    var u = {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };
   
    return jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
  }
   
  // return basic user details
  function getCleanUser(user) {
    if (!user) return null;
   
    return {
      userId: user.userId,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };
  }
   
  module.exports = {
    generateToken,
    getCleanUser, 
    createUser,
  };

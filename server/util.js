const { validateUser, validateEmail } = require('./validate.js');
const jwt = require('jsonwebtoken');

const createUser = function(req, res) {
    const isValidUser = validateUser(req.username, req.password);
    const isValidEmail = validateEmail(req.username, req.email);
    if(isValidUser === undefined && isValidEmail === undefined){
      var new_user = new User({
          username: xss(req.username),
          email: xss(req.email),
      });
      new_user.password = new_user.generateHash(xss(req.password));
      new_user.save()
          .then(()=>res.status(200).send())
          .catch((e)=>res.status(500).send(e));
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

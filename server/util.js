const { validateUser, validateEmail } = require('./validate.js');

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

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

module.exports.sessionChecker = sessionChecker;
module.exports.createUser = createUser;
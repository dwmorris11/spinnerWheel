require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const xss = require('xss');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const {
  User
} = require('../database/schema.js');
const {
  db
} = require('../database/index.js');
const {
  validateWheelValue
} = require('./validate.js');
const {
  createUser,
  getCleanUser,
  generateToken
} = require('./util.js');
const passport = require('./passport/setup');
const auth = require('./routes/auth');
const {
  urlencoded
} = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(urlencoded({
  extended: false
}));
app.use(helmet());




/********************************************************************************************
 * LOGIN
 * ******************************************************************************************/
app.route('/login')
  .post((req, res) => {
    const username = xss(req.body.username);
    const password = xss(req.body.password);
    if (!username || !password) {
      res.status(400).json({
        error: true,
        message: "Username and Password required."
      });
    }
    User.findOne({
      username: username
    }, function (err, user) {
      if (!user) {
        res.status(401).json({
          error: true,
          message: "Username not found"
        });
      } else if (!user.validPassword(password)) {
        res.status(401).json({
          error: true,
          message: 'Invalid password'
        });
      }
      const token = generateToken(user);
      const userObj = getCleanUser(user);
      res.json({
        user: userObj,
        token
      });
    });
  });
/************************************************************************
 * DASHBOARD
 * ********************************************************************** */

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
    User.findById(user.id, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(user);
      return res.json({
        user: userObj,
        token
      });
    });
  });
});

app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({
    success: false,
    message: 'Invalid user to access it.'
  });
  res.send();
});

/******************************************************************************************
 * MAKE NEW LIST/UPDATE
 ******************************************************************************************/
app.route('/update')
  .post((req, res) => {
    const ListId = xss(req.body.listId);
    const list = req.body.list;
    for (let value of list) {
      if (validateWheelValue(value) !== undefined) {
        res.status(500).send(validateWheelValue(value));
        return;
      }
    }
  })
  .get((req, res) => {
    // TODO: add code to show list building page and get data from database
  });

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
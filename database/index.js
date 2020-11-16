const { db } = require("./development.js");
const mongoose = require('mongoose');

const mongoUri = db.primary;
const dbC = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    username: db.username,
    password: db.password,
  }
});
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: ')); // eslint-disable-line
dbConnection.once('open', () => console.log('connected')); // eslint-disable-line

module.exports.dbC = dbC;
module.exports.db = dbConnection;
var db = require("./development.js");
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const mongoUri = db.uri;
const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: ')); // eslint-disable-line
dbConnection.once('open', () => console.log('connected')); // eslint-disable-line

module.exports.db = db;
module.exports.dbConnection = dbConnection;
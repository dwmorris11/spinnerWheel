const { db } = require('../database/development.js');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: db.uri,
    collection: 'mySessions',
    databaseName: 'spinner'
  });

  store.on('error', function(error) {
    console.log(error);
  });

module.exports.store = store;
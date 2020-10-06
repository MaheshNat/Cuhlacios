const mongoose = require('mongoose');
const Logger = require('../modules/Logger');

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(process.env.MONGO_URI, dbOptions);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      Logger.log('Connected to mongoDB database.');
    });
    mongoose.connection.on('err', err => {
      Logger.error(`mongoDB connection error: \n ${err.stack}`);
    });
    mongoose.connection.on('disconnected', () => {
      Logger.error('Disconnected from mongoDB database');
    });
  }
};

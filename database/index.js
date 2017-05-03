var Promise = require('bluebird');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var schema = mongoose.Schema;
var dbConfig = require('../config/db');

mongoose.connect(dbConfig.dbKey);
Promise.promisifyAll(mongoose);

//If the connection is connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connection open');
}); 

// If the connection throws an error
mongoose.connection.on('error', function (err) {  
  console.log('Mongoose error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 


var photos = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  filePath: { type: String, required: true },
  gender: String

});
photos.plugin(uniqueValidator);
module.exports = mongoose.model('photos', photos);

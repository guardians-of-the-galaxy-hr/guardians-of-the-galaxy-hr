var Promise = require('bluebird');
const Photos = require('../database');
const kairos = require('./kairos.js')
Promise.promisifyAll(kairos);

Photos.findAsync({})
  .then(function(results) {
    return Promise.map(results[0].photoListName.hrsf_76, function (person) {
      return kairos.enrollAsync(person);
    })
  })
  .then(function(results) {
    console.log ('Kairos enroll completed', results);
    process.exit();
  })
  .catch(function(error) {
    throw error;
  });

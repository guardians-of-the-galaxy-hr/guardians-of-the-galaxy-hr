const request = require('request');
const api = require('../config/api.js');
const Promise = require('bluebird');

const galleryName = 'hrsf76';

var enroll = function(person, callback) {
  var userName = person.userName;
  var filePath = person.filePath;

  request({
    method: 'POST',
    url: api.kairos.api_url + '/enroll',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: `{"image": "${filePath}",  "subject_id": "${userName}",  "gallery_name": "${galleryName}"}`
  }, function (err, res, body) {
    if (err) {
      callback(err);
    } else {
      console.log('Status:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers));
      console.log('Response:', body);
      callback(err, body);
    }
  });
}

module.exports.enroll = enroll;

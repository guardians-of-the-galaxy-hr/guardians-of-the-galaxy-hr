const request = require('request');
const api = require('../config/api.js');
const Promise = require('bluebird');
const database = require('../database');

var enroll = (person, galleryName, callback) => {
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

var removeGallery = (galleryName, callback) => {
  request({
    method: 'POST',
    url: api.kairos.api_url + '/gallery/remove',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: `{"gallery_name": "${galleryName}"}`
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
};
module.exports.removeGallery = removeGallery;

var recognize = (uploadImage, galleryName, callback) => {
  var body = {
    image: uploadImage,
    gallery_name: galleryName,
    threshold: 0.00001,
    max_num_results: 50
  };
  body = JSON.stringify(body);
  var options = {
    method: 'POST',
    url: api.kairos.api_url + '/recognize',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: body
  };
  request(options, (error, results, body) => {
    if (error) {
      console.log(error);
    } else {
      //DO NOT DELETE! Kairos ErrCode:3001 "API temporarily unavailable" will be caught here
      if (JSON.parse(body).Errors) {
        console.log(JSON.parse(body).Errors);
      } else {
        console.log('kairos result', JSON.parse(body));
        var persons = JSON.parse(body).images[0].candidates;

        return Promise.map(persons, function (person) {

          console.log ('person', person);
          console.log ('gallery name', galleryName);
          console.log ('subject id', person.subject_id);
          return database.photo.findAsync({userName: person.subject_id, galleryName: galleryName})
            .then(function(result) {
              person.imageUrl = result[0].filePath;
              console.log (person.imageUrl);
              return person;
            });
        })
          .then(function(result) {
            console.log ('result', result);
            callback(result);
          })
          .catch(function(error) {

          });
      }
    }
  });

};

module.exports.recognize = recognize;

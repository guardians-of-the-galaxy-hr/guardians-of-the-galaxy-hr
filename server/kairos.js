const request = require('request');
const api = require('../config/api.js');
const Promise = require('bluebird');
const database = require('../database');

const enroll = (person, galleryName, callback) => {
  const userName = person.userName;
  const filePath = person.filePath;

  request({
    method: 'POST',
    url: api.kairos.api_url + '/enroll',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: `{"image": "${filePath}",  "subject_id": "${userName}",  "gallery_name": "${galleryName}"}`
  }, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body);
    }
  });
}

module.exports.enroll = enroll;

const removeGallery = (galleryName, callback) => {
  request({
    method: 'POST',
    url: api.kairos.api_url + '/gallery/remove',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: `{"gallery_name": "${galleryName}"}`
  }, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body);
    }
  });
};

module.exports.removeGallery = removeGallery;

const recognize = (uploadImage, galleryName, callback) => {
  const body = {
    image: uploadImage,
    gallery_name: galleryName,
    threshold: 0.00001,
    max_num_results: 50
  };

  body = JSON.stringify(body);

  const options = {
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
      if (JSON.parse(body).Errors) {
        console.log(JSON.parse(body).Errors);
      } else {
        const persons = JSON.parse(body).images[0].candidates;
        return Promise.map(persons,  (person) => {
          return database.photo.findAsync({userName: person.subject_id, galleryName: galleryName})
          .then((result) => {
            person.imageUrl = result[0].filePath;
            return person;
          });
        })
        .then((result) => {
          callback('CLASSMATE INFORMATION-----', result);
        })
        .catch((error) => {
          console.log('ERROR RECOGNIZING-----', error);
        });
      }
    }
  });
};

module.exports.recognize = recognize;

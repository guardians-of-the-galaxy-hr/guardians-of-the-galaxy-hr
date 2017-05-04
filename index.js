const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./client/env/config.js');
const request = require('request');


//mongoDB connection
const Photos = require(path.join(__dirname, '/database/index') );
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// //MongoDB testing put the data 
// var photos = new Photos({
//   userName: 'abc',
//   filePath: 'https://drive.google.com/file/d/0B3AAJJ2UZGHwVm9LWGxGOE9abkE/view?usp=sharing'
// });
// photos.saveAsync()
// .then(function(results) {
//   console.log(results);
// })
// .catch(function(error) {
//   console.log(error);
// });

//MongoDB testing accessing the data
Photos.findAsync({})
.then(function(results) {
  console.log('reading from mongo', results);
})
.catch(function(error) {
  throw error;
});

app.post('/classmate', (req, res) => {
  var options = {
    body: {
    "image":"http://media.kairos.com/kairos-elizabeth.jpg",
    "gallery_name":"MyGallery"
    },
    "contentType":'application/json',
    "app_id":api.kairos.appId,
    "app_key":api.kairos.app_key,
    "url":"http://media.kairos.com/kairos-elizabeth.jpg",
    "gallery_name":"MyGallery",
    "threshold":"0.00" 
  }
  
})

app.post('/enroll', (req, res) => {
  var options = {
  method: 'POST',
    url: 'https://api.kairos.com/enroll',
    body: "{  \"image\": \"http://media.kairos.com/kairos-elizabeth.jpg\",  \"subject_id\": \"Elizabeth\",  \"gallery_name\": \"MyGallery\"}"
  }
  request(options, function (error, response, body) {
    if (error) {
      console.log('ERROR-----', error);
    } else {
      console.log('BODY-----', body);
    }
  });
});


console.log(__dirname + '/database/index');

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

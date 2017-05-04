const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const api = require('./client/env/config.js');
const request = require('request');


//mongoDB connection
const Photos = require(path.join(__dirname, '/database/index') );
app.use(bodyParser.json());


//MongoDB testing Input the data
// var photos = new Photos();
// photos.photoListName = {
//   'hrsf_76': [
//     {
//       'userName': 'Alana',
//       'fiePath': 'https://drive.google.com/file/d/0B3AAJJ2UZGHwVm9LWGxGOE9abkE/view?usp=sharing'
//     }

//   ]
// };

app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// app.use('/bower_components', express.static(__dirname + '/bower_components'));
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

<<<<<<< HEAD
// app.post('/classmate', (req, res) => {
//   var options = {
//     body: {
//     "image":"http://media.kairos.com/kairos-elizabeth.jpg",
//     "gallery_name":"MyGallery"
//     },
//     "contentType":'application/json',
//     "app_id":api.kairos.appId,
//     "app_key":api.kairos.app_key,
//     "url":"http://media.kairos.com/kairos-elizabeth.jpg",
//     "gallery_name":"MyGallery",
//     "threshold":"0.00"
//   }

// })


app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

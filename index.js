const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./config/api.js');
const request = require('request');
const url = require('url');

console.log ('api.kairos', api.kairos);

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

// MongoDB testing accessing the data
var hrsf_76;
Photos.findAsync({})
.then(function(results) {
  console.log('reading from mongo', results[0].photoListName.hrsf_76);
  hrsf_76 = results[0].photoListName.hrsf_76;
  // kairosEnroll(hrsf_76);
})
.catch(function(error) {
  throw error;
});

// app.post('/classmate', (req, res) => {
//   console.log ('app post');
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


var persons = {
  hrsf_76: [
    {
      'userName': 'Edward Kim',
      'filePath': 'http://www.skrappie.com/hrsf76/Edward%20Kim.jpg'
    },
  ]
};

var kairosEnroll = function (persons) {
  persons.forEach(function(person) {
    var userName = person.userName;
    var filePath = person.filePath;
    console.log (userName);
    console.log (filePath);

    request({
      method: 'POST',
      url: 'https://api.kairos.com/enroll',
      headers: {
        'app_id': '550cd7ca',
        'app_key': 'e4b1649137b64cdfc843fd922fe76db2'
      },
      // body: "{  \"image\": \"http://media.kairos.com/kairos-elizabeth.jpg\",  \"subject_id\": \"Elizabeth\",  \"gallery_name\": \"MyGallery\"}"
      body: `{\"image\": \"${filePath}\",  \"subject_id\": \"${userName}\",  \"gallery_name\": \"hrsf76\"}`
    }, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
  });
}

request({
  method: 'POST',
  url: 'https://api.kairos.com/gallery/view',
  headers: {
    'app_id': '550cd7ca',
    'app_key': 'e4b1649137b64cdfc843fd922fe76db2'
  },
  body: JSON.stringify({
    'gallery_name': 'hrsf76'
  })
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  // console.log('Student Count: ', body.subject_ids.length)
});



app.post('/recognize', (req, res) => {
  var name = req.body.name;
  var body = {
    image: "http://media.kairos.com/kairos-elizabeth.jpg",
    gallery_name: "testGallery",
    minHeadScale: 0.15,
    threshold: 0.63,
    max_num_results: 5.00
  }
  body = JSON.stringify(body);
  var options = {
    method: 'POST',
    url: 'https://api.kairos.com/recognize',
    headers: {
      'app_id': '077d4b23',
      'app_key': 'd217274b4c07e0acef0e9cec7507d94d'
    },
    body: body
  }
  request(options, (error, results, body) => {
    if (error) {
      console.log('ERROR IN RECOGNIZE-----', error);
    } else {
      console.log('RECOGNIZED-----', body);
      res.send(JSON.parse(body));
    }
  });
});


app.get('/query', (req, res) => {
  var body = {
    gallery_name: 'testGallery'
  }
  body = JSON.stringify(body);
  var options = {
    method: 'POST',
    url: 'https://api.kairos.com/gallery/view',
    headers: {
      'app_id': '077d4b23',
      'app_key': 'd217274b4c07e0acef0e9cec7507d94d'
    },
    body: body
  }
  request(options, (error, response, body) => {
    if (error) {
      console.log('GET USERS ERROR-----');
    } else {
      console.log('USERS----', body);
    }
  });
});





app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

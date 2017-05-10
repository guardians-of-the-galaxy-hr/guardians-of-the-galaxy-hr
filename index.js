const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./config/api.js');
const request = require('request');
const url = require('url');
// maultiParty
const multiparty = require('multiparty');
const util = require('util');
const base64 = require('file-base64');
const jsonfile = require('jsonfile');
//Kairos
const kairos = require('./server/kairos');
var Promise = require('bluebird');
Promise.promisifyAll(kairos);

const database = require('./database');

app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

var galleryName = 'hrsf-76';

//Receive enncoded image and decode and save as pic.jpg
app.post('/upload/url', (req, res) => {
  // console.log('hello from uploader');
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (!err) {
      kairos.recognize(fields.file[0].split(',')[1], galleryName, (kairosResults) => {
        console.log('results from kairos', typeof(kairosResults));
       // res.json(util.inspect(kairoResults));
        res.send((kairosResults));
      });
    }
    //decoding back to image file text.jpg
    // base64.decode(fields.file[0].split(',')[1], 'pic.jpg', function(err, output) {
    //   if (!err) {
    //     console.log('success');
    //     //Here we can call the Kairo's recognize function and pass the base64 encoded string as fields.file[0].split(',')[1]
    //     //testing(fields.file[0].split(',')[1]);
    //   }
    // });
  });
});

app.get('/classmates', (req, res) => {
  console.log ('classmates get route');
  request({
    method: 'POST',
    url: api.kairos.api_url + '/gallery/view',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: JSON.stringify({
      'gallery_name': 'hrsf76'
    })
  }, (error, response, body) => {
    if (error) {
      console.log (err);
    } else {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body); 
      res.send(body);
    }
  });
});

app.get('/classmates/:student', (req, res) => {
  console.log ('classmates student get route');
  var student = req.params.student;

  database.photo.findAsync({userName: student, galleryName: galleryName})
  .then((result) => {
    return kairos.detectAsync(result[0].filePath)
  })
  .then((results) => {
    res.send(results);
  })
  .catch((error) => {
    console.log ('error', error);
  });

});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

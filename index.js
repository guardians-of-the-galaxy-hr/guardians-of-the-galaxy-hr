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

var Promise = require('bluebird');
const kairos = require('./server/kairos');
Promise.promisifyAll(kairos);
const celebrityBucks = require('./server/celebrity-bucks');
Promise.promisifyAll(celebrityBucks);

const database = require('./database');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FB = require('fb');
const fbAuth = require('./server/facebookAuth')(passport);
const facebook = require('./server/routers/facebook');

app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(cookieParser());

//Route for facebook
app.use('/facebook', facebook);


//Passport session settings
app.use(session({
  secret: 'InYourFace', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//
// app.use(function (req, res, next) {
//   res.locals.login = req.isAuthenticated();
//   next();
// });



//Receive enncoded image and decode and save as pic.jpg
app.post('/upload/url/:gallery', (req, res) => {
  var galleryName = req.params.gallery;

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

//Facebook Auth
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_friends'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    console.log("Redirecting after login")
    console.log(process.env.PROTOCOL+'://'+process.env.HOST+':'+process.env.PORT+'/#/friends')
    res.redirect(process.env.PROTOCOL+'://'+process.env.HOST+':'+process.env.PORT+'/#/friends');
  });

//Facebook logout
app.get('/logout', function(req, res, next) {
  console.log('Request user', req.user);

  // console.log('before', req.user);
  // req.session.destroy(function (err) {
  //   if (err) { console.log(err); }
  //  // fbAuth.deleteSession(req.user);
  //   // database.facebook.findOneAndUpdateAsync({facebookId: req.user.facebookId},
  //   // {$set: {token: ''}}, {new: true})
  //   // .then(function(result) {
  //   //   req.logout();
  //   //   res.send({'user': req.user });
  //   // })
  //   // .catch(function(err) {
  //   //   res.send(err);
  //   // });
  //     req.logout();
  // res.send({'user': req.user });

  // });
  // FB.api('/me/permissions', 'DELETE', function(response) {
  //   console.log(response); //gives true on app delete success
  // });
  req.logout();
  res.send({'user': req.user });

});

//Facebook isLoggedIn middleware
app.get('/isLoggedIn', function(req, res) {
  res.send({'auth': req.isAuthenticated(), 'user': req.user});
});



app.get('/classmates', (req, res) => {
  var galleryName = 'hrsf-76';
  console.log ('classmates get route');
  request({
    method: 'POST',
    url: api.kairos.api_url + '/gallery/view',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    },
    body: JSON.stringify({
      'gallery_name': galleryName
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
  var galleryName = 'hrsf-76';
  console.log ('classmates student get route');
  var studentInfo = {};
  studentInfo.studentName = req.params.student;
  studentInfo.filePath;
  studentInfo.detectResult;
  studentInfo.studentId;

  database.photo.findAsync({userName: studentInfo.studentName, galleryName: galleryName})
  .then((result) => {
    studentInfo.filePath = result[0].filePath;
    return kairos.detectAsync(studentInfo.filePath);
  })
  .then((result) => {
    studentInfo.detectResult = JSON.parse(result);
    return kairos.postAsync(studentInfo.filePath);
  })
  .then((result) => {
    studentInfo.studentId = JSON.parse(result).id;
    return kairos.analyzeAsync(studentInfo.studentId);
  })
  .then((result) => {
    studentInfo.analyzeResult = JSON.parse(result);
    res.send(studentInfo);
  })
  .catch((error) => {
    console.log ('error', error);
  });
});

app.get('/celebrities', (req, res) => {
  console.log ('celebrities get route');
  celebrityBucks.topListAsync()
  .then((result) => {
    res.send (result);
  })
  .catch((error) => {
    console.log ('error', error);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

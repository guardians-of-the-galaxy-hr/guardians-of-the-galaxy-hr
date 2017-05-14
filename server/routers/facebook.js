const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FB = require('fb');
const fbAuth = require('../facebookAuth')(passport);
//Kairos
const Promise = require('bluebird');
const kairos = require('../kairos');
Promise.promisifyAll(kairos);

var router = express.Router();

//Passport session settings
router.use(session({
  secret: 'InYourFace', // session secret
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(bodyParser.json());



router.route('/getDetails').get(function(req, res) {
  FB.setAccessToken(req.query.token);
  FB.api('/me?fields=email,picture', function(response) { 
    res.send(response);
  });

});

//Get user's friends Details
router.route('/getFriendsDetails').get(function(req, res) {
  FB.setAccessToken(req.query.token);
  FB.api('/me?fields=taggable_friends{picture.width(250),name}', function(response) {
    res.send(response.taggable_friends.data);
  });
  

});

//Get selected friends face analysis details
router.route('/getFriendsFaceAnalysis').get(function(req, res) {
  var personDetails= JSON.parse(req.query.person);
  kairos.detectAsync(personDetails.picture.data.url)
  .then((result)=> {
    res.send(result);
  })
  .catch((error)=> {
    res.send(error);
  });


});
module.exports = router;
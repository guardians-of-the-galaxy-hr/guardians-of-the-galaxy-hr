var app = angular.module('in-your-face', ['webcam', 'ngFileUpload', 'ezfb', 'ngRoute'])

.config(function($routeProvider, $locationProvider, ezfbProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: '/templates/landing.html',
      controller: 'landingCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/classmates', {
      templateUrl: '/templates/classmates.html',
      controller: 'classmatesCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/red', {
      templateUrl: '/templates/red.html'
    });

    // Basic setup
    // https://github.com/pc035860/angular-easyfb#configuration
    ezfbProvider.setInitParams({
      appId: '1929333797297736'
    });
})
.controller('landingCtrl', function(rank, ezfb, $scope, $window) {
  this.goToClassmates = () => {
    $window.location.href = '/#/classmates';
  };

  this.goToCelebrities = () => {
    $window.location.href = '/#/celebrities';
  };

  this.goToFriends = () => {
    $window.location.href = '/#/friends';
  };

  //Facebook Login
  this.login = () => {
    // Calling FB.login with required permissions specified
    // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
    ezfb.login((res) => {
      console.log(res);
      // no manual $scope.$apply, I got that handled
      if (res.authResponse) { this.takePicPage = false; }
    }, {scope: 'email,user_likes'});
  };
})
.controller('classmatesCtrl', function(rank, ezfb, $scope, $window) {
  this.persons = [];

  this.picCallback = (response) => {
    console.log('FROM PIC CALLBACK', response.data)
    this.persons = response.data.map(person => {
      var confidence = (person.confidence * 100).toFixed(1);
      return {
        name: person.subject_id,
        imageUrl: person.imageUrl,
        confidence: confidence
      };
    });
  };

  //Facebook
  this.login = () => {
    // Calling FB.login with required permissions specified
    // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
    ezfb.login((res) => {
      //no manual $scope.$apply, I got that handled
      if (res.authResponse) {this.goGoToClassmates(); }
    }, {scope: 'email,user_likes'});
  };
  this.logout = () => {
    // Calling FB.logout
    // https://developers.facebook.com/docs/reference/javascript/FB.logout
    ezfb.logout(() => { this.takePicPage = true; });
  };
});

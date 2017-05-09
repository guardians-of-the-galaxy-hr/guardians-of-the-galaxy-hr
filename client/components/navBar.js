angular.module('in-your-face')
// .config(function($routeProvider, $locationProvider) {
//   $locationProvider.hashPrefix('');
//   $routeProvider
//     .when('/blue', {
//       templateUrl: '/templates/blue.html'
//     })
//     .when('/red', {
//       templateUrl: '/templates/red.html'
//     });
// })
.controller('navBarCtrl', function() {

})
.directive('navBar', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: 'navBarCtrl',
    templateUrl: '../templates/navBar.html'
  };
});



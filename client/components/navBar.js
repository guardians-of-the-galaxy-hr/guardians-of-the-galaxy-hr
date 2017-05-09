angular.module('in-your-face')
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

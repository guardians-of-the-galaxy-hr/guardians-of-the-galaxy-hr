angular.module('in-your-face')
.controller('motionDetectCtrl', function() {

})
.directive('motionDetect', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'motionDetectCtrl',
    templateUrl: '../templates/motionDetect.html'
  };
});
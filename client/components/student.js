angular.module('in-your-face')
.directive('student', function() {
  return {
    scope: {
      persons: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
    },
    templateUrl: './templates/student.html'
  };
});
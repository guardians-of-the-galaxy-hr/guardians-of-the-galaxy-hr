angular.module('in-your-face')
.directive('studentAttributeEntry', function() {
  return {
    scope: {
      analyze: '<',
      detect: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($scope) {
      console.log($scope)
    },
    templateUrl: './templates/studentAttributeEntry.html'
  };
});
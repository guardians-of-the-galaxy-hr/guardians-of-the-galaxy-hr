angular.module('in-your-face')
.directive('personTable', function() {
  return {
    scope: {
      persons: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
    },
    templateUrl: './templates/personTable.html'
  };
});
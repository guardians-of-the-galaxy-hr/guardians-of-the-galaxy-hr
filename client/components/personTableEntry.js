angular.module('in-your-face')
.directive('personTableEntry', function() {
  return {
    scope: {
      person: '<',
      index: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
    },
    templateUrl: './templates/personTableEntry.html'
  };
});``
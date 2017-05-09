angular.module('in-your-face')
.directive('personsTableEntry', function() {
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
    template: '../templates/personsTableEntry.html'
  };
});
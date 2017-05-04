angular.module('in-your-face')
.directive('personsTable', function() {
  return {
    scope: {
      persons: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
    },
    template: `
      <div>
        <persons-table-entry ng-repeat="person in ctrl.persons" person="person"></persons-table-entry>
      </div>`
  };
});
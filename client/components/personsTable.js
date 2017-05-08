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
      <div class="row">
		    <div class="col-md-4 col-xs-6" ng-repeat="person in ctrl.persons">
        <persons-table-entry  person="person"></persons-table-entry>
        </div>     
      </div>
      
      `
  };
});
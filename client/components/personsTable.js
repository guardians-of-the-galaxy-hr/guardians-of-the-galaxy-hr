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
      <div id="persons-table-container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-xs-12 person-table-entry-align" ng-repeat="($index, person) in ctrl.persons track by $index">
            <div ng-if="$index + 1 === 1">
              <img class="persons-table-winner-deco" src="./assets/first.png" />
              <persons-table-entry  person="person"></persons-table-entry>
            </div>
            <div ng-if="$index + 1 === 2">
              <img class="persons-table-winner-deco" src="./assets/second.png" />
              <persons-table-entry  person="person"></persons-table-entry>
            </div>
            <div ng-if="$index + 1 === 3">
              <img class="persons-table-winner-deco" src="./assets/third.png" />
              <persons-table-entry  person="person"></persons-table-entry>
            </div>
            <div ng-if="$index + 1 > 3">
              <persons-table-entry  person="person"></persons-table-entry>
            </div>
          </div>
        </div>
      </div>
      `
  };
});
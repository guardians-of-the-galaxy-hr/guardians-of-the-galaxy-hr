angular.module('in-your-face') 
.directive('personsTable', function() {
  return {
    restrict: 'E',
    template: `
      <div>
        <persons-table-entry ng-repeat="person in persons"></persons-table-entry>
      </div>`
  };
});
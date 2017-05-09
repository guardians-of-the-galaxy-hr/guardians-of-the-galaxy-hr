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
    template: `
      <div id="person-table-entry-container">
        <span>{{$parent.$index + 1}}.&nbsp{{ctrl.person.name}}&nbsp&nbsp&nbsp{{ctrl.person.confidence}}%</span>
        <span>
          <img class="persons-table-entry-pic" ng-src={{ctrl.person.imageUrl}} />
        </span>
      </div>
    `
  };
});
angular.module('in-your-face')
.directive('personsTableEntry', function() {
  return {
    scope: {
      person: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
    },
    template: `
      <div class="person-row">
        <span class="person-name">{{ctrl.person.name}} {{ctrl.person.confidence}}</span>
        <span class="person-image">
          <img ng-src={{ctrl.person.imageUrl}} height="{{200}}"/>
        </span>
      </div>`
  };
});
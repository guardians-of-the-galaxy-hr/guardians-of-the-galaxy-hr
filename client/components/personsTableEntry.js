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
      <div>
        <span>{{ctrl.person.name}} {{ctrl.person.confidence}}%</span>
        <span>
          <img ng-src={{ctrl.person.imageUrl}} height="{{200}}"/>
        </span>
      </div>  
      
      
      
      `
  };
});
angular.module('in-your-face')
.directive('personsTableEntry', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
    },
    template: `
      <div class="person-row">
        <span class="person-name">{{person.name}}</span>
        <span class="person-image">
          <img ng-src={{person.imageUrl}} height="{{200}}"/>
        </span>
      </div>`
  };
});
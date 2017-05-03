angular.module('in-your-face')
.directive('personsTableEntry', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: function($scope) {
    },
    template: `
      <div>
        <span class="person-name">{{person.name}}</span>
        <span class="person-image-url">{{person.imageUrl}}</span>
      </div>`
  };
});
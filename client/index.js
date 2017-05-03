var classmates = [
  {
    name: 'Edward Kim',
    imageUrl: 'http://tinyurl.com/n4vgcl5',
  },
  {
    name: 'Mahima Shrikanta',
    imageUrl: 'http://tinyurl.com/n4vgcl5',
  },
  {
    name: 'Mike Diodoro',
    imageUrl: 'http://tinyurl.com/n4vgcl5',
  },
  {
    name: 'Sean Feng',
    imageUrl: 'http://tinyurl.com/kxd7cuu',
  }
];

angular.module('in-your-face', [])
.directive('app', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.persons = classmates;
    },
    template: '<persons-table persons=$scope.persons></persons-table>',
  };
});
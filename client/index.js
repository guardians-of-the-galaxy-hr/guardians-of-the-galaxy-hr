var classmates = [
  {
    name: 'Edward Kim',
    imageUrl: 'https://lh3.google.com/u/0/d/0B3AAJJ2UZGHwSzZETlI5aVhSZE0=w2560-h1398-iv1',
  },
  {
    name: 'Mahima Shrikanta',
    imageUrl: 'https://lh3.google.com/u/0/d/0B3AAJJ2UZGHwaEhsOWI3NUtwcTQ=w2560-h1398-iv2',
  },
  {
    name: 'Mike Diodoro',
    imageUrl: 'https://lh3.google.com/u/0/d/0B3AAJJ2UZGHwb2c2MUMzeDNJbTg=w2560-h1398-iv1',
  },
  {
    name: 'Sean Feng',
    imageUrl: 'https://lh3.google.com/u/0/d/0B3AAJJ2UZGHwUkN4QmpzLWJLRjQ=w2560-h1398-iv1',
  }
];

var app = angular.module('in-your-face', ['webcam'])
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function(myService) {
      this.persons = classmates;
      myService.getClassMateDetails();
    },
    template: `
      <nav class="navbar navbar-defalut">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">In your face</a>
          </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-md-7 yellow">
            <webcam-module></webcam-module>
          </div>
          <div class="col-md-5 pink">
            <persons-table persons="ctrl.persons"></persons-table>
          </div>
        </div>
      </div>`,
  };
});

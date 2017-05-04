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

angular.module('in-your-face',[])
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function() {
      this.persons = classmates;
    },
    template:
      `<div class="container">
        <div class="row">
          <div class="col-md-7 yellow">Placeholder Text</div>
          <div class="col-md-5 pink">
            <persons-table persons="ctrl.persons"></persons-table>
          </div>
        </div>
      </div>`,
  };
});
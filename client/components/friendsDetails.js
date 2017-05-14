app.controller('FBFriendsDetailsCtrl', function() {

});


app.directive('friendDetails', function() {
  return {
    scope: {
      persons: '<',
      selectedFriend:'<',
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    controller: 'FBFriendsDetailsCtrl',
    bindToController: true,
    templateUrl: './templates/friendsAttributes.html'
  };
});
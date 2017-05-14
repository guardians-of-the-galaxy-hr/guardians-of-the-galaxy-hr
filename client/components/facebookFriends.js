
app.controller('facebookFriendsCtrl', function(facebookService, $location, $route) {

  this.userDetails;
  this.friends;
  this.Error;
  this.FriendDetails;

  //Display details
  this.displayFriends = true;
  this.displayLoading = false;
  this.displayFriendDetails = false;

  //Get Facebook user friends Details
  this.getFacebookFriendsDetails = (response) => {
    this.friends = (response.data);
  };
  //Get Facebook user details
  this.getUserDetails = (result) => {
    this.userDetails = result;
    //Get Facebook user FriendsList
    facebookService.facebookGetFriendsDetails(this.userDetails.data.user.token, this.getFacebookFriendsDetails);
  };
  facebookService.facebookIsLogged (this.getUserDetails);

  //Get the selected friend and send to Kairos API for face analyses
  this.friendsFaceDetails = (err, result) => {
    this.displayLoading = false;
    if (err) {
      this.Error = err;
    } else {
      this.FriendDetails = result.data.images[0];
      console.log(this.FriendDetails);
      this.displayFriendDetails = true;
       
    }
  };
  this.selectedFriend = (person) => {
    this.displayFriends = false;
    this.displayLoading = true;
    this.selectedFriends = person;
    console.log(this.selectedFriends);
    facebookService.facebookFriendDetailsAnalyze (person, this.friendsFaceDetails);
  };

  //Back Button
  this.goBack = () => {
    this.displayFriendDetails = false;
    this.displayFriends = true;
  };

});



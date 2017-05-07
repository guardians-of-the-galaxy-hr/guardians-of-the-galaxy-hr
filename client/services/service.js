app.service('rank', function($http) {

  this.classmates = function(callback) {
    console.log ('ranking classmates');
    var options = {
      method: "GET",
      url: "/recognize",
      headers: {contentType: "application/json"}
    }

    $http(options)
      .then(
        function success(result) {
          console.log (result.data.images[0].candidates);
          callback(result.data.images[0].candidates);
        },
        function error(err) {
          console.log (err);
        }
      );
  }
});
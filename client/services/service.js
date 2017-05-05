app.service('myService', function($http) {

  this.getClassMateDetails = function (){
    var options = {
      method: "GET",
      url: "/classmates",
      headers: {contentType: "application/json"}
    }
    $http(options)
    .then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }
});
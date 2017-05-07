app.service('rank', function($http, Upload) {

  this.classmates = function(callback) {
    console.log ('ranking classmates');
    var options = {
      method: 'GET',
      url: '/recognize',
      headers: {contentType: 'application/json'}
    };

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
  };

  //send base64 encoded image to server
  this.uploadFile = function (file) {
    Upload.upload({
      url: 'upload/url',
      data: {file: file}
    }).then(function (resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: '+ resp.data);
      //callback(resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

});
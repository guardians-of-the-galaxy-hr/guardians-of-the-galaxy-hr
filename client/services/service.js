app.service('service', function($http, Upload) {
  //send base64 encoded image to server
  this.uploadFile = function (file, callback) {
    Upload.upload({
      url: 'upload/url',
      data: {file: file}
    }).then(function (resp) {
      console.log('Success ', typeof(resp));
      callback(resp);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  this.getStudent = function(student, callback) {
    console.log ('get student service');
    var options = {
      method: 'GET',
      url: '/classmates/'+student,
    };

    $http(options)
    .then(
      function success(result) {
        callback (result);
      },
      function error(err) {
        console.log (err);
      }
    );
  };

});
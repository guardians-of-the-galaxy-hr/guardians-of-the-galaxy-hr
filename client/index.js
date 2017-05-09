var app = angular.module('in-your-face', ['webcam', 'ngFileUpload', 'ezfb'])
.config(function (ezfbProvider) {
  /**
   * Basic setup
   *
   * https://github.com/pc035860/angular-easyfb#configuration
   */
  ezfbProvider.setInitParams({
    appId: '1929333797297736'
  });  
})
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function(rank, ezfb, $scope ) {

      this.persons = [];
      this.takePicPage = true;
      //open Take Pic Page

      this.openTakePic = () => {
        this.takePicPage = false;
      };

      this.picCallback = (response) => {
        console.log('results from kairos', (response));
        this.persons = response.data.map(person => {
          var confidence = (person.confidence * 100).toFixed(1);
          return {
            name: person.subject_id,
            imageUrl: person.imageUrl,
            confidence: confidence
          };
        });
      };


      //Facebook

      this.login = ()=> {
    /**
     * Calling FB.login with required permissions specified
     * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
     */
        ezfb.login((res) => {
          console.log(res);
      /**
       * no manual $scope.$apply, I got that handled
       */
          if (res.authResponse) {
            this.takePicPage = false;
        
          }
        }, {scope: 'email,user_likes'});
      };

      this.logout = () =>{
    /**
     * Calling FB.logout
     * https://developers.facebook.com/docs/reference/javascript/FB.logout
     */
        ezfb.logout(() => {
          this.takePicPage = true;
  
        });
      };
    },
    templateUrl: './templates/app.html'
  };
});

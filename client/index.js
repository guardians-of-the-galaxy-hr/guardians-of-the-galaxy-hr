var app = angular.module('in-your-face', ['webcam', 'ngFileUpload'])
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function(rank) {

      this.persons = [];
      this.takePicPage = true;
//       rank.classmates((results) => {
//         if (results) {
//           this.persons = results.map(person => {
//             var confidence = (person.confidence * 100).toFixed(1);
//             return {
//               name: person.subject_id,
//               imageUrl: `http://www.skrappie.com/hrsf76/${person.subject_id}.jpg`,
//               confidence: confidence
//             };
//           })
//  ;
//         }
//       });
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
    },
    templateUrl: './templates/app.html'
    // template: `
    //   <nav-bar></nav-bar>
    //   <div class="container inyourface">
    //     <div class="row">
    //       <div class="col-md-6">
    //         <webcam-module persons="ctrl.persons" pic-callback= "ctrl.picCallback"></webcam-module>
    //       </div>
    //       <div class="col-md-6">
    //       </div>
    //     </div>
    //     <div class = "row">
    //       <div class="col-xs-offset-2 col-xs-offset-10">
    //         <persons-table persons="ctrl.persons" ></persons-table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // `,
  };
});

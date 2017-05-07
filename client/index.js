var app = angular.module('in-your-face', ['webcam'])
.directive('app', function() {
  return {
    scope: {

    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function(rank) {
      this.persons = rank.classmates((persons) => {
        if (persons) {this.persons = persons.map(person => {
          var confidence = (person.confidence*100).toFixed(1);
          return {
            name: person.subject_id,
            imageUrl: `http://www.skrappie.com/hrsf76/${person.subject_id}.jpg`,
            confidence: confidence
          }
        })}
      });
    },
    template: `
      <nav-bar></nav-bar>
      <div class="container inyourface">
        <div class="row">
          <div class="col-md-6">
            <webcam-module></webcam-module>
          </div>
          <div class="col-md-6">
            <persons-table persons="ctrl.persons"></persons-table>
          </div>
        </div>
      </div>
    `,
  };
});

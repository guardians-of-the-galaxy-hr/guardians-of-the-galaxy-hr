angular.module('in-your-face')
.controller('motionDetectCtrl', function() {

  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var imageObj = new Image();
    imageObj.src = './assets/fred_pic.gif';
    imageObj.width = 40;
    imageObj.height = 50;
    event.data.forEach(function(rect) {
      context.drawImage(imageObj, rect.x / 2.3 - 15, rect.y / 2.3 - 40, 90, 105);
      // context.strokeStyle = '#a64ceb';
      // context.strokeRect(rect.x / 2.3 - 10, rect.y / 2.3 - 10, rect.width / 2.3, rect.height / 2.3); //rect.x, rect.y
      // context.font = '8px Helvetica';
      // context.fillStyle = '#fff';
      // context.fillText('x: ' + rect.x + 'px', 0 + rect.width / 2 + 5, 0 + 11);
      // context.fillText('y: ' + rect.y + 'px', 0 + rect.width / 2 + 5, 0 + 22);
    });
  });
});


// var imageObj = new Image();

// imageObj.onload = function() {
//   context.drawImage(imageObj, 69, 50);
// };
// imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg'




// .directive('motionDetect', function() {
//   return {
//     scope: {

//     },
//     restrict: 'E',
//     bindToController: true,
//     controllerAs: 'ctrl',
//     controller: 'motionDetectCtrl',
//     templateUrl: '../templates/motionDetect.html'
//   };
// });

// context.font = '11px Helvetica';
// context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
// context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
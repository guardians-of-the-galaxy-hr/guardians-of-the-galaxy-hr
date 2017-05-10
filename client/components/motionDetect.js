angular.module('in-your-face')
.controller('motionDetectCtrl', function() {

  window.onload = function() {
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
    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });
  // var gui = new dat.GUI();
  // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
  // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
  // gui.add(tracker, 'stepSize', 1, 5).step(0.1);
  };


  // var objects = new tracking.ObjectTracker['face', 'eye', 'mouth'];

  // objects.on('track', function(event) {
  //   if (event.data.length === 0) {
  //     // No objects were detected in this frame.
  //   } else {
  //     event.data.forEach(function(rect) {
  //       // rect.x, rect.y, rect.height, rect.width
  //     });
  //   }
  // });

  // tracking.track('#myVideo', objects);


});
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
angular.module('in-your-face')
.controller('motionDetectCtrl', function() {
  // instantiate video camera and canvases
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // constants for picture links
  // const fred = './assets/fred_pic.gif';
  // const sophie = './assets/sophie_pic.gif';
  // const jamil = './assets/jamil_pic.gif';
  var selectedPicLink = './assets/fire.gif';

  // instantiate tracker object and set initial values for face tracking parameters
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });

  // change picture upon button clicking
  this.onChangePicButtonClicked = (personName) => {
    console.log('person name: ', personName);
    selectedPicLink = personName;
  };

  tracker.on('track', function(event) {
    // console.log('event: ', event);
    context.clearRect(0, 0, canvas.width, canvas.height);


    event.data.forEach(function(rect) {
      var imageObj = new Image();

      console.log("selected: ", selectedPicLink);
      imageObj.src = selectedPicLink;
      console.log("123: ", imageObj.src);
      // console.log('rect: ', rect);
      context.drawImage(imageObj, rect.x / 2.3 - 15, rect.y / 2.3 - 30, 90, 105);
    });
  });
});

// relocated directive in the routing
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

// change coordinate location, font and size
  // context.font = '11px Helvetica';
  // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
  // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

// track human face and print purple rectangle on the screen
  // context.strokeStyle = '#a64ceb';
  // context.strokeRect(rect.x / 2.3 - 10, rect.y / 2.3 - 10, rect.width / 2.3, rect.height / 2.3); //rect.x, rect.y
  // context.font = '8px Helvetica';
  // context.fillStyle = '#fff';
  // context.fillText('x: ' + rect.x + 'px', 0 + rect.width / 2 + 5, 0 + 11);
  // context.fillText('y: ' + rect.y + 'px', 0 + rect.width / 2 + 5, 0 + 22);
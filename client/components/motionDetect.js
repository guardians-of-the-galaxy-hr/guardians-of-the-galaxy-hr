angular.module('in-your-face')
.controller('motionDetectCtrl', function() {

  this.showRemoveEffectButton = false;

  // instantiate video camera and canvases
  var video = document.getElementById('video');
  var canvas = document.getElementById('photo-booth-canvas');
  var context = canvas.getContext('2d');

  // constants for picture links
  var selectedPicLink = '';

  // instantiate tracker object and set initial values for face tracking parameters
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });

  // change picture upon button clicking
  this.onChangePicButtonClicked = (personName) => {
    personName === '' ? this.showRemoveEffectButton = false : this.showRemoveEffectButton = true;
    selectedPicLink = personName;
  };

  this.onTakeSnapshotButtonClicked = () => {
    var hiddenCanvas = document.getElementById('photo-display-canvas');
    hiddenCanvas.width = canvas.width;
    hiddenCanvas.height = canvas.height;
    var ctx = hiddenCanvas.getContext('2d');

    // get video frame
    ctx.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    // get canvas data
    ctx.drawImage(canvas, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    // draw both of them on the same hidden canvas
    var imageData = ctx.getImageData(0, 0, 10, 10);
    // var dataURI = hiddenCanvas.toDataURL('image/jpeg');
    ctx.putImageData(imageData, 0, 0);
  };


  // face detection event handling function
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      var imageObj = new Image();
      imageObj.src = selectedPicLink;
      if (rect.width >= 100 && rect.width < 205) {
        context.drawImage(imageObj, rect.x / 2.5, rect.y / 2.5 * 0.7, rect.width * 0.52, rect.width * 0.52 * 1.15);
      } else if (rect.width >= 205 && rect.width < 305) {
        context.drawImage(imageObj, rect.x / 2.5, rect.y / 3.2 * 0.05, rect.width * 0.52, rect.width * 0.52 * 1.15);
      }




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
angular.module('in-your-face')
.controller('motionDetectCtrl', function() {

  this.count = 4;
  this.showRemoveEffectButton = false;

  var video = document.getElementById('video');

  // instantiate video camera and photo-booth-canvas
  var pbCanvas = document.getElementById('photo-booth-canvas');
  var pbContext = pbCanvas.getContext('2d');

  // instantiate photo-display-canvas
  var pdCanvas = document.getElementById('photo-display-canvas');
  var pdContext = pdCanvas.getContext('2d');

  // instantiate count-down-canvas
  var cdCanvas = document.getElementById('count-down-canvas');
  var cdContext = pdCanvas.getContext('2d');
  // constant for picture links
  var selectedPicLink = '';

  // instantiate tracker object and set initial values for face tracking parameters
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });

  // change picture link upon button clicking
  this.onChangePicButtonClicked = (personName) => {
    personName === '' ? this.showRemoveEffectButton = false : this.showRemoveEffectButton = true;
    selectedPicLink = personName;
  };

  this.countDown = ()=> {
    console.log('counting down ', this.count - 1);
    cdContext.font = '20px Verdana';

    // create gradient
    var gradient = cdContext.createLinearGradient(0, 0, pbCanvas.width, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');

    // fill with gradient
    cdContext.fillStyle = gradient;
    cdContext.clearRect(0, 0, cdContext.width, cdContext.height);
    cdContext.fillText(this.count - 1, 100, 100);

    // decrease the counting variable
    this.count--;
    if (this.count > 0) {
      setTimeout(this.countDown, 1000);
    } else if (this.count === 0) {
      cdContext.clearRect(0, 0, cdContext.width, cdContext.height);
      console.log('cheese!');
      cdContext.fillText('cheese!', 100, 100);
      setTimeout(function() {
        cdContext.clearRect(0, 0, cdContext.width, cdContext.height);
        pdContext.drawImage(video, 0, 0, pdCanvas.width, pdCanvas.height);
        pdContext.drawImage(pbCanvas, 0, 0, pdCanvas.width, pdCanvas.height);
        var imageData = pdContext.getImageData(0, 0, pbCanvas.offsetWidth, pbCanvas.offsetHeight);
        pdContext.putImageData(imageData, 0, 0);
      }, 1000);
    }
  };

  this.onTakeSnapshotButtonClicked = () => {
    this.count = 4;
    this.countDown();
  };

  // face detection event handling function
  tracker.on('track', function(event) {
    pbContext.clearRect(0, 0, pbCanvas.width, pbCanvas.height);
    event.data.forEach(function(rect) {
      var imageObj = new Image();
      imageObj.src = selectedPicLink;
      if (rect.width >= 100 && rect.width < 205) {
        pbContext.drawImage(imageObj, rect.x / 2.5, rect.y / 2.5 * 0.7, rect.width * 0.52, rect.width * 0.52 * 1.15);
      } else if (rect.width >= 205 && rect.width < 305) {
        pbContext.drawImage(imageObj, rect.x / 2.5, rect.y / 3.2 * 0.05, rect.width * 0.52, rect.width * 0.52 * 1.15);
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
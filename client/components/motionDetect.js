angular.module('in-your-face')
.controller('motionDetectCtrl', function($scope) {

  this.count = 4;
  this.showRemoveEffectButton = false;
  this.showPhotoDisplayCanvas = false;
  var self = this;
  var video = document.getElementById('video');

  // instantiate video camera and photo-booth-canvas
  var pbCanvas = document.getElementById('photo-booth-canvas');
  var pbContext = pbCanvas.getContext('2d');

  // instantiate photo-display-canvas
  var pdCanvas = document.getElementById('photo-display-canvas');
  var pdContext = pdCanvas.getContext('2d');

  // instantiate count-down-canvas
  var cdCanvas = document.getElementById('count-down-canvas');
  var cdContext = cdCanvas.getContext('2d');
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
    cdContext.font = '40px Verdana';
    // create gradient
    var gradient = cdContext.createLinearGradient(0, 0, pbCanvas.width, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');

    // fill with gradient
    cdContext.fillStyle = gradient;
    cdContext.clearRect(0, 0, cdCanvas.width, cdCanvas.height);
    cdContext.fillText(this.count - 1, 10, 50);

    this.count--;
    if (this.count > 0) {
      setTimeout(this.countDown, 1000);
    } else if (this.count === 0) {
      $scope.$apply( function() {
        self.showPhotoDisplayCanvas = true;
      });
      cdContext.clearRect(0, 0, cdCanvas.width, cdCanvas.height);
      cdContext.font = '30px Verdana';
      cdContext.fillText('cheese!', 10, 50);
      setTimeout(function() {
        cdContext.clearRect(0, 0, cdCanvas.width, cdCanvas.height);
        pdContext.drawImage(video, 0, 0, pdCanvas.width, pdCanvas.height);
        pdContext.drawImage(pbCanvas, 0, 0, pdCanvas.width, pdCanvas.height);
        var imageData = pdContext.getImageData(0, 0, pbCanvas.offsetWidth, pbCanvas.offsetHeight);
        pdContext.putImageData(imageData, 0, 0);
      }, 800);
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
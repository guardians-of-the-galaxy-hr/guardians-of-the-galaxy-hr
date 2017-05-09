angular.module('in-your-face')
.controller('webcamModuleCtrl', function(rank) {

  var _video = null;
  var patData = null;
  var self = this;
  // ng-show parameters
  this.showUploadButton = false;
  this.showRetakeButton = false;
  this.showTakePicButton = true;
  this.showSnapshotCanvas = false;
  this.showCamera = true;

  this.snapshotData = '';
  this.patOpts = {x: 0, y: 0, w: 25, h: 25};
  // Setup a channel to receive a video property
  // with a reference to the video element
  this.channel = {};

  this.onRetakeButtonClicked = () => {
    this.showCamera = true;
    this.showUploadButton = false;
    this.showRetakeButton = false;
    this.showTakePicButton = true;
    this.showSnapshotCanvas = false;
  };

  this.onTakePicButtonClicked = () => {
    this.showCamera = false;
    this.showUploadButton = true;
    this.showRetakeButton = true;
    this.showTakePicButton = false;
    this.showSnapshotCanvas = true;
  };

  this.onSuccess = () => {
  // The video element contains the captured camera data
    _video = this.channel.video;
    _video.width = _video.width * 2.2;
    _video.height = _video.height * 2.2;
    self.patOpts.w = _video.width;
    self.patOpts.h = _video.height;
    this.showDemos = true;
  };

  this.getVideoData = (x, y, w, h) => {
    var hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = _video.width;
    hiddenCanvas.height = _video.height;
    var ctx = hiddenCanvas.getContext('2d');
    ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    return ctx.getImageData(x, y, w, h);
  };

  /**
   * This function is used to send the image data
   * to a backend server that expects base64 encoded images.
   */
  this.sendSnapshotToServer = () => {
    // this.snapshotData = imgBase64;
    rank.uploadFile(this.snapshotData, this.picCallback);
    console.log('base64 image file sent to server!');

  };

  this.makeSnapshot = () => {
    if (_video) {
      var patCanvas = document.querySelector('#snapshot');
      if (!patCanvas) { return; }

      patCanvas.width = _video.width;
      console.log('video width: ', _video.width);
      patCanvas.height = _video.height;
      console.log('video height: ', _video.height);
      var ctxPat = patCanvas.getContext('2d');

      var idata = this.getVideoData(this.patOpts.x, this.patOpts.y, this.patOpts.w, this.patOpts.h);

      ctxPat.putImageData(idata, 0, 0);

      this.snapshotData = patCanvas.toDataURL();
      console.log('took snapshot and saved in base64 format!');
      this.onTakePicButtonClicked();

      patData = idata;
    }
  };

})
.directive('webcamModule', function() {
  return {
    scope: {
      persons: '<',
      picCallback: '<',
    },
    restrict: 'E',
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'webcamModuleCtrl',
    templateUrl: './templates/webcam.html'
  };
});

angular.module('in-your-face')
.controller('webcamModuleCtrl', function(rank) {
  var _video = null;
  var patData = null;
  var self = this;
  this.showUploadButton = false; // show upload button should be disabled initially
  this.showRetakeButton = false;
  this.showTakePicButton = true;
  this.showSnapshotCanvas = false; // the canvas for the snapshot should be hide initially
  this.showCamera = true;

  this.snapshotData = '';
  this.patOpts = {x: 0, y: 0, w: 25, h: 25};

  // Setup a channel to receive a video property
  // with a reference to the video element
  // See the HTML binding in main.html
  this.channel = {};
  //
  // this.webcamError = false;
  // this.onError = function (err) {
  //     $scope.$apply(
  //         function() {
  //             self.webcamError = err;
  //         }
  //     );
  // };
  //

  this.onSuccess = function () {
  // The video element contains the captured camera data
    _video = this.channel.video;
   // $scope.$apply(function() {
    _video.width = 540;
    _video.height = 300;
    self.patOpts.w = _video.width;
    self.patOpts.h = _video.height;
    this.showDemos = false;
   // });
  };

  var getVideoData = function getVideoData(x, y, w, h) {
    var hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = _video.width;
    hiddenCanvas.height = _video.height;
    var ctx = hiddenCanvas.getContext('2d');
    ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    return ctx.getImageData(x, y, w, h);
  };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
// receive back base64 uploaded image from the server
  // this.picCallback = (response) => {
  //   console.log('results from kairos', response);
  //   this.persons = response;
  // };

//
//imgBase64
  this.sendSnapshotToServer = function () {
    // this.snapshotData = imgBase64;
    rank.uploadFile(this.snapshotData, this.picCallback);
    console.log('base64 image file sent to server!');

  };

//
    // this.onStream = function (stream) {
    //     // You could do something manually with the stream.
    // };
//
  this.makeSnapshot = function() {
    if (_video) {
      var patCanvas = document.querySelector('#snapshot');
      if (!patCanvas) { return; }

      patCanvas.width = _video.width;
      console.log('video width: ', _video.width);
      patCanvas.height = _video.height;
      console.log('video height: ', _video.height);
      var ctxPat = patCanvas.getContext('2d');

      var idata = getVideoData(this.patOpts.x, this.patOpts.y, this.patOpts.w, this.patOpts.h);
      this.showSnapshotCanvas = true; // once the snapshot is generated
                                      // screen should show the canvas instead
                                      // of the camera
      ctxPat.putImageData(idata, 0, 0);

      this.snapshotData = patCanvas.toDataURL();
      console.log('took snapshot and saved in base64 format!');
      this.showUploadButton = true;
      this.showRetakeButton = true;
      this.showTakePicButton = false;
      this.showCamera = false;
      // sendSnapshotToServer(patCanvas.toDataURL());

      patData = idata;
    }
  };
    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
//
    // this.downloadSnapshot = function downloadSnapshot(dataURL) {
    //     window.location.href = dataURL;
    // };
//
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
    template: `
      <div id="app-container">
        <canvas id="snapshot" ng-show="ctrl.showSnapshotCanvas"></canvas>
        <webcam channel="ctrl.channel" ng-show="ctrl.showCamera"
          on-streaming="ctrl.onSuccess()"
          on-error="ctrl.onError(err)"
          on-stream="ctrl.onStream(stream)">
        </webcam>
        <div class="webcam-buttons">
          <button class="btn btn-primary" ng-click="ctrl.makeSnapshot()" ng-show="ctrl.showRetakeButton"><i class="fa fa-camera" aria-hidden="true"></i> retake picture</button>
          <button class="btn btn-primary" ng-click="ctrl.makeSnapshot()" ng-show="ctrl.showTakePicButton"><i class="fa fa-camera" aria-hidden="true"></i> take picture</button>
          <button class="btn btn-primary" ng-click="ctrl.sendSnapshotToServer()" ng-show="ctrl.showUploadButton"><i class="fa fa-upload" aria-hidden="true"></i> upload image</button>
        </div>
      </div>


      `
  };
});
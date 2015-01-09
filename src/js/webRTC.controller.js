(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('webRTCctrl', function($scope) {
            var webrtc = new SimpleWebRTC({
                // the id/element dom element that will hold "our" video
                localVideoEl: 'localVideo',
                // the id/element dom element that will hold remote videos
                remoteVideosEl: 'remotesVideos',
                // immediately ask for camera access
                autoRequestMedia: true
            });
            webrtc.on('readyToCall', function () {
                // you can name it anything
                webrtc.joinRoom('wg_call');
            });
        });
}());

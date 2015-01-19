(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('webRTCctrl', ['$scope', '$routeParams',
            function($scope, $routeParams) {
                $('#ownVideoContainer').removeClass('hidden');
                $(".close").click(function () {
                    $(this).parent().parent().addClass('hidden');
                });

                var webrtc = new SimpleWebRTC({
                    // the id/element dom element that will hold "our" video
                    localVideoEl: 'localVideo',
                    // the id/element dom element that will hold remote videos
                    remoteVideosEl: 'remotesVideos',
                    // immediately ask for camera access
                    autoRequestMedia: true
                });

            }]);
}());

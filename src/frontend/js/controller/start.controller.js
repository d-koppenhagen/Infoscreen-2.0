/* Startpage view controller */
(function() {
  "use strict";
  angular
    .module('wgscreen')
    .controller('startCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$window',
      function($scope, $rootScope, $routeParams, $http, $location, $window) {
        console.log('open start page...');
        $scope.wlanSSID = config.wlan.name;
        $scope.wlanKey = config.wlan.key;

        $rootScope.isActive = new Object();

        $rootScope.isActive.me = localStorage.getItem("Autostart_WebRTC") == "true" ? true : false;

        if ($rootScope.isActive.me == true) initWebRTC();

        $scope.changeWebRTCState = function() {
          if ($rootScope.isActive.me == false) {
            localStorage.setItem("Autostart_WebRTC", "true");
            $rootScope.isActive.me = true;
            initWebRTC();
          } else {
            localStorage.setItem("Autostart_WebRTC", "false");
            $rootScope.isActive.me = false;
            $rootScope.isActive.remote = false;
            //document.location.reload();
          }
        }

        function initWebRTC() {
          var webrtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'remotesVideos',
            // immediately ask for camera access
            autoRequestMedia: true
          });

          webrtc.on('readyToCall', function() {
            console.log("incoming call, changing route...");
            // you can name it anything
            webrtc.joinRoom('infoscreen_webrtc_call');
          });
          webrtc.on('message', function() {
            $rootScope.isActive.me = true;
            $rootScope.isActive.remote = true;
          });

          webrtc.on('videoAdded', function(video, peer) {

            console.log('video added', peer, video);
            var remotes = document.getElementById('remotesVideos');
            remotes.appendChild(video);
              /*
              video.onclick = function() {
                video.style.width = video.videoWidth + 'px';
                video.style.height = video.videoHeight + 'px';
              };
              */

          });

          webrtc.on('videoRemoved', function(video, peer) {
            console.log('video removed ', peer);
            var remotes = document.getElementById('remotes');
            var el = document.getElementById('container_' + webrtc.getDomId(peer));
            if (remotes && el) {
              remotes.removeChild(el.parent().parent().parent());
            }
            $rootScope.isActive.me = false;
            $rootScope.isActive.remote = false;
          });
        }
      }
    ]);
}());

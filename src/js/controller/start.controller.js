/* Startpage view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('startCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open start page...');
                $scope.wlanSSID = config.wlan.name;
                $scope.wlanKey = config.wlan.key;

                $scope.changeWebRTCState = function() {
                    $("#toggleWebRTCStateBtn").toggleClass("btn-default, btn-success");
                    $("#callFeedbackAlert").toggleClass("hidden");
                    $('#ownVideoContainer').toggleClass('hidden');
                    if ($("#toggleWebRTCStateBtn").hasClass("btn-success")){
                        localStorage.setItem("Autostart_WebRTC", "true");
                        initWebRTC();
                    } else {
                        localStorage.setItem("Autostart_WebRTC", "false");
                    }
                }
        }]);
}());

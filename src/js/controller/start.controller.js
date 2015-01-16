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
        }]);
}());

(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('RightCtrl', function($scope, $timeout, $mdSidenav) {
          $scope.close = function() {
            $mdSidenav('right').close();
          };
        });
}());

/* Calendar-view controller */
(function(){
    "use strict";	angular
		.module('wgscreen')
        .controller('calendarCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open calendar page...');

                $scope.today = function() {
                    $scope.dt = new Date();
                  };
                $scope.today();

                $scope.clear = function () {
                    $scope.dt = null;
                };

        }]);
}());

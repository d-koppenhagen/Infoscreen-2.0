/* LVB view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('lvbCtrl', ['$scope', '$http', '$routeParams',
            function($scope, $http, $routeParams) {
                console.log('open lvb page...');
                //$scope.stationlimit = config.lvb.max_stations;

                $http.post('php/stations.php', config.lvb)
                    .success(insertLVBData)
                    .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                });


                function insertLVBData (data) {
                    console.log(data);
                    $scope.stations = data;
                }
        }]);
}());

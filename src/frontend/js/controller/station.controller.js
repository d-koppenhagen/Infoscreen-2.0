/* station view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('stationCtrl', ['$scope', '$timeout', '$http', '$routeParams',
            function($scope, $timeout, $http, $routeParams) {
                console.log('open station page...');
                $scope.stationlimit = parseInt(localStorage.getItem("max_stations"));
                $scope.stations = [];

                var refresh  = function(){
                    config.station.stations = JSON.parse(localStorage.getItem("lvb_station_ids")); // replace with localStorage value

                    config.station.stations.forEach(function(stationNumber) {
                        //sending data and get a result
                        $http.get('/station/' + stationNumber)
                            .success(insertStationData)
                            .error(function(data, status, headers, config) {
                                console.log("Error by getting data", data, status, headers, config);
                        });
                        function insertStationData (data) {
                            console.log(data);
                            $scope.stations.push(data);
                        }
                        $timeout(refresh,randomTime());
                    });

                }
                $timeout(refresh,0);

                $scope.moreEntries = function () {
                    $scope.stationlimit = parseInt($scope.stationlimit)+5;
                };

                function randomTime(){
                    /*  val1:2min (+val2)    ; val2: 4min (min)*/
                    var random=Math.floor((Math.random()*(2000))+(4000))*60;
                    console.log(random);
                    return random;
                }
        }]);
}());

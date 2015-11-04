/* station view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('stationCtrl', ['$scope', '$timeout', '$http', '$routeParams',
            function($scope, $timeout, $http, $routeParams) {
                console.log('open station page...');
                $scope.stationlimit = parseInt(localStorage.getItem("max_stations"));
                $scope.station;

                var refresh  = function(){
                    config.stations = JSON.parse(localStorage.getItem("lvb_station_ids")); // replace with localStorage value

                    config.stations.forEach(function(stationNumber) {
                        //sending data and get a result
                        $http.get('/station/' + stationNumber)
                            .success(insertStationData)
                            .error(function(data, status, headers, config) {
                                console.log("Error by getting data", data, status, headers, config);
                        });
                        function insertStationData (data) {
                            console.log(data);
                            $scope.station = data;
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

                $scope.timeDiff = function(expected, real){
                  if (!real) return 0;

                  var e = new Date(expected).getTime();
                  var r = new Date(real).getTime();

                  if (e == r) return 0;

                  return new Date (r-e)
                }
        }]);
}());

/* LVB view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('lvbCtrl', ['$scope', '$timeout', '$http', '$routeParams',
            function($scope, $timeout, $http, $routeParams) {
                console.log('open lvb page...');

                var refresh  = function(){
                    console.log("Refreshing duration monitor...");
                        $http.post('php/stations.php', config.lvb)
                            .success(insertLVBData)
                            .error(function(data, status, headers, config) {
                            console.log("Error by getting data", data, status, headers, config);
                        });
                        function insertLVBData (data) {
                            console.log(data);
                            $scope.stations = data;
                        }
                    $timeout(refresh,randomTime());
                }
                $timeout(refresh,0);

                $scope.stationlimit = config.lvb.max_stations;

                function randomTime(){
                    /*  val1:2min (+val2)    ; val2: 4min (min)*/
                    var random=Math.floor((Math.random()*(2000))+(4000))*60;
                    console.log(random);
                    return random;
                }
        }]);
}());

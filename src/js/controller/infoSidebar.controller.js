/* gallery view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('infoSidebarCtrl', ['$scope', '$http' ,
            function($scope, $http) {
                console.log('open infobar-controller...');
                //$scope.time = Date() ;
                $http.get('http://api.openweathermap.org/data/2.5/forecast?id=2879139&units=metric&lang=DE_de&cnt=5')
                    .success(insertData)
                    .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                    });

                function insertData (data) {
                        console.log("get weather data: ", data);
                        $scope.cityname = data.city.name;
                        $scope.currentTemp = JSON.stringify(data.list[0].main.temp).replace(".",",");
                }
        }]);
}());

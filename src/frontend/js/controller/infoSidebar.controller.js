/* gallery view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('infoSidebarCtrl', ['$scope', '$http', '$timeout', '$interval' ,
            function($scope, $http, $timeout, $interval) {
                console.log('open infobar-controller...');
                var cityID = localStorage.getItem("weather_location");

                getWeatherData();
                $interval( getWeatherData, 1200000); //refresh every 20min


                function getWeatherData() {
                    $http.get('/weather/' + cityID)
                        .success(insertData)
                        .error(function(data, status, headers, config) {
                            console.log("Error by getting data", data, status, headers, config);
                        });
                }

                function insertData (data) {
                    console.log("getting new weather data:", data);
                        $scope.current = {
                          "cityname" : data.city.name,
                          "temp" : data.list[0].main.temp,
                          "icon" : data.list[0].weather[0].id,
                          "description" : data.list[0].weather[0].description
                        }

                        $scope.forecast = {
                            "temperatures": {
                                "average" : [
                                        data.list[0].main.temp,
                                        data.list[1].main.temp,
                                        data.list[2].main.temp
                                ],
                                "min": [
                                        data.list[0].main.temp_min,
                                        data.list[1].main.temp_min,
                                        data.list[2].main.temp_min
                                ],
                                "max": [
                                        data.list[0].main.temp_max,
                                        data.list[1].main.temp_max,
                                        data.list[2].main.temp_max
                                ]
                            },
                            "rain" : {

                            },
                            "wind" : {
                                direction : [

                                ],
                                speed : [
                                    data.list[0].wind.speed,
                                    data.list[1].wind.speed,
                                    data.list[2].wind.speed
                                ]
                            },
                            "pressure" : [
                                data.list[0].main.pressure,
                                data.list[1].main.pressure,
                                data.list[2].main.pressure
                            ],
                            "humidity" : [
                                data.list[0].main.humidity,
                                data.list[1].main.humidity,
                                data.list[2].main.humidity
                            ],
                            "description" : [
                              {
                                "icon": data.list[0].weather[0].id,
                                "text": data.list[0].weather[0].description
                              },
                              {
                                "icon": data.list[1].weather[0].id,
                                "text": data.list[1].weather[0].description
                              },
                              {
                                "icon": data.list[2].weather[0].id,
                                "text": data.list[2].weather[0].description
                              }
                            ]
                        };
                }

                $scope.today = function() {
                    $scope.dt = new Date();
                  };
                $scope.today();

                $scope.clear = function () {
                    $scope.dt = null;
                };

        }]);
}());

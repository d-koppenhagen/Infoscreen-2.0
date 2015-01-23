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
                    $http.get('http://api.openweathermap.org/data/2.5/forecast?id='+cityID+'&units=metric&lang=DE_de&cnt=5')
                        .success(insertData)
                        .error(function(data, status, headers, config) {
                            console.log("Error by getting data", data, status, headers, config);
                        });
                }

                function insertData (data) {
                    console.log("getting new weather data:", data);
                        $scope.cityname = data.city.name;
                        $scope.currentTemp = JSON.stringify(data.list[0].main.temp).replace(".",",");

                        $scope.weatherData = {
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
                            icons : [
                                data.list[0].weather[0].icon,
                                data.list[1].weather[0].icon,
                                data.list[2].weather[0].icon
                            ]
                        };
                }


        }]);
}());

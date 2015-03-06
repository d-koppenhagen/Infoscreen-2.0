/* gallery-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('galleryCtrl', ['$scope', '$http', '$routeParams',
            function($scope, $http, $routeParams) {
                console.log('open gallery page...');
                var queryString = config.restServices[0].REST+"?apikey="+config.restServices[0].apikey;
                console.log(queryString);
                 $http.get(queryString)
                    .success(insertPictures)
                    .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                });

                function insertPictures (data){
                    console.log("getting pictures...", data);
                    $scope.path=config.restServices[0].rootPath;
                    $scope.gallery = data;
                }

                $scope.openImageModal = function (){

                }

        }]);
}());

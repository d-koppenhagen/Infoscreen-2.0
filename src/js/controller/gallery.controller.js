/* gallery-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('galleryCtrl', ['$scope', '$http', '$routeParams',
            function($scope, $http, $routeParams) {
                console.log('open gallery page...');

                 $http.get('php/getGalleryItems.php')
                    .success(insertPictures)
                    .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                });

                function insertPictures (data){
                    console.log("getting pictures...", data);
                    var path = [];
                    var folders = [];
                    var rootPath = "img/gallery";
                    var folderStructure = [];
                    for (var i = 0; i < data.length; i++) {
                        var element = {
                            name: data[i],
                            path: rootPath+data[i]
                        };
                        folderStructure.push(element);
                    }
                    console.log("new structure: ",folderStructure);
                    $scope.gallery = path;
                    $scope.folder = folders;
                    //$scope.gallery = data;
                    //$scope.folders = ;
                }

        }]);
}());




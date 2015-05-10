/* gallery-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('galleryCtrl', ['$scope', '$http', '$routeParams','$modal',
            function($scope, $http, $routeParams, $modal) {
                console.log('open gallery page...');


                $scope.getImages = function (folder){
                   $http.get("/gallery?apikey="+config.apikey)
                      .success(insertPictures)
                      .error(function(data, status, headers, config) {
                          console.log("Error by getting data", data, status, headers, config);
                  });
                }

                $scope.getImages("");

                function insertPictures (data){
                    console.log("getting pictures...", data);
                    $scope.rootPath = "/gallery";
                    $scope.albums = data.albums;
                    $scope.photos = data.photos;
                }


                $scope.openImageModal = function (startItem){
                  console.log("clicked");

                    var modalInstance = $modal.open({
                      templateUrl: 'templates/modals/picture.html',

                      controller: 'PictureModalController',
                      size: 'lg',
                      resolve: {
                        items: function () {
                          return $scope.photos;
                        }
                      }

                    });


                    modalInstance.result.then(function (selectedItem) {
                      $scope.selected = selectedItem;
                    }, function () {
                       //$log.info('Modal dismissed at: ' + new Date());
                    });

                }

        }])
        .controller('PictureModalController', function ($scope, $modalInstance, items) {
          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        });
}());

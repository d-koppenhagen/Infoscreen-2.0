/* Startpage view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('shoppingCtrl', ['$scope', '$routeParams','$http',
            function($scope, $routeParams, $http) {
                console.log('open shopping page...');
$.material.init()
                $scope.newItem = {
                  'checked': false
                }

                getShoppingListData();
                function getShoppingListData() {
                    $http.get('/list')
                        .success(function(data){
                          console.log("received Data from API: ", data);
                          $scope.items = data;
                        })
                        .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                    });
                }

                $scope.check = function (data){
                  console.log(data);
                  var newValue;
                  if (data.checked == true) data.checked = false;
                  else data.checked = true;
                  editData(data);
                }

                $scope.checkAll = function() {
                  $scope.items.forEach(function(item) {
                      item.checked = true;
                      editData(item);
                  });
                  getShoppingListData();
                };

                $scope.uncheckAll = function() {
                  $scope.items.forEach(function(item) {
                      item.checked = false;
                      editData(item);
                  });
                  getShoppingListData();
                };

                function editData(data){
                  $http.put('list/'+data._id, data)
                      .success(function(data) {
                        console.log('successfully edited');
                      })
                      .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                      });
                }

                $scope.removeItems = function(){
                  $scope.items.forEach(function(item) {
                    if (item.checked == true) removeData(item);
                  });
                  getShoppingListData();
                }

                function removeData(data){
                  $http.delete('list/'+data._id, data)
                      .success(function(data) {
                        console.log('successfully removed');
                      })
                      .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                      });
                }

                $scope.addItem = function(){
                  $http.post('/list', $scope.newItem)
                      .success(function(data) {
                        console.log('added!');
                        getShoppingListData();
                      })
                      .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                      });
                }

        }]);
}());

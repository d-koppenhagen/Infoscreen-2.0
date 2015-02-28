/* Startpage view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('shoppingCtrl', ['$scope', '$routeParams','$http',
            function($scope, $routeParams, $http) {
                console.log('open shopping page...');

                $.material.init();
                
                getShoppingListData();
                function getShoppingListData(){
                    console.log(config.shoppingList.ressourcePath);
                    $http.get(config.shoppingList.ressourcePath)
                        .success(insertShoppingList)
                        .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                    });

                    function insertShoppingList (data){
                        console.log("received Data from API: ", data);
                        $scope.items = data;
                    }
                }
                

        }]);
}());

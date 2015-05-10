/* Task view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('getTasks', ['$scope', '$routeParams','$http', '$window','$location','$resource',
            function($scope, $routeParams, $http, $window, $location,$resource) {
                console.log('getting task list...');

                // getting access Token from query
                var accessToken = $location.search()['oauth_token'];

                // check if accessToken was received:
                if (!accessToken) {
                  console.log("no query token received, redirect to login page...");
                  var redirectUrl = "http://127.0.0.1:8080/src/#/tasks";
                  $window.location.href="http://5.45.102.135:7799/login?redirectUrl="+redirectUrl;
                } else {
                  console.log("Received new access Token:",accessToken);
                  var key = "12f45ac93b038c1916d0cbe250da9c62";
                  var boardQuery = "https://trello.com/1/Boards/FZR20wdn"+"?key="+key+"&token="+accessToken;
                  $http.get(boardQuery)
                      .success(trelloResult)
                      .error(function(data, status, headers, config) {
                      console.log("Error by getting data", data, status, headers, config);
                  });
                }


                function trelloResult (data) {
                    console.log("received new data: ", data);
                    $scope.trelloData = data;
                }


        }]);
}());

/* Guestbook-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('gbCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open guestbook page...');
        }]);
}());

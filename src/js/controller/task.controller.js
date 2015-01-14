/* Task view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('getTasks', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('getting task list...');
        }]);
}());

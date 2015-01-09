(function(){
	'use strict';

	angular
		.module('wgscreen')
		.config(routeConfig);

	function routeConfig($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'templates/start.html',
			}).
			when('/lvb', {
				templateUrl: 'templates/lvb.html',
			}).
			when('/cal', {
				templateUrl: 'templates/cal.html',
			}).
			when('/pic', {
				templateUrl: 'templates/pic.html',
			}).
			when('/feeds', {
				templateUrl: 'templates/feeds.html',
			}).
			when('/gb', {
				templateUrl: 'templates/gb.html',
			}).
			when('/tasks', {
				templateUrl: 'templates/tasks.html',
			}).
			when('/call', {
				templateUrl: 'templates/call.html',
			});
	}
}());

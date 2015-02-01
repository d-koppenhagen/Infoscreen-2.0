(function(){
	'use strict';

	angular
		.module('wgscreen')
		.config(routeConfig);

	function routeConfig($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'templates/start.html',
                controller: 'startCtrl'
			}).
			when('/lvb', {
				templateUrl: 'templates/lvb.html',
                controller: 'lvbCtrl'
			}).
			when('/cal', {
				templateUrl: 'templates/cal.html',
                controller: 'calendarCtrl'
			}).
			when('/pic', {
				templateUrl: 'templates/pic.html',
                controller: 'galleryCtrl'
			}).
			when('/feeds', {
				templateUrl: 'templates/feeds.html',
                controller: 'feedCtrl'
			}).
			when('/feeds/:id', {
                templateUrl: 'templates/feeds.html',
                controller: 'feedCtrl'
			}).
			when('/gb', {
				templateUrl: 'templates/gb.html',
                controller: 'gbCtrl'
			}).
			when('/tasks', {
				templateUrl: 'templates/tasks.html',
                controller: 'getTasks',
			}).
			when('/call', {
				templateUrl: 'templates/call.html',
                controller: 'webRTCctrl',
			}).
			when('/settings', {
				templateUrl: 'templates/settings.html',
                controller: 'settingCtrl',
			}).
			when('/shopping', {
				templateUrl: 'templates/shopping.html',
                controller: 'shoppingCtrl',
			}).
            otherwise({
                templateUrl: 'templates/start.html',
            });
	}
}());

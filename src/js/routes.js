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
				template: '<feed summary="false" url="http://feeds.feedburner.com/blogspot/rkEL" count="10"></feed>',
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
            otherwise({
                redirectTo: '/'
            });
	}
}());

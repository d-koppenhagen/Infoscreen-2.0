/* Calendar-view controller */
(function(){
    "use strict";	angular
		.module('wgscreen')
        .controller('calendarCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open calendar page...');

                $('#calendar').fullCalendar({
                    googleCalendarApiKey: '<YOUR API KEY>',
                        eventSources: [ //more than one calendar is possible
                        {
                            googleCalendarId: 'abcd1234@group.calendar.google.com'
                        }
                    ],
                    weekNumbers: true,
                    weekNumberCalculation: "local",

                });
        }]);
}());

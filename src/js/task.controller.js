/* Task view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('getTasks', function($scope, $http) {
            console.log('getting task list...');

            /*
            $http.get('https://api.trello.com/1/boards/5496995cd06e6d7fca35c8dd?key=12f45ac93b038c1916d0cbe250da9c62&name=wgscreen&expiration=30days&response_type=token').
                success(function(data, status, headers, config) {
                    console.log(data);
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    console.log('ERROR: '+ data + ' #### Status: '+ status+ ' #### Header: '+ headers+ ' #### Config: '+ config);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            */
        });
}());

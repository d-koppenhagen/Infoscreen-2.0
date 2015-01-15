/* Feed-view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('feedCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams) {
                console.log('getting Feeds...');
                $scope.feedItems =  [
                    {
                        id        :   "SturaRSS" ,
                        name      :   "Der Postillon" ,
                        url       :   "http://feeds.feedburner.com/blogspot/rkEL",
                        options   :   {
                            summary   : "false",
                            count     : "10"
                        }
                    },{
                        id        :   "SturaRSS" ,
                        name      :   "Stura der HfTL" ,
                        url       :   "http://stura.hft-leipzig.de/feed",
                        options   :   {
                            summary   : "false",
                            count     : "5"
                        }
                    }
                ];
        }]);
}());

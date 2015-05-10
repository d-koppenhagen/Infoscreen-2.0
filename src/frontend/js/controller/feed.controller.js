/* Feed-view controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .factory('FeedLoader', function ($resource) {
            return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
                fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
            });
        })
        .service('FeedList', function ($rootScope, FeedLoader) {
            this.get = function() {
               var feeds = [];
                var feedSources = JSON.parse(localStorage.getItem("rssFeeds"));
                //var feedSources = config.rssFeeds;
                if (feeds.length === 0) {
                    for (var i=0; i<feedSources.length; i++) {
                        FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
                            var feed = data.responseData.feed;
                            console.log(feed);
                            feeds.push(feed);
                        });
                    }
                }
                return feeds;
            };
        })

        .controller('feedCtrl', function ($scope, $routeParams, FeedList) {
            $scope.feeds = FeedList.get();
            //console.log(FeedList.get());
            $scope.$on('FeedList', function (event, data) {
                $scope.feeds = data;
            });

            $scope.selectedName = $routeParams.id;

            $scope.feedlimit = localStorage.getItem("max_feed");

            $scope.moreEntries = function () {
                console.log("loading more entries...");
                $scope.feedlimit = parseInt($scope.feedlimit)+5;
            };
	   });
}());

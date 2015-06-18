(function(){
    "use strict";

	angular
		.module('wgscreen')
        .controller('navCtrl', function( $scope, $rootScope, $timeout, $location, $window ) {

        $scope.date = new Date();
        var tick = function () {
            $scope.date = new Date();
            $timeout(tick, 1000);
        };
        $timeout(tick, 1000);

        $scope.navItem = {
            selectedIndex : 0,
            firstLocked : true,
            label : [
                { name : "Übersicht", value : "main", icon : "mdi-navigation-apps", destination: "#/"},
                { name : "LVB Info", value : "lvb", icon : "mdi-maps-directions-bus", destination: "#/lvb"},
                { name : "Kalender", value : "cal", icon : "mdi-action-event", destination: "#/cal"},
                { name : "Bilder", value : "pic", icon : "mdi-image-camera-alt", destination: "#/pic"},
                { name : "Feeds", value : "feed", icon : "mdi-hardware-cast", destination: "#/feeds"},
                { name : "Gästebuch", value : "gb", icon : "mdi-content-create", destination: "#/gb"},
                { name : "Einkaufsliste", value : "shopping", icon : "mdi-action-add-shopping-cart", destination: "#/shopping"}
            ]
        };
        $scope.next = function() {
          $scope.navItem.selectedIndex = Math.min($scope.navItem.selectedIndex + 1, 2) ;
        };
        $scope.previous = function() {
          $scope.navItem.selectedIndex = Math.max($scope.navItem.selectedIndex - 1, 0);
        };
        $scope.tabSelect = function(destination){
            $location.path(destination);
        };

        $scope.reloadPage = function (){
            //$location.path('/');
            $window.location.reload();
        };
    });
}());

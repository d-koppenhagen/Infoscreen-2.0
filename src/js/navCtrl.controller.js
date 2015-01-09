(function(){
    "use strict";

	angular
		.module('wgscreen')
        .controller('navCtrl', function( $scope, $timeout, $mdSidenav, $location ) {
        $scope.navItem = {
            selectedIndex : 0,
            firstLocked : true,
            label : [
                { name : "Übersicht", value : "main", icon : "fa fa-home", destination: "/" },
                { name : "LVB Info", value : "lvb", icon : "fa fa-bus", destination: "/lvb"  },
                { name : "Kalender", value : "cal", icon : "fa fa-calendar", destination: "/cal"  },
                { name : "Bilder", value : "pic", icon : "fa fa-camera", destination: "/pic"  },
                { name : "Feeds", value : "feed", icon : "fa fa-newspaper-o", destination: "/feeds"  },
                { name : "Gästebuch", value : "gb", icon : "fa fa-pencil-square-o", destination: "/gb"  },
                { name : "Aufgaben", value : "task", icon : "fa fa-tasks", destination: "/tasks"  },
                { name : "Telefon", value : "tel", icon : "fa fa-phone", destination: "/call"  }
            ]
        };
        $scope.next = function() {
          $scope.navItem.selectedIndex = Math.min($scope.navItem.selectedIndex + 1, 2) ;
        };
        $scope.previous = function() {
          $scope.navItem.selectedIndex = Math.max($scope.navItem.selectedIndex - 1, 0);
        };
        $scope.toggleRight = function() {
            $mdSidenav('right').toggle();
        };
        $scope.tabSelect = function(destination){
            $location.path(destination);
        };
      });

}());

